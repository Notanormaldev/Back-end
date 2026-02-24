const mongoose  = require("mongoose");


const noteSchema = new mongoose.Schema({
    title:String,
    discription:String
})

const notesmodel = mongoose.model("alldata",noteSchema)

module.exports = notesmodel