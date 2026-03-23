const express = require('express')
const userrouter = express.Router()
const authcontroller = require('../controllers/auth.controller')


userrouter.post('/register',authcontroller.registercontroller)



userrouter.post("/login",authcontroller.logincontroller)


module.exports = userrouter