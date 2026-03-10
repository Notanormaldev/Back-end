const express = require('express')

const authRouter = express.Router()
const usermodel = require('../models/user.model')
const jwt = require("jsonwebtoken")

authRouter.post("/register", async  (req,res)=>{
      const {email,name,password} = req.body

      const isuserexist =await  usermodel.findOne({email})


      if(isuserexist){
       return res.status(400).json({
          msg:"user is already exist"
        })
      }
      
     const user = await  usermodel.create({
        email,name,password
      })
     
      const token = jwt.sign(
        {
        id:user._id,
        email:user.email
      },
      process.env.JWT_SECRET

    )
    
    res.cookie("jwr_cookie",token)



    res.status(201).json({
        msg:"user created",
        user,
        token
    })
})

module.exports = authRouter