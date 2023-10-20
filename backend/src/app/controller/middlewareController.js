const jwt = require("jsonwebtoken");

const middlewareController = { 
    verifyToken: async (req, res, next) => {    
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
                if(err) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next()
            })
        }
        else {
            res.status(401).json("you're not autheticated")
        }
    },
    verifyTokenAndAdmin: async (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.id == req.params.id || req.user.admin) {
                next()
            }
            else {
                res.status(403).json("you're not allowed to delete")
            }
        })
    }
}

module.exports = middlewareController