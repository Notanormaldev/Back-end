import express from "express"
import morgan from "morgan"




const app=express()


app.use(morgan("dev"))

const PORT=process.env.PORT ||3000

app.get("/",(req,res)=>{

res.send("hello world")
})

app.listen(PORT,()=>{
console.log("server started on port",PORT)
})
