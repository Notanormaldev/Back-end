const express = require("express")
const cookie = require("cookie-parser")
const userrouter = require("../src/routes/user.route")
const postrout = require("./routes/post.route")

const app = express()
app.use(express.json())
app.use(cookie())
app.use('/api/auth',userrouter)
app.use("/api/posts",postrout)


module.exports = app