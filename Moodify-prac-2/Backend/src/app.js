const express = require('express')
const cookie = require('cookie-parser')
const UserRoute = require('./routes/auth.route')

const app=express()
app.use(cookie())
app.use(express.json())
app.use('/api/auth',UserRoute)

module.exports = app
