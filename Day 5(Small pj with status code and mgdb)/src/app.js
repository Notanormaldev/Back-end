const exp = require('express')
const app = exp();
app.use(exp.json());

const notes=[]

app.post('/notes',(req,res)=>{
    notes.push(req.body)

    res.status(201).json({
        msg:"created suceessfully 201"
    })
})


app.get('/notes',(req,res)=>{
    res.status(200).json({
        notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({})
})


app.patch('/notes/:index',(req,res)=>{
    
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        msg:"sucess patch"
    })
})


module.exports = app;