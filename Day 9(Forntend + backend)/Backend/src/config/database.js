const mongoose =require('mongoose')

function connectDB(){
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("succesfully connected");
    
})

}

module.exports= connectDB