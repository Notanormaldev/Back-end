import usermodel from "../models/user.model.js"
import { getaccesstokenservice, loginservice, registerservice } from "../services/auth.service.js"

async function registercontroller(req,res){
  try {
    let {newuser,accesstoken,refershtoken} = await registerservice(req.body)

    newuser.refershtoken = refershtoken
    await newuser.save()

    res.cookie('accesstoken',accesstoken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
      maxAge:15*1000 
    })

    res.cookie('refershtoken',refershtoken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
      maxAge:2*60*1000 
    })

    return res.status(201).json({
      msg:"user registerd successfully",
      user:newuser
    })
  } catch (error) {
    return res.status(400).json({ msg: error.message || "Registration failed" })
  }
}

async function logincontroller(req,res){
  try {
    let {isExisted,accesstoken,refershtoken} = await loginservice(req.body)

    isExisted.refershtoken = refershtoken
    await isExisted.save()
    
    res.cookie('accesstoken',accesstoken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
      maxAge:15*1000 
    })

    res.cookie('refershtoken',refershtoken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
      maxAge:2*60*1000 
    })

    return res.status(200).json({
      msg:"user loggedin successfully",
      user:isExisted
    })
  } catch (error) {
    return res.status(401).json({ msg: error.message || "Login failed" })
  }
}

async function getaccesstokencontro(req,res){
  try {
    let refershtoken = req.cookies.refershtoken

    if(!refershtoken){
      return res.status(401).json({
        msg:"no found refersh token"
      })
    }

    let accesstoken = await getaccesstokenservice(refershtoken)

    res.cookie('accesstoken',accesstoken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
      maxAge:15*1000 
    })

    return res.status(200).json({
      msg:'access token genrated'
    })
  } catch (error) {
    return res.status(401).json({ msg: error.message || "Failed to refresh access token" })
  }
}


export  {
    registercontroller,logincontroller,getaccesstokencontro
}