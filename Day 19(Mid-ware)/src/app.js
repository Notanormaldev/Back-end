const express = require('express')
const userRoute = require('./routes/user.route')
const cookie = require('cookie-parser')
const postRoute = require('./routes/post.route')


const app = express()
app.use(cookie())
app.use(express.json())
app.use('/api/auth',userRoute)
app.use('/api/posts',postRoute)

module.exports = app