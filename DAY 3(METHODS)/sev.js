const exp=require('express')


const app=exp();
app.use(exp.json());

const notes=[];
app.listen(3000,()=>{
    console.log("hey i am from listen bhai server start hogya firse");   
})


app.get('/notes',(req,res)=>{
    // res.send("response :-")
    res.send(notes)
    
})

app.post('/notes',(req,res)=>{
    // res.send("req sucess")
    console.log(req.body)
    res.send(req.body)
    
    notes.push(req.body)

})