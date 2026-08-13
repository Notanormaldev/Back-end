import jwt from 'jsonwebtoken'
import usermodel from '../models/user.model.js'







async function authmiddleware(req,res,next){
    try {
        let accesstoken = req.cookies.accesstoken
       
        if(!accesstoken){
            return res.status(404).json({
                msg:"no token"
            })
        }
       let decoded =jwt.verify(accesstoken,process.env.JWT_ACCESS_TOKEN)



       if(!decoded){
        return res.status(401).json({
            msg:"unauthorized"
        })
       }

       let user = await usermodel.findById(decoded.id)

       req.user=user;
       next();

    } catch (error) {
        console.log(error); 
    }
}

export default authmiddleware