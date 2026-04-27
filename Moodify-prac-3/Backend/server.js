require('dotenv').config()
const app= require('./src/app');
const conntectedDB = require('./src/config/database');


conntectedDB()
app.listen(3000,()=>{
    console.log("Run on 3000 port");
})

