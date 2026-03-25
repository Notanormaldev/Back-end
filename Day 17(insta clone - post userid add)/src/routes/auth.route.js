const express = require("express")
const authcontroller = require('../controllers/auth.controller')

const userRoute = express.Router()




userRoute.post("/register",authcontroller.createregister)
userRoute.post("/login",authcontroller.createlogin)


module.exports = userRoute