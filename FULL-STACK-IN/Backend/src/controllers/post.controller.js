const Imagekit = require('@imagekit/nodejs')
const postmodel = require('../models/post.model')
const jwt= require('jsonwebtoken')
const likemodel = require('../models/like.model')
const { post } = require('../Routes/post.route')

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

   res.status(200).json({
    msg:"post like ",
    like
   })

   

}
async function unlikepost(req,res){
   const postid=req.params.postid
   const user=req.user.username

   const isliked = await likemodel.findOne({
    postid:postid,
    user:user
   })


   if(!isliked){
    return res.status(403).json({
        msg:"you did't like the post"
    })
   }

   await likemodel.findOneAndDelete({_id:isliked._id})

   return res.status(200).json({
     msg:"unlike the post sucessfully"
   })


}
async function getfeed(req,res){
    const user = req.user

    const posts = await Promise.all((await postmodel.find().populate('user').lean())
    // const posts = await Promise.all((await postmodel.find().sort({_id:-1}).populate('user').lean())
    .map(async(post)=>{
        const isliked = await likemodel.findOne({
            user:user.username,
            postid:post._id
        })

        post.isliked = Boolean(isliked)

        return post
    }))


    return res.status(200).json({
        msg:"All posts",
        posts
    })
}

module.exports={
    createpost,userallposts,postdetail,likepost,getfeed,unlikepost
}

