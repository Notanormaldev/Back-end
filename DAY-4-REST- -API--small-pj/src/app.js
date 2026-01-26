const  exp=require('express');


const app=exp();
app.use(exp.json())



const notes=[];


app.post('/notes',(req,res)=>{
    res.send('post sucess')
    notes.push(req.body)
    // console.log(req.body);
    
})


app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index];
    res.send("deleted successfully")
})


app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send('change applyed')
})

app.put('/notes/:index',(req,res)=>{
   notes[req.params.index]=req.body
   res.send('put sucess')
})






module.exports=app;


