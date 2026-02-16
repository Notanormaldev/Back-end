const app=require('./src/app')
const mongoose =require('mongoose')
function connecttodb(){
     mongoose.connect('mongodb+srv://harsh:IHYiSu2C@cluster1.mongodb.net/day-7').then(()=>{
        console.log('connected');
        
     })
}
connecttodb();

app.listen(3000,()=>{
    console.log("server is running in port 3000");
    
})