import mongoose from "mongoose";




async function conntectDB(){
    try {
         await  mongoose.connect(process.env.MONGO_URI).then(()=>{
               console.log("mongodb conntected");
         })
         
    } catch (error) {
        console.log(error,"mongo connection");
        
    }
}

export default conntectDB