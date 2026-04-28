const {Router} = require('express')
const Songcontroller = require('../controllers/song.controller')
const upload = require('../middleware/upload.middleware.js')

const Songroute = Router()

Songroute.post('/',upload.single('song'),Songcontroller.postsong)
Songroute.get('/',Songcontroller.getsong)

module.exports = Songroute