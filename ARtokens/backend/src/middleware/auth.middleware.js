import jwt from 'jsonwebtoken'
import usermodel from '../models/user.model.js'


async function authmiddleware(req,res,next){
    try {
        let accesstoken = req.cookies.accesstoken
       
        if(!accesstoken){
            return res.status(401).json({
                msg:"no access token provided"
            })
        }
        let decoded = jwt.verify(accesstoken,process.env.JWT_ACCESS_TOKEN)

        if(!decoded){
            return res.status(401).json({
                msg:"unauthorized token"
            })
        }

        let user = await usermodel.findById(decoded.id)

        req.user=user;
        next();

    } catch (error) {
        console.log("Auth middleware error:", error.message); 
        return res.status(401).json({
            msg: "access token expired or invalid",
            error: error.message
        })
    }
}

export default authmiddleware