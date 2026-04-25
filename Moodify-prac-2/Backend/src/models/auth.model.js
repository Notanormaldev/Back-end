const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,'username is unique']
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is unique"]
    },
    password:{
        type:String,
        required:[true,"passsword is required"]
    }
})

const usermodel = mongoose.model('users',userSchema)

module.exports = usermodel