const express = require('express');
const notemodel = require('./models/notes.model')
const app= express();
app.use(express.json());

app.post('/api/notes',async (req,res)=>{
    const {title , discription} =req.body

  const note=await  notemodel.create({
        title, discription
    })
     res.status(201).json({
        msg:"successfully created",
        note
     })
    
})


app.get('/api/notes',async (req,res)=>{
    const note = await notemodel.find();


    res.status(200).json({
        msg:"fetch successfully",
        note
    })
})





module.exports=app;