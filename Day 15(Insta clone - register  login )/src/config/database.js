const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to Database"); 
    })
}

module.exports = connectDB