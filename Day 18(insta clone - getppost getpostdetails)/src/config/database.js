const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DATABASE CONNECT SUCESSFULLY");
    })
}

module.exports = connectDB