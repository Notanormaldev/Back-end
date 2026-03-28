const bcrypt = require('bcryptjs')
const usermodel = require("../models/auth.model")
const jwt = require('jsonwebtoken')

async function registercontroller(req,res){
   const {username,password,email,bio,profile_pic} = req.body

   const userexist = await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
   })

   if(userexist){
    return res.status(409).json({
         msg:"user already exist" + (userexist.email === email ? "email already exist " :" username already exist")
    })
   }
  

   const hash =await bcrypt.hash(password,10)

   const user =await usermodel.create({
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
    user
   })

}


async function logincontroller(req,res) {
    const {username,email,password} = req.body 


    const user =await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(409).json({
            msg:"pelase do register first"
        })
    }

    const truepass =await bcrypt.compare(password,user.password)

    if(!truepass){
        return res.status(401).json({
            msg:"Invalid password"
        })
    }


    const token = jwt.sign({
        id:user._id
    },process.env.JWT,{expiresIn:"1d"})


    res.cookie("token",token)


    res.status(200).json({
          user  
    })

}


module.exports = {
    registercontroller,
    logincontroller
}