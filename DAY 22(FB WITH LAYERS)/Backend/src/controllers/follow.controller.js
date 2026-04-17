
const usermodel = require("../models/auth.model");
const followmodel = require("../models/follow.model");



async function followuser(req,res){
    const followerusername=req.user.username    
    const followeeusername=req.params.username
    
    console.log(followerusername,followeeusername);
    
    if(followerusername===followeeusername){
        return res.status(409).json({
            msg:"you can not follow your self"
        })
    }
    
    const followeexist = await usermodel.findOne({username:followeeusername})
    if(!followeexist){
        return res.status(404).json({
            msg:"user not exist"
        })
    }



   const alreadyfollow =await followmodel.findOne({
      follower:followerusername,
      followee:followeeusername
   })
   



   if(alreadyfollow){
    return res.status(200).json({
        msg:"already following"
    })
   }




    const follow=await followmodel.create({
        follower:followerusername,
        followee:followeeusername
    })

    res.status(200).json({
        msg:"follow request sent",
        follow
    })




}
async function watchreq(req,res){
    const user = req.user.username

    const findpendingreq =await followmodel.find({
        followee:user,
        status:"pending"
    })
    

    if(findpendingreq.length===0){
        return res.status(404).json({
            msg:"no reqs"
        })
    }

    res.status(200).json({
        msg:"this are all reqs",
        findpendingreq
    })
}
async function acceptreq(req,res){
    const username = req.user.username
    const accepteusername = req.params.username

    const doaccept = await followmodel.findOneAndUpdate({
        follower:accepteusername,
        followee:username 
    }, {
            status:"accepted"
        },{new:true})

    

   res.status(200).json({
    msg:"accepted",doaccept
   })

    



}
async function rejectreq(req,res){
    const username = req.user.username
    const rejusername = req.params.username
    

     const dorej = await followmodel.findOneAndUpdate({
        follower:rejusername,
        followee:username 
    }, {
            status:"rejected"
        },{new:true})

    

   res.status(200).json({
    msg:"rejected",dorej
   })


}

async function unfollowuser(req,res){
     const followeruser=req.user.username
     const followeeuser=req.params.username


     const isfollowing=await followmodel.findOne({
        follower:followeruser,
        followee:followeeuser
     })

     if(!isfollowing){
        return res.status(409).json({
            msg:"you are not following"
        })
     }


     await followmodel.findByIdAndDelete(isfollowing._id)


     res.status(200).json({
        msg:"unfollow sucesfully"
     })



}




module.exports ={
    followuser ,  unfollowuser , watchreq ,acceptreq,rejectreq
}