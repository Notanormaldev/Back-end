const express = require("express")
const usermodel = require("../models/user.model")
const jwt =  require("jsonwebtoken") 
const crypto = require("crypto")



const userrouter = express.Router()

userrouter.post("/register",async (req,res)=>{
    const {email,name,password} = req.body  

    const isuserexist =await usermodel.findOne({email})
    
   if(isuserexist){
    return res.status(409).json({
        msg:"user already exist"
    })
   }
   const hash = crypto.createHash('md5').update(password).digest("hex")


   const user = await  usermodel.create({
        email,
        name,
        password:hash
    })

    const token = jwt.sign({
        id:user._id
    },
    process.env.JWT
)
    
   res.cookie("jwt",token)  
    
    res.status(201).json({
        msg:"user created sucessfully",
        user,
        token
    })

})

userrouter.post("/protected",(req,res)=>{
    console.log(req.cookies)
    
    
    res.status(200).json({
        msg:"mil gya cookie"
    })
})

userrouter.post("/login",async (req,res)=>{
    const {email,password} = req.body

   const user =await usermodel.findOne({email})


   if(!user){
    return res.status(200).json({
        msg:"user not  exist"
    })
   }



   const ispassword = user.password===crypto.createHash('md5').update(password).digest("hex")

   if(!ispassword){
        return res.status(400).json({
        msg:"invalid password"
    })
   }


   const token = jwt.sign({
    id:user._id
   },
    process.env.JWT)
 
  res.cookie("JWT",token)


  res.status(200).json({
    msg:"login sucess"
  })
})




module.exports = userrouter