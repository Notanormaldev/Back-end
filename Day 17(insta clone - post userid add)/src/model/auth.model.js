const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"user is require"],
        unique:[true,"username is unique"]
    },
    password:{
        type:String,
        required:[true,'password is require'],
        unique:[true,"unique is password"]
    },
    email:{
        type:String,
        required:[true,"email is require"]
    },
    bio:String,
    profile_pic:{
        type:String,
        default:"https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp?updatedAt=1771148318400"
    }
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel