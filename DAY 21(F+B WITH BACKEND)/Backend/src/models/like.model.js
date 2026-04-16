const mongoose = require('mongoose')


const likeschema = mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"post id require"]
    },
    user:{
        type:String,
        require:[true,"user is require"]
    }

},{
    timeStamps:true
})

likeschema.index({postid:1,user:1},{unique:true})
const likemodel=mongoose.model('likes',likeschema)


module.exports=likemodel

