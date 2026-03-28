const express = require("express")
const postcontroller = require("../controllers/post.controller")
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})



const postRoute = express.Router()


postRoute.post('/',upload.single('img'),postcontroller.createpost)
postRoute.get('/',postcontroller.getmyposts)
postRoute.get('/details/:postid',postcontroller.getdetailsofpostbyid)





module.exports = postRoute