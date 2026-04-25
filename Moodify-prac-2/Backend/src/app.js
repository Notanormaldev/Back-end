const express = require('express')
const cookie = require('cookie-parser')
const UserRoute = require('./routes/auth.route')
const cors = require('cors')


const app=express()
app.use(cookie())
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/auth',UserRoute)

module.exports = app
