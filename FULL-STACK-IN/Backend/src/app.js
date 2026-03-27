const express = require("express")
const cookie = require('cookie-parser')
const userRoute = require('./Routes/user.route')
const postRoute = require("./Routes/post.route")
const followroute = require("./Routes/follow.route")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('./public'))
app.use(cookie())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use('/api/auth',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/ff',followroute)
module.exports = app