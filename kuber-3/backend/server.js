import express from 'express'
import morgan from 'morgan'

const app = express();
app.use(morgan('dev'));




app.get('/',(req,res)=>{
   let sum=0;
   for(let i=0;i<10000000;i++){
    sum+=i;
   }
   return res.send(`The sum of first 10000000 numbers is ${sum}`)
})

let PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
