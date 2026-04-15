const express = require('express')
const userController = require("../controllers/user.controller")
const userRoute = express.Router()


userRoute.post('/register',userController.userregister)
userRoute.post('/login',userController.userlogin)

module.exports = userRoute
