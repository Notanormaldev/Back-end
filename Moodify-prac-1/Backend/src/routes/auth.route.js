const {Router} = require('express')
const Authcontroller = require('../controllers/auth.controller')

const UserRouter = Router()

UserRouter.post('/register',Authcontroller.register)
UserRouter.post('/login',Authcontroller.login)



module.exports = UserRouter