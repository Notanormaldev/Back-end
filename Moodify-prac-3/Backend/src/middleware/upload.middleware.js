const multer= require('multer')

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:1024*1024*10
    }
})


module.exports = upload;