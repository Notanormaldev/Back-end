const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'required username'],
        unique:[true,"unique username"]
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email unique"]
    },
    password:{
        type:String,
        required:[true,'password required'],
        select:false
    }
})

const Usermodel = mongoose.model('users',UserSchema)

module.exports = Usermodel