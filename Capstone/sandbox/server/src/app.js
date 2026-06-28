import express from 'express'
import morgan from 'morgan'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/api/sandbox/health',(req,res)=>{
   res.status(200).json({
    message:"Sandbox api health is ok",
    status:"ok"
   })
})


export default app;