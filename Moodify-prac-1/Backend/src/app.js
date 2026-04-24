const express = require('express')
const cookie = require('cookie-parser')
const UserRouter = require('./routes/auth.route')
const app= express()


app.use(cookie())
app.use(express.json())
app.use('/api/auth',UserRouter)

module.exports = app