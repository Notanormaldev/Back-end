const jwt=require('jsonwebtoken')
const blacklistmodel = require('../model/blacklist')


async function authuser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            msg:"Token is not provided"
        })
    }
    
    const blacklisttokenavl = await blacklistmodel.findOne({token})

    if(blacklisttokenavl){
        return res.status(400).json({
            msg:"hacker tum nhi me hu bhai shhhhhhhhhhh"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT)
        req.user =decoded
        next()
    } catch (error) {
        return res.status(400).json({
            msg:"Invalid token bro"
        })
    }




}
module.exports = authuser