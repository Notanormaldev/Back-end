const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgurl:{
        type:String,
        required:[true,"imgurl is needed"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"id needed"]
    }
})

const postmodel = mongoose.model("posts",postSchema)

module.exports = postmodel
