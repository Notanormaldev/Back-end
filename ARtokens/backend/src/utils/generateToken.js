import jwt from 'jsonwebtoken'



let genaccesstoken = (userId)=>{
  return jwt.sign({id:userId},process.env.JWT_ACCESS_TOKEN,{
    expiresIn:'1h'
  })
}

let genrefershtoken = (userId)=>{
  return jwt.sign({id:userId},process.env.JWT_REFERSH_TOKEN,{
    expiresIn:'1d'
  })
}

export {
    genaccesstoken,genrefershtoken 
}