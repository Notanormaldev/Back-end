const id3 = require('node-id3')


async function postsong(req,res){
     const {mood} = req.body
  console.log(mood);
  console.log(req.file);
  
  
        
}

async function getsong(req,res){
   
}

module.exports={ 
    postsong , getsong
}