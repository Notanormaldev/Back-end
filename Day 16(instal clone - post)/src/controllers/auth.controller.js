const usermodel = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')



async function   registercontroller(req,res){
    const {username,email,password,profile_pic,bio} = req.body


    const isuserexist =await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isuserexist){
        return res.status(409).json({
            msg:"user already exist" + ( (isuserexist.email === email) ? "email already exist" :"username already exist" )
        })
    }
    

    const hash = await bcrypt.hash(password,10)

    const user =await usermodel.create({
        email,
        username,
        password:hash,
        bio,
        profile_pic
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(201).json({
        username:user.username,
        email:user.email,
        bio:user.bio,
        profile_pic:user.profile_pic,
        token
    })


}

async function  logincontroller(req,res){
    const {email,password,username } = req.body


    const user =await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })


    if(!user){
        return res.status(409).json({
            msg:"user not exist " 
        })
    }


    const passright =await bcrypt.compare(password,user.password)


 


    

    if(!passright){
       return res.status(200).json({
        msg:"invalid password"
       })
    }

       const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("tokenn",token)

      res.status(200).json({
            msg:"sucessfully login"
        })
}


module.exports = {
    registercontroller,
    logincontroller
}