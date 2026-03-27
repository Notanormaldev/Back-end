const mongoose = require('mongoose')

const followSchema = mongoose.Schema({
    follower:{
        type:String,
        required:[true,'follower']
     
    },
    followee:{
        type:String,
        required:[true,"followe"]
       
    }
    // status:{
    //     type:String,
    //     default:"pending",
    //     enum:["pending","accepted","rejected"]
    // }
},{
    timestamps:true
})

followSchema.index({follower:1,followee:1},{unique:true})


const followmodel = mongoose.model('follow',followSchema)

module.exports = followmodel