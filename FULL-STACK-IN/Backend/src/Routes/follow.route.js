const express = require('express')
const followcontroller = require('../controllers/follow.controller')
const idetifyuser = require('../middleware/authtoken.middleware')

const followroute = express.Router()
followroute.post('/follow/:username',idetifyuser,followcontroller.followuser)
followroute.post('/unfollow/:username',idetifyuser,followcontroller.unfollowuser)
followroute.get('/pending/reqs',idetifyuser,followcontroller.watchreq)
followroute.patch('/accpet/:username',idetifyuser,followcontroller.acceptreq)
followroute.patch('/reject/:username',idetifyuser,followcontroller.rejectreq)
followroute.get('/getfollowdets',idetifyuser,followcontroller.getfollowdets)
followroute.get('/otheruser',idetifyuser,followcontroller.otheruser)

module.exports = followroute

