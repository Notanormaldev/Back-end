const mongoose = require('mongoose')

const postschema = mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgurl:{
        type:String,
        required:[true,"image link needed"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,"user id is require"]
    }
})

const postmodel = mongoose.model("posts",postschema)


module.exports = postmodel