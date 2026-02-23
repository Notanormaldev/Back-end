const mongoose =require('mongoose')

const noteSchema = new mongoose.Schema({
    title:String,
    discription:String
})

 const notemodel = mongoose.model('Allnotes',noteSchema)

 module.exports = notemodel