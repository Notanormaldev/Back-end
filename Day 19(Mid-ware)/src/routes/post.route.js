const express = require('express')
const postcontroller =require('../controllers/post.controller')
const postRoute = express.Router()
const multer = require('multer')
const upload = multer({Storage:multer.memoryStorage()})
const identiyuser = require('../middlewares/auth.middleware')


postRoute.post('/',upload.single("img"),identiyuser,postcontroller.createpost)
postRoute.get('/',identiyuser,postcontroller.getmyposts)
postRoute.get('/details/:postid',identiyuser,postcontroller.getuserpostdetail)


module.exports = postRoute   