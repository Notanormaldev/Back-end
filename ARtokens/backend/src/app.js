import express from 'express'
import cookie from 'cookie-parser'
import authrotue from './routes/auth.route.js'
import homeroute from './routes/home.route.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cookie())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authrotue)
app.use('/api/home', homeroute)
export default app;