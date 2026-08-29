import jwt from 'jsonwebtoken'



let genaccesstoken = (userId)=>{
  return jwt.sign({id:userId},process.env.JWT_ACCESS_TOKEN,{
    expiresIn:'15s'
  })
}

let genrefershtoken = (userId)=>{
  return jwt.sign({id:userId},process.env.JWT_REFERSH_TOKEN,{
    expiresIn:'2m'
  })
}

export {
    genaccesstoken,genrefershtoken 
}