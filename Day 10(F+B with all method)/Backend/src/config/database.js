const mongoose = require('mongoose')

function conntectdb(){
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log('conntected database');
        
    })
}


module.exports = conntectdb;