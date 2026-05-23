import express from "express"
import { configDotenv } from "dotenv";
configDotenv()

import morgan from "morgan";
app.use(express.json())
app.use(morgan('dev'))

const app= express();





export default app;