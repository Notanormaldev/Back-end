const express = require('express')
const authcontroller = require("../controllers/auth.controller")


const userrouter = express.Router()


userrouter.post('/register',authcontroller.registercontroller)

userrouter.post('/login',authcontroller.logincontroller)



module.exports = userrouter