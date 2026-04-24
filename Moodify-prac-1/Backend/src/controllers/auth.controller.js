const Usermodel = require("../model/auth.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistmodel = require("../model/blacklist")
const redis = require("../Middleware/cache")


async function register(req,res){
    const {username,email,password}=req.body
   
    const alreadyexist = await Usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(alreadyexist){
        return res.status(400).json({
            msg:"Already existed"
        })
    }
    
    const hash = await bcrypt.hash(password,10)

    const user = await Usermodel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT ,{expiresIn:'1d'})

    res.cookie('token',token)

    return res.status(200).json({
        msg:"user register",
        user
    })


}
async function login(req,res){
   const {username,email,password}=req.body


   const user = await Usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
   }).select("+password")

   if(!user){
    return res.status(403).json({
        msg:"Invalid creditnals"
    })
   }

   const passtrue = await bcrypt.compare(password,user.password)

   if(!passtrue){
    return res.status(403).json({
        msg:"Invalid craditnals"
    })
   }

   const token = jwt.sign({
    id:user._id,
    username:user.username
   },process.env.JWT,{expiresIn:"1d"})

   res.cookie('token',token)

   return res.status(200).json({
    msg:"Login sucessfully",
    user
   })
}
async function getme(req,res){
   const userid = req.user.id

   const user = await Usermodel.findById(userid)

   return res.status(200).json({
    user
   })
}
async function logout(req,res){
  const token = req.cookies.token

  res.clearCookie('token')

//   await blacklistmodel.create({
//     token
//   })

await redis.set(token,Date.now().toString(),'EX',3600)

  return res.status(200).json({
    msg:"logout sucessfully"
  })
}
module.exports = {
    register,login,getme,logout
}