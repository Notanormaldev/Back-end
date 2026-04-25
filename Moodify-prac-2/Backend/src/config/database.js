const mongoose = require('mongoose')

async function conntectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('DATABASE CONNECTED')
    })
}

module.exports = conntectDB