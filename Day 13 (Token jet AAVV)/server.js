const app = require('./src/app')

const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./src/config/database')
connectDB()



app.listen(3000,()=>{
    console.log('3000 port me running server');
    
})