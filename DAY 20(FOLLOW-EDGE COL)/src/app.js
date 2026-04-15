const express = require("express")
const cookie = require('cookie-parser')
const userRoute = require('./Routes/user.route')
const postRoute = require("./Routes/post.route")
const followroute = require("./Routes/follow.route")


const app = express()
app.use(express.json())
app.use(cookie())
app.use('/api/auth',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/ff',followroute)
module.exports = app