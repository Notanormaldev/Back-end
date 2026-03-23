const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageurl:{
        type:String,
        required:[true,"image url is require for creating an post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user is require in creating an post"]
    }   
})
const postmodel = mongoose.model("posts",postSchema)
module.exports = postmodel