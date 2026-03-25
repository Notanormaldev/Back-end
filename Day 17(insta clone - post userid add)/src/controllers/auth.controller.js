const usermodel = require("../model/auth.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async   function createregister(req,res){
    const {email,password,username,bio,profile_pic} = req.body
    

    const userexist =await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(userexist){
        return res.status(409).json({
            msg:"user already exist " + (userexist.email === email ?"  email is already exist" : "  username is already exist" )
        })
    }
    
    const hash =await bcrypt.hash(password,10)

    const user =await usermodel.create({
        username,
        password:hash,
        email,
        bio,
        profile_pic
    })
    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        username:user.username,
        email:user.email
    }) 
}

async function createlogin(req,res){
   const {username , email , password} = req.body
  
   const user =await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
   })

   if(!user){
    return res.status(409).json({
        msg:'user not exist please register'
    })
   }
   

   const checkpassword =await bcrypt.compare(password,user.password)

   if(!checkpassword){
    return res.status(409).json({
        msg:"invalid passoword"
    })
   }
   
   const token = jwt.sign({
    id:user.id
   },process.env.JWT,{expiresIn:"1d"})

   res.cookie("token",token)

  res.status(200).json({
    msg:"login sucessfully"
  })
    
}

module.exports = {
    createregister,
    createlogin
}