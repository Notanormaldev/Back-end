import express from 'express'
import authmiddleware from '../middleware/auth.middleware.js'


const homeroute = express.Router()

homeroute.get('/check',authmiddleware,(req,res)=>{
    return res.status(200).json({
        msg:"home secure by protected"
    })
})

export default homeroute