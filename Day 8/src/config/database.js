const mongoose=require('mongoose')


function connectdb(){
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connectd successfully");
        
    })
}

module.exports = connectdb