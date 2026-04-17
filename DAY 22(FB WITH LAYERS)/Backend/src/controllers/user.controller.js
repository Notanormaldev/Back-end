const usermodel = require("../models/auth.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


async function userregister(req,res){
    const {username,email,password,bio,profile_pic}= req.body

    const userexist =await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    }) 

    if(userexist){
        return res.status(409).json({
            msg:"user already exist"+((userexist.email === email )?"email already exist":"username is already exist")
        })
    }
    const hash =await bcrypt.hash(password,10)


    const user=await  usermodel.create({
        username,
        email,
        password:hash,
        bio,
        profile_pic
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT)

    res.cookie('token',token)

    res.status(201).json({
        user
    })
}

async function userlogin(req,res){
    const {username,password,email} = req.body

    const user =await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(401).json({
            msg:"unauthorized please register"
        })
    }


    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT)

    const passreal = await bcrypt.compare(password,user.password)

    if(!passreal){
        return res.status(401).json({
            msg:"invalid pass"
        })
    }
    res.cookie("token",token)
    res.status(200).json({
        msg:"login sucess"
    })


}

async function getme(req,res){
    const userid = req.user.id

    const user = await usermodel.findById(userid)

    return res.status(200).json({
        user
    })
}
module.exports={
    userregister,userlogin,getme
}