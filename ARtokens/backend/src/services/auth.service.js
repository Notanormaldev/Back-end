import usermodel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {genaccesstoken,genrefershtoken } from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'

async function registerservice(data){
    let name = data.name || data.fullName
    let { email, password } = data
    if(!email || !password || !name){
        throw new Error("Fill all details")
    }                          

    const isExisted = await usermodel.findOne({ email })
    if(isExisted){
        throw new Error("User already exists with this email address")
    }                                                                                
                    
    const hashpass = bcrypt.hashSync(password,10)

    const newuser = await usermodel.create({
        name,
        email,
        password:hashpass
    })

    let accesstoken = genaccesstoken(newuser._id)
    let refershtoken = genrefershtoken(newuser._id)
    return {newuser,accesstoken,refershtoken}
}

async function loginservice(data){
    const {email,password} = data

   if(!email || !password){
       throw new Error("Fill all details")
   }

   const isExisted = await usermodel.findOne({ email })

   if(!isExisted){
       throw new Error("User does not exist")
   }

   const check = await bcrypt.compare(password,isExisted.password)

   if(!check){
       throw new Error("Invalid credentials")
   }
   
   let accesstoken = genaccesstoken(isExisted._id)
   let refershtoken = genrefershtoken(isExisted._id)

  return {isExisted,accesstoken,refershtoken}
}   

async function getaccesstokenservice(refershtoken){
    let decoded = jwt.verify(refershtoken,process.env.JWT_REFERSH_TOKEN)

    if(!decoded) throw new Error("unauthorized")
    const user = await usermodel.findById(decoded.id)
    if(!user) throw new Error("user not found")

    if(refershtoken !== user.refershtoken) throw new Error("unauthorized token mismatch")

    let accesstoken = genaccesstoken(user._id)

   return accesstoken
}

export {
    registerservice ,loginservice ,getaccesstokenservice
}