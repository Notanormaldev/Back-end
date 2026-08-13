import { configDotenv } from "dotenv";
import app from "./src/app.js";
import conntectDB from "./src/config/db.js";
configDotenv()
conntectDB()
app.listen(3000,()=>{
    console.log("server running on port 3000");
    
})
