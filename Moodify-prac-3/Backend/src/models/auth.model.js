const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username required"],
        unique:[true,"username need to unique"]
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email unique"]
    },
    password:{
        type:String,
        required:[true,'password required']
    }
})

const usermodel = mongoose.model('users',UserSchema)
module.exports = usermodel