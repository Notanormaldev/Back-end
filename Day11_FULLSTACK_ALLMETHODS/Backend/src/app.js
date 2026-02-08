const express = require('express')
const app = express();
const notemodel = require('./models/note.model')
const cors = require("cors")
app.use(express.static('./public'))
const path = require('path')
app.use(express.json())
app.use(cors())
app.post('/apis/notes',async (req,res)=>{

   const {title , discription } = req.body

    const note =await  notemodel.create({
          title,discription
    })

    res.status(201).json({
        msg:"created Sucessfully",
        note
    })
})

app.get('/apis/notes',async (req,res)=>{
   const note = await notemodel.find();


   res.status(200).json({
    note
   })

})
app.delete("/apis/notes/:id",async (req,res)=>{
    const id = req.params.id
  await notemodel.findByIdAndDelete(id)

    res.status(204).json()
})
app.patch('/apis/notes/:id',async (req,res)=>{
    const id = req.params.id

    const {discription} = req.body


    const note = await notemodel.findByIdAndUpdate(id,{discription})

    res.status(200).json({
        note
    })




})


app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname , ".." , './public/index.html'))
    

})
module.exports = app;