const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("SUCESSFULLY CONNECTED DATABASE");
    })
}

module.exports = connectDB