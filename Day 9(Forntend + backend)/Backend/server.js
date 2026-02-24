const app = require('./src/app')



const connectDB=require('./src/config/database')

connectDB();
app.listen(3000,()=>{
    console.log("3000 port pe server start hua ");
    
})