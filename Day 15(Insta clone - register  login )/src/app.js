const express = require('express')
const userrouter = require('./Routes/user.route')
const cookie = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookie())
app.use("/api/auth",userrouter)



module.exports = app