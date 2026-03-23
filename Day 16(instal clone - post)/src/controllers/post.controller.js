const Imagekit = require("@imagekit/nodejs")
const {toFile}= require("@imagekit/nodejs")

// console.log("IK KEY:", process.env.IMAGEKIT_PRIVATE_KEY)

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})



async function creatpostcontroller(req,res){
   console.log(req.body);
   console.log(req.file);
   
    
    
   const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:"Test"
   })

   res.send(file)

  
}

module.exports = {
    creatpostcontroller
}