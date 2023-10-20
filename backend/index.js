const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const path = require("path")
const dotenv = require("dotenv")
const port = 8000;

const db = require("../backend/src/config/db");
const route = require("./src/route/index")

dotenv.config();

// setup
app.use(
    express.urlencoded({
        extended: true,
    }),
); 
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(bodyParser.json({limit: "50mb"}))

// tạo route
route(app)

// connect db
db.connect()

app.listen(port, () => {
    console.log("server is running ...");
})