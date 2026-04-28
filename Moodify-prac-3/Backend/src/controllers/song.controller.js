const id3 = require('node-id3');
const   uploadfile  = require('../services/storage.service');
const songmodel = require('../models/song.model');


async function postsong(req,res){
     const {mood} = req.body
//   console.log(mood);
//   console.log(req.file.buffer);
  const tag =id3.read(req.file.buffer)
//   console.log(tag.title);
//   console.log(tag.image.imageBuffer);


  const [songfile,imagefile] = await Promise.all([
   uploadfile({
        buffer:req.file.buffer,
        filename:tag.title +'mp3',
        folder:'/cohort-2/moodify/songs'
    }),
    uploadfile({
        buffer:tag.image.imageBuffer,
        filename:tag.title + 'jpeg',
        folder:'/cohort-2/moodify/img'
    })
  ])

  
  

  const song = await songmodel.create({
    songurl:songfile.url,
    imgurl:imagefile.url,
    title:tag.title,
    mood:mood
  })


  return res.status(200).json({
    msg:"song created",
    song:song
  })

  
        
}

async function getsong(req,res){
    const {mood} = req.query

    const song = await songmodel.aggregate([
        {$match:{mood}},
        {$sample:{size:1}}
    ])

    return res.status(200).json({
        song:song
    })
   
}

module.exports={ 
    postsong , getsong
}