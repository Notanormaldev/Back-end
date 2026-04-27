const mongoose = require('mongoose')

const songschema = mongoose.Schema({
    imgurl:{
        type:String,
        required:[true,'imgurl is required']
    },
    songurl:{
        type:String,
        required:[true,'songurl is required']
    },
    title:{
        type:String,
        required:[true,'title is required']
    },
    mood:{
        type:String,
        enum:{
            values:['happy','sad','natural','surprised'],
            msg:"mood is enum"
        }
    }
})

const songmodel = mongoose.model('songs',songschema)

module.exports = songmodel