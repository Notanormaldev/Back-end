const express = require('express')
const userController = require("../controllers/user.controller")
const idetifyuser = require('../middleware/authtoken.middleware')
const userRoute = express.Router()


userRoute.post('/register',userController.userregister)
userRoute.post('/login',userController.userlogin)
userRoute.get('/getme',idetifyuser,userController.getme)
module.exports = userRoute
