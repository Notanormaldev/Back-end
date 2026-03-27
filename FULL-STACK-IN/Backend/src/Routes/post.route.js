const express = require("express")
const multer = require("multer")
const upload=multer({storage:multer.memoryStorage()})
const Postcontroller = require('../controllers/post.controller')
const idetifyuser = require("../middleware/authtoken.middleware")
const postRoute = express.Router()

postRoute.post('/',idetifyuser,upload.single('img'),Postcontroller.createpost)
postRoute.get('/',idetifyuser,Postcontroller.userallposts)
postRoute.get('/details/:postid',idetifyuser,Postcontroller.postdetail)
postRoute.post('/like/:postid',idetifyuser,Postcontroller.likepost)
postRoute.post('/unlike/:postid',idetifyuser,Postcontroller.unlikepost)
postRoute.get('/feed',idetifyuser,Postcontroller.getfeed)

module.exports = postRoute