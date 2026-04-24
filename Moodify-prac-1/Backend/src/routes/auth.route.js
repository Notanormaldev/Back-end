const {Router} = require('express')
const Authcontroller = require('../controllers/auth.controller')
const authuser = require('../Middleware/authuser')

const UserRouter = Router()

UserRouter.post('/register',Authcontroller.register)
UserRouter.post('/login',Authcontroller.login)
UserRouter.get('/get-me',authuser,Authcontroller.getme)
UserRouter.get('/logout',authuser,Authcontroller.logout)


module.exports = UserRouter