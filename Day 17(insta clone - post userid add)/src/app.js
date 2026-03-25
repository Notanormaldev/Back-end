const express = require('express');
const userRoute = require('./routes/auth.route');
const cookie = require("cookie-parser");
const postRoute = require('./routes/post.route');


const app = express()
app.use(express.json())
app.use(cookie())
app.use('/api/auth',userRoute)
app.use('/api/posts',postRoute)

module.exports = app;
