import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))
app.get("/api/router/health",(req,res)=>{
    res.send("Router API is running")
})




export default app;