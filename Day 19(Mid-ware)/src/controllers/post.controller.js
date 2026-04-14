const postmodel = require('../models/post.model');
const { toFile } = require('@imagekit/nodejs')
const Imagekit = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken');


const imagekit = new Imagekit({
    privateKey:process.env.PRIVATE_KEY
})


async function createpost(req,res){
   const {caption} = req.body

   
   const file = await imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:"test1",
    folder:'insta-clone'
   })
   
   const post = await postmodel.create({
    user:req.user.id,
    caption:caption,
    imgurl:file.url
   })



   res.status(200).json({
    post
   })
}
async function  getmyposts(req,res) {


    const userid=req.user.id

    const posts = await postmodel.find({
        user:userid
    })

    if(posts.length === 0){
        return res.status(404).json({
            msg:'empty posts'
        })
    }

    res.status(200).json({
        posts
    })


    
}
async function getuserpostdetail(req,res) {
    

    const userid = req.user.id
    const postid = req.params.postid 

    const post = await postmodel.findById(postid)

    if(!post){
        return res.status(404).json({
            msg:"no post avl by this id"
        })
    }

    const realuser = post.user.toString() === userid 

    if(!realuser){
     return res.status(403).json({
         msg:"forbidden acess"
     })
    }
    

    res.status(200).json({
        msg:"see the post",
        post
    })

}



module.exports = {
    createpost,getmyposts,getuserpostdetail
}