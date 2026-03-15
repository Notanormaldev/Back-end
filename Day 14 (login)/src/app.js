const express = require("express")
const userrouter = require('./routes/user.route')
const cookie = require("cookie-parser")

const app=express()
app.use(cookie())
app.use(express.json())
app.use("/api/auth",userrouter)


module.exports = app;