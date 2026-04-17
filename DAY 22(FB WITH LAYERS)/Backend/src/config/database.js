const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DATABASE CONNECTED ")
    })
}

module.exports = connectDB