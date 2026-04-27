const mongoose = require('mongoose')



const conntectedDB=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('CONNECTED DATABASE');
    })
}

module.exports = conntectedDB