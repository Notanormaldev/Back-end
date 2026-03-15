const mongoose = require('mongoose')


function connectdb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected with database");
        
    })
}

module.exports = connectdb