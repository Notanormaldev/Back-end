const express =require('express')
const notemodel =require('./models/notes.model')


const app=express();
app.use(express.json())

app.post('/notu',async (req,res)=>{

    const {title , discription } = req.body
    const note=await notemodel.create({
        title,discription
    })
   res.status(200).json({
    note
   })

})
app.get("/notu",async (req,res)=>{
   const note =await notemodel.find();
   res.status(201).json({
    note
   })
})
module.exports=app;