const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username is already exist"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:[true,"email is already exist"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"passworld is required"]
    },
    bio:String,
    profile_pic:{
        type:String,
        default:'https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp'
     }
    })


    const usermodel = mongoose.model("users",userSchema)


    module.exports = usermodel