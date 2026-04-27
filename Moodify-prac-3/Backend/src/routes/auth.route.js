const {Router} = require('express')
const Authcontroller = require('../controllers/auth.controller')
const authuser = require('../middleware/authuser')


const UserRoute = Router()

UserRoute.post('/register',Authcontroller.registeruser)
UserRoute.post('/login',Authcontroller.loginuser)
UserRoute.get('/get-me',authuser,Authcontroller.getme)
UserRoute.get('/logout',authuser,Authcontroller.logout)

module.exports = UserRoute


