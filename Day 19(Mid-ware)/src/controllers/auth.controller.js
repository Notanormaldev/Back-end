const usermodel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registercontroller(req,res){
   const {username,password,email,bio,profile_pic} = req.body

   const isuserexist =await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
   })

   if(isuserexist){
    return res.status(409).json({
        msg:"user already exist" + 
        (isuserexist.email === email ?
         "email is already exist" : 
        "username is already exist"
        )
    })
   }

   const hash =await bcrypt.hash(password,10)
   

   const user = await usermodel.create({
    username,
    email,
    password:hash,
    bio,
    profile_pic
   })

   const token = jwt.sign({
    id:user._id
   },process.env.JWT,{expiresIn:"1d"})

   res.cookie("token",token)

   res.status(201).json({
    msg:"register sucessfully",
    user
   })
}


async function logincontroller(req,res){
   const {username,password,email} = req.body

   const user =await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
   })

   if(!user){
    return res.status(409).json({
        msg:"user not register pelase do register"
    })
   }
   

   const validpass  = await bcrypt.compare(password,user.password)

   if(!validpass){
    return res.status(409).json({
        msg:"Invalid password"
    })
   }

   const token = jwt.sign({
    id:user._id
   },process.env.JWT,{expiresIn:'1d'})

   res.cookie("token",token)

   res.status(200).json({
    msg:"login sucessfully"
   })

}


module.exports ={
    registercontroller,
    logincontroller
}