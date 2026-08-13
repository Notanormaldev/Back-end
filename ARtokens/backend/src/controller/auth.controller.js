import usermodel from "../models/user.model.js"
import { getaccesstokenservice, loginservice, registerservice } from "../services/auth.service.js"


async function registercontroller(req,res){
  
  let {newuser,accesstoken,refershtoken} = await registerservice(req.body)

  newuser.refershtoken = refershtoken
  await newuser.save()
  

  res.cookie('accesstoken',accesstoken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:10*60*1000 
  })


    res.cookie('refershtoken',refershtoken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:24*60*60*1000 
  })

  return res.status(201).json({
    msg:"user registerd successfully",
    user:newuser
  }
  )
}


async function logincontroller(req,res){
   
  let {isExisted,accesstoken,refershtoken} = await loginservice(req.body)



  isExisted.refershtoken = refershtoken
  await isExisted.save()
  

  res.cookie('accesstoken',accesstoken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:10*60*1000 
  })


    res.cookie('refershtoken',refershtoken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:24*60*60*1000 
  })

  return res.status(201).json({
    msg:"user loggedin successfully",
    user:isExisted
  }
  )
}


async function getaccesstokencontro(req,res){

let refershtoken = req.cookies.refershtoken

if(!refershtoken){
  return res.status(404).json({
    msg:"no found refersh token"
  })
}


 let accesstoken = await getaccesstokenservice(refershtoken)

  res.cookie('accesstoken',accesstoken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:10*60*1000 
  })


 return res.status(200).json({
  msg:'access token genrated'
 })


}

export  {
    registercontroller,logincontroller,getaccesstokencontro
}