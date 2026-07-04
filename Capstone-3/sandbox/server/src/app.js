import express from 'express'
import morgan from 'morgan'


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))


app.use("/api/sandox/health",(req,res)=>{
    return res.status(200).json({
        message:"Sandbox is healthy",
        success:true,
        
    })
})

export default app