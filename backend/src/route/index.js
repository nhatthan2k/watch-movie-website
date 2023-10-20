const authRoute = require("./auth")
const userRoute = require("./user")
const movieRoute = require("./movie")

function route(app) {
    app.use("/v1/auth", authRoute);
    app.use("/v1/user", userRoute);
    app.use("/v1/movie", movieRoute)
}

module.exports = route