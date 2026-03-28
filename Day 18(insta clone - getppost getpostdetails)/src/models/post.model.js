const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    posturl:{
        type:String,
        require:[true,"url is require"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:[true,"user is require"]
    }
})

const postmodel = mongoose.model("posts",postSchema)

module.exports = postmodel

