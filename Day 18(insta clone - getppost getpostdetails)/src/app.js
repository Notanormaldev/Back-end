const express = require('express')
const userRoute = require('./routes/auth.route')
const postRoute = require('./routes/post.route')
const cookie = require("cookie-parser")

const app = express()
app.use(cookie())
app.use(express.json())
app.use('/api/auth',userRoute)
app.use("/api/posts",postRoute)


module.exports = app