const usermodel = require("../models/auth.model")
const bcrypt = require('bcryptjs')
const { json } = require("express")
const jwt = require('jsonwebtoken')
const { redis } = require("../config/cache")

async function register(req,res){
    const {username,email,password} = req.body
    
    const alreadyuser = await usermodel.findOne({
        $or:[
            {
                email
            },
            {
                username
            }
        ]
    })


    if(alreadyuser){
        return res.status(400).json({
            msg:"user already exist"
        })
    }
   
    const hash = await bcrypt.hash(password,10)

    const user = await usermodel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT,{expiresIn:"1d"})

    res.cookie('token',token)

    return res.status(200).json({
        user:user
    })

}
async function login(req,res){
   const {username,email,password} = req.body

   const user = await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
   }).select('+password')

   if(!user){
    return res.status(400).json({
        msg:"Invalid creadtinals"
    })
   }

   const passcheck = await bcrypt.compare(password,user.password)

   if(!passcheck){
    return res.status(400).json({
        msg:"Invalid creditinals"
    })
   }

   const token = jwt.sign({
    id:user._id,
    username:user.username
   },process.env.JWT,{expiresIn:"1d"})

   res.cookie('token',token)

   return res.status(200).json({
    user:user
   })



}
async function getme(req,res){
   const userid =  req.user.id

   const user = await usermodel.findById(userid)

   return res.status(200).json({
    user:user
   })
}
async function logout(req,res){
   const token = req.cookies.token

   if(!token){
    return res.status(400).json({
        msg:"token not provided"
    })
   }
    

   await redis.set(token,Date.now().toString(),"EX",3600)


   res.clearCookie('token')

   return res.status(200).json({
         msg:"logout sucess"
   })


}

module.exports = {
    login,register,getme,logout
}