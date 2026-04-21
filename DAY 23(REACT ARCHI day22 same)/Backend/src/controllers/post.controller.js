const Imagekit = require('@imagekit/nodejs')
const postmodel = require('../models/post.model')
const jwt= require('jsonwebtoken')
const likemodel = require('../models/like.model')

async function createpost(req,res){
    
 



    const imagekit = new Imagekit({
        privateKey:process.env.IMAGEKIT_PRIVATE_KEY
    })
    
    
    const file= await imagekit.files.upload({
        file:await Imagekit.toFile(Buffer.from(req.file.buffer),"file"),
        fileName:"test",
        folder:"insta-clone"
    })

    const post =await postmodel.create({
        imgurl:file.url,
        caption:req.body.caption,
        user:req.user.id
    })

    res.status(201).json({
        post
    })
}
async function userallposts(req,res){
  
   const posts = await postmodel.find({user:req.user.id})
   
   if(posts.length===0){
    return res.status(404).json({
        msg:'empty posts'
    })
   }

   res.status(200).json({
    posts
   })

   
}
async function postdetail(req,res){
   

   const postid = req.params.postid

   const post =await postmodel.findById(postid)
   

   const realuser= post.user.toString() === req.user.id

   if(!realuser){
    return res.status(403).json({
        msg:"forbidden acesss"
    })
   }

   res.status(200).json({
    post
   })

}
async function likepost(req,res){
    const user=req.user.username
    const postid=req.params.postid

    const likeexist = await likemodel.findOne({
          postid:postid,
          user:user
    })

    if(likeexist){
        return res.status(409).json({
            msg:"already liked"
        })
    }

   const like=await likemodel.create({
      postid:postid,
      user:user
   })

   res.status(409).json({
    msg:"post like ",
    like
   })

   

}

module.exports={
    createpost,userallposts,postdetail,likepost
}

