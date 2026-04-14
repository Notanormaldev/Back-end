const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"username need  to be unique"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email need to be unique"]
    },
    password:{
        type:String,
        required:[true,"password is needed"]
    },
    bio:String,
    profile_pic:{
        type:String,
        default:"https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp?updatedAt=1771148318400"
    }
})


const usermodel = mongoose.model('users',userSchema)

module.exports = usermodel