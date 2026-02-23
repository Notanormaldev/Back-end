const app = require('./src/app')
const connectdb =require('./src/config/database')
require('dotenv').config()

connectdb();

app.listen(3000,()=>{
    console.log("server is start");
    
})