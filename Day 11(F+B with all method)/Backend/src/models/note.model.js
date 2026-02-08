const mongoose = require('mongoose')


const noteschema = mongoose.Schema({
    title:String,
    discription:String
})

const notemodel = mongoose.model("allnote",noteschema)

module.exports = notemodel