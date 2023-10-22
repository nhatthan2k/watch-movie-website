const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// tạo mảng lưu trư refreshToken
let refreshTokens = [];

const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });
        
            const saveUser = await newUser.save()
            res.status(200).json(saveUser)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,   
            admin: user.admin
        },
        process.env.JWT_ACCESS_TOKEN,
        {expiresIn: "30s"}
        )
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn: "365d"}
        )
    },

    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username});

            if(!user){
                res.status(404).json('Wrong username!')
            };
            
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!validPassword){
                res.status(404).json('Wrong password')
            }

            if (user && validPassword){

                // tao accessToken
                const accessToken = authController.generateAccessToken(user)
                
                // tạo refreshToken
                const refreshToken = authController.generateRefreshToken(user)

                // lưu refreshToken vào database
                refreshTokens.push(refreshToken)

                // lưu refreshToken lên cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "Strict"
                })

                const {password, ...orther} = user._doc
                res.status(200).json({...orther, accessToken})
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    
    requestRefreshToken: async (req, res) => {
        // lây refreshToken từ cookie ra
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("you're not autheticated!")

        // kiểm tra refreshToken 
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("refreshToken is not valid")
        }

        // xác minh refreshToken 
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                console.log(err);
            }

            // lấy refreshToken cũ ra
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);

            // tạo refreshToken và accessToken mới
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            // thêm refreshToken mới vào database
            refreshTokens.push(newRefreshToken);
            
            // lưu refreshToken mới lên cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Strict"
            })

            // lưu accessToken mới 
            res.status(200).json({accessToken: newAccessToken})
        })
    },
    
    logoutUser: async (req, res) => {
        // xóa refreshToken ra khỏi cookie
        res.clearCookie("refreshToken");
        // xóa refreshToken ra khỏi database
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("logged out!")
    }
}   

module.exports = authController