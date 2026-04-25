const {Router} = require('express')
const UserRoute = Router()
const Authcontroller = require('../controllers/auth.controller')
const authuser = require('../middleware/authuser')


UserRoute.post('/login',Authcontroller.login)
UserRoute.post('/register',Authcontroller.register)
UserRoute.get('/get-me',authuser,Authcontroller.getme)
UserRoute.get('/logout',authuser,Authcontroller.logout)

module.exports = UserRoute

