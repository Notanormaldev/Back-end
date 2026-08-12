import usermodel from "../models/user.model.js"




async function registercontroller(req,res){
  let {name,email,password}= req.body

  if(!email || !password){
    return res.status(404).json({
        msg:"Fill all details"
    })
  }

  const isExisted =await usermodel.findOne({email})
  if(isExisted){
    return res.status(409).json({
        msg:"user already exist with this email address"
    })
  }
  
   


  const newuser = await usermodel.create({
    name,
    email,
    password
  })

  

  


}


async function logincontroller(req,res){

}


export  {
    registercontroller,logincontroller
}