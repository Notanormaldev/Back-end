const exp = require('express');


const app=exp();

app.get('/',(req,res)=>{
    res.send('helllo')
})


app.get("/about",(req,res)=>{
    res.send("this is about")
})

app.get('/contact',(req,res)=>{
    res.send('this is contact')
})



app.listen(3000);