const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username require"],
        unique:[true,"unique username"]
    },
    email:{
        type:String,
        required:[true,"email is require"],
        unique:[true,"unique email"]
    },
    password:{
        type:String,
        required:[true,"password require"]
    },
    bio:String,
    profile_pic:{
        type:String,
        default:'https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp?updatedAt=1771148318400'
    }
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel