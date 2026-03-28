require('dotenv').config()
const app = require('./src/app');
const connectDB = require('./src/config/database');

connectDB()
app.listen(3000,()=>{
    console.log("Server run on 3000 port");
})