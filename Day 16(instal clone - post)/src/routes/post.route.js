const express= require("express")
const postcontroller = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

const postrout = express.Router()


postrout.post('/',upload.single('image'),postcontroller.creatpostcontroller)

module.exports = postrout   