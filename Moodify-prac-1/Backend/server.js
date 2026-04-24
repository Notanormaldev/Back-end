require('dotenv').config()
const app = require('./src/app');
const conntectdb = require('./src/config/database');

conntectdb()
app.listen(3000,()=>{
    console.log('3000 port pe running sucessfully');
})