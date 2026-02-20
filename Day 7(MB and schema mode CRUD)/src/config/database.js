const mongoose = require('mongoose');


function connectdb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connted to db sucessfully");
        
    })
}


module.exports = connectdb

