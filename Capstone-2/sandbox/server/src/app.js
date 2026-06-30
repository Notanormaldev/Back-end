import express from "express";
import morgan from "morgan";


const app = express()

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.get("/api/sandbox/health", (req, res) => {
    res.json({ message: "Sandbox API is running" });
});

export default app;
