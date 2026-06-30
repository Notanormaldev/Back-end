import express from "express";
import morgan from "morgan";
import { createpod } from "./kubernetes/pod.js";
import { createservice } from "./kubernetes/service.js";
import { v4 as uuid } from "uuid"

const app = express()

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/sandbox/health", (req, res) => {
    res.json({ message: "Sandbox API is running" });
});
app.post('/api/sandbox/start',async (req,res)=>{
  const sandboxid= uuid()
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
export default app;
