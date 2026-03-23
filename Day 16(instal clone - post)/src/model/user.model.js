const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is require"],
        unique:[true,"username need unique"]
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"password required"]
    },
    bio:String,
    profile_pic:{
        type:String,
        default:'https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp?updatedAt=1771148318400'
    }
})

const usermodel = mongoose.model("users",userSchema)


module.exports = usermodel