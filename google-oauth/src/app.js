import express from "express"
import { configDotenv } from "dotenv";
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
configDotenv()

const app= express();

app.use(express.json())
app.use(morgan('dev'))



app.use(passport.initialize())
app.get('/',(req,res)=>{
    res.send("hello")  
})


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/callback'
},(_,__,profile,done)=>{
    return done(null,profile)
}))

app.get('/auth/google',
    passport.authenticate('google',{scope:['profile','email']})   
)

app.get('/auth/google/callback',
    passport.authenticate('google',{session:false}),
    (req,res)=>{
      console.log(req.user);
      res.send("Google auth sucessfull")
      
    }
)




export default app;