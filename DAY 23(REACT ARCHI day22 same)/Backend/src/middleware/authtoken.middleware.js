const jwt= require('jsonwebtoken')
async function idetifyuser(req,res,next){
    const token = req.cookies.token

   if(!token){
      return res.status(409).json({
        msg:"token not avl"
      })
   }


   let decoded
   try {
      decoded = jwt.verify(token,process.env.JWT)
   } catch (error) {
      return res.status(409).json({
          msg:"invalid token"
      })
   }
  

   req.user = decoded
   
   next()

}

module.exports = idetifyuser

