//create export

const express = require('express')
const notesmodel = require('./models/notes.model')
const cors =require('cors')



const app =express();
app.use(cors())
app.use(express.json())
app.post('/apiu/notes',async (req,res)=>{
      const {title,discription} = req.body

     const note =await notesmodel.create({
        title,discription
      })


      res.status(201).json({
        msg:"note ban gya",
        note
      })
})

app.get('/apiu/notes',async  (req,res)=>{
    const note =await  notesmodel.find()

    res.status(200).json({
        note
    })
})

app.delete('/apiu/notes/:id',async (req,res)=>{
    const id = req.params.id

     await notesmodel.findByIdAndDelete(id);

     res.status(200).json({
        msg:"deleted sucessfully"
     })

})

app.patch('/apiu/notes/:id',async (req,res)=>{
    const {discription} =req.body
    const id =req.params.id

    const note = await notesmodel.findByIdAndUpdate(id,{discription})
 res.status(200).json({
    note  
 })
})




module.exports = app; 