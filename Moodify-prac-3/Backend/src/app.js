const express = require('express')
const UserRoute = require('./routes/auth.route')
const cookie = require('cookie-parser')
const Songroute = require('./routes/song.route')

const app = express()
app.use(express.json())
app.use(cookie())
app.use('/api/auth',UserRoute)
app.use('/api/songs',Songroute)

module.exports = app 
