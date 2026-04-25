const jwt = require('jsonwebtoken')
const { redis } = require('../config/cache')

async function authuser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(404).json({
            msg:"token not provided"
        })
    }
     
    const blacklistd = await redis.get(token)

    if(blacklistd){
        return res.status(400).json({
            msg:"Acess denied"
        })
    }


    try {
        const decoded = jwt.verify(token,process.env.JWT)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({
            error,
            msg:"error from midddleware"
        })
    }
}

module.exports = authuser