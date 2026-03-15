const app = require("./src/app")
const dotenv = require("dotenv")
const connectdb = require("./src/config/database")


dotenv.config()
connectdb()



app.listen(3000,()=>{
    console.log('3000 port pe running hai ');
    
})