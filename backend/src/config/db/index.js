const mongoose = require("mongoose");

async function connect() {
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/hoathinh3d");
        console.log("connect successfully");
    }
    catch (err) {
        console.log("connect failure");
    }
}

module.exports = { connect }