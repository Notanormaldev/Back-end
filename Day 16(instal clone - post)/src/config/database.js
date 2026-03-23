const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to DATABASE");
        
    })
}

module.exports = connectDB