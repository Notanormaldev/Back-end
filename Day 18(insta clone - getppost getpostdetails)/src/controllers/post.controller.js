const { toFile } = require('@imagekit/nodejs');
const Imagekit = require('@imagekit/nodejs');
const jwt = require("jsonwebtoken");
const postmodel = require('../models/post.model');


const imagekit =new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpost(req,res){
    const {caption} = req.body
     

     const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),"file"),
        fileName:"test",
        folder:'insta-clone'
     })


     const token = req.cookies.token
    //  console.log(token);
     


    if(!token){
        return res.status(401).json({
            msg:"token not exist please login or register"
        })
     }


    let decoded
     try {
       decoded =  jwt.verify(token,process.env.JWT)
     } catch (error) {
        return res.status(401).json({
            msg:"invalid token"
        })
     }
     
    const post = await postmodel.create({
        user:decoded.id,
        caption:caption,
        posturl:file.url
    })

    res.status(200).json({
        post
    })
  
     
}


async function getmyposts(req,res){
     const token = req.cookies.token

     if(!token){
        return res.status(401).json({
            msg:"token not exist please login or if you are new then do register"
        })
     }

     let decoded
     try {
        decoded = jwt.verify(token,process.env.JWT)
     } catch (error) {
        return res.status(401).json({
            msg:"unauthorized access"
        })
     }

     const userid = decoded.id     

     const posts =await postmodel.find({
        user:userid
      })
     
     if(posts.length===0){
        return res.status(404).json({
            msg:"no posts"
        })
     }

     res.status(200).json({
        posts
     })
     
}

async function getdetailsofpostbyid(req,res) {
   const token = req.cookies.token

   if(!token){
    return res.status(401).json({
        msg:"unauthorized acess"
    })
   }
   

   let decoded

   try {
    decoded = jwt.verify(token,process.env.JWT)
   } catch (error) {
    return res.status(401).json({
        msg:"token invalid"
    })
   }

   const userid = decoded.id
   const postid = req.params.postid
   
   const post =await postmodel.findById(postid)

   if(!post){
    return res.status(404).json({
        msg:"not found"
    })
   }

   const validuser = post.user.toString() === userid

   if(!validuser){
    return res.status(403).json({
        msg:"forbidden acess"
    })
   }

   res.status(200).json({
    post
   })



   


}

module.exports = {
    createpost,getmyposts,getdetailsofpostbyid
}