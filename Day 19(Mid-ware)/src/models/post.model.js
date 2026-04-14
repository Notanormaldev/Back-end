const mongoose = require('mongoose')



const postSchema = mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgurl:{
        type:String,
        required:[true,"url is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userid is required"]
    
    }
})

const postmodel = mongoose.model('posts',postSchema)

module.exports  = postmodel