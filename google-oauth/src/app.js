import express from "express"
import { configDotenv } from "dotenv";
import morgan from "morgan";
import passport, { initialize } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
configDotenv()

const app= express();

app.use(express.json())
app.use(morgan('dev'))


app.get('/',(req,res)=>{
    res.send("hello")  
})

app.use(passport,initialize)






export default app;