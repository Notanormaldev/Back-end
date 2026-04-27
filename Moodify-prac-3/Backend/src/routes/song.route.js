const {Router} = require('express')
const Songcontroller = require('../controllers/song.controller')

const Songroute = Router()

Songroute.post('/',Songcontroller.postsong)
Songroute.get('/',Songcontroller.getsong)

module.exports = Songroute