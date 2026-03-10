const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email Already exist"]
    },
    password:String
})

const usermodel = mongoose.model("users",userSchema)


module.exports = usermodel