const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs');
const postmodel = require('../model/post.model');
const jwt = require('jsonwebtoken')


// console.log(process.env.IMAGEKIT_PRIVATE_KEY);

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})



async function createpost(req,res){
    const {caption} = req.body
  
    
    
   const file = await imagekit.files.upload({
   file:await toFile(Buffer.from(req.file.buffer),"file"),
   fileName:"Test",
   folder:'insta-clone'
    }) 
    

   const token =await req.cookies.token

  if(!token){
    return res.status(401).json({
        msg:"token not provied ,unauthorized acess"
    })
  }


   let decoded=null
  try {
    decoded = jwt.verify(token,process.env.JWT)
  } catch (error) {
    return res.status(401).json({
        msg:"unauthorized req"
    })
  }

 const post  = await postmodel.create({
    imgurl:file.url,
    user:decoded.id,
    caption:caption
  })


  res.status(201).json({
    msg:"POST creating sucessfully",
    post
  })
  

}



module.exports = {
    createpost
}