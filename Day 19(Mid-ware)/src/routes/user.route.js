const express = require('express')
const authcontroller = require('../controllers/auth.controller')
const userRoute = express.Router()


userRoute.post('/register',authcontroller.registercontroller)
userRoute.post('/login',authcontroller.logincontroller)

module.exports = userRoute