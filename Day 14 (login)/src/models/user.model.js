const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"email already exist"]
    },
    password:String
})


const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel
