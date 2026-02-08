const app = require('./src/app')
const connectdb = require('./src/config/database')
const dotenv =require('dotenv')
dotenv.config()
connectdb()

app.listen(3000,()=>{
    console.log("3000 port pe start started");
})