const jwt = require('jsonwebtoken')
const redis = require('../config/cache')

async function authuser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(404).json({
            msg:"token not provided"
        })
    }


    const blacklist = await redis.get(token)


    if(blacklist){
        return res.status(401).json({
            msg:"acess denined"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({
            msg:"token not verifyed"
        })
    }
}


module.exports = authuser