const mongoose = require('mongoose')


const BlacklistSchema = mongoose.Schema({
    token:{
        type:String,
        required:[true,'require token']
    }
},{
    timestamps:true
})
const blacklistmodel = mongoose.model('blacklisttokens',BlacklistSchema)
module.exports = blacklistmodel

