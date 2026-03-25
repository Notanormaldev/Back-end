const express = require('express')
const postcontroller = require('../controllers/post.controller')
const  multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})


const postRoute= express.Router()



postRoute.post('/',upload.single('img'),postcontroller.createpost)






module.exports = postRoute