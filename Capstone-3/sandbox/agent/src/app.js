import express from "express";
import morgan from "morgan";
import fs from "fs";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))

const WORKING_DIR='/workspace'


app.get("/",(req,res)=>{
    res.send("Agent API is running")
})

app.get('/list-files',async (req,res)=>{
    const elements = await fs.promises.readdir(WORKING_DIR)


    res.status(200).json({
    message:"elements in the working directory",
    elements
   })
})

export default app;