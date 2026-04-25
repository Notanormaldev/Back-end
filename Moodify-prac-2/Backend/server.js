require('dotenv').config()
const { connect } = require('mongoose');
const app = require('./src/app');
const conntectDB = require('./src/config/database');

conntectDB()
app.listen(3000,()=>{
    console.log("3000 port pe running");
})


