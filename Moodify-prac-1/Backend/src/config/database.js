const mongoose = require('mongoose')


async function conntectdb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Database conntectd sucessfully');    
    })
}

module.exports = conntectdb