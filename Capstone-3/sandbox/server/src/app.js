import express from 'express'
import morgan from 'morgan'
import { v4 as uuid } from "uuid"
import { createpod } from '../kubernetes/pod.js';
import { createservice } from '../kubernetes/service.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))


app.get("/api/sandbox/health",(req,res)=>{
    return res.status(200).json({
        message:"Sandbox is healthy",
        success:true,
        
    })
})

app.post('/api/sandbox/start',async (req,res)=>{
    const sandboxid = uuid() 

    await Promise.all([
        createpod(sandboxid),
        createservice(sandboxid)
    ])

   return res.status(201).json({
    message:"Sandbox created successfully",
    sandboxid:sandboxid,
    preview:`http://${sandboxid}.preview.localhost`

  })
})

export default app