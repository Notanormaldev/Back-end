import express from "express"
import morgan from "morgan"


const app = express()

app.use(morgan("dev"))
app.use(express.json())


const Port=process.env.PORT||3000

app.get("/",(req,res)=>{
    res.send("Hello World!")
})



app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`)
})


