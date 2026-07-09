import express from "express"
import morgan from "morgan"


const app=express()
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))



app.get('/api/sandbox/health',(req,res)=>{
   res.status(200).json({
    message:"sandbox health is good",
    status:"success"
   })
})

export default app 