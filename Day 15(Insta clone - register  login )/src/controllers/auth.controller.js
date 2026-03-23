
const jwt = require("jsonwebtoken")
const usermodel = require("../model/user.model")
const crypto = require("crypto")




async function  registercontroller(req,res){
    const {username,email,password,bio,profile_pic} = req.body
   
    const hash = crypto.createHash('md5').update(password).digest("hex")


    const isuserexist = await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

  
    if(isuserexist){
    return  res.status(409).json({
            msg:"user already exist"  + (isuserexist.email === email ? "     email is already exist " : "    username  is  already exist")
        })
    }


      const user = await usermodel.create({
        username,
        email,
        password:hash,
        bio,
        profile_pic
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})


    res.cookie("token",token)

    res.status(201).json({
        msg:"Register sucessfully",
        username:user.username,
        email:user.email,
        bio:user.bio,
        profile_pic:user.profile_pic
    })


}


async function logincontroller(req,res){
    const {email,username,password} = req.body

    const user = await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
   
    
    if(!user){
      return  res.status(409).json({
            msg:"user not exist go to register"
        })
    }


    const pass = crypto.createHash("md5").update(password).digest("hex") === user.password

    

   


    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})



    res.cookie("token",token)

    if(pass){
        res.status(200).json({
            msg:"sucessfully login"
        })
    }

}


module.exports = {
    registercontroller,
    logincontroller
}