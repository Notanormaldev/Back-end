const { toFile } = require('@imagekit/nodejs')

const Imagekit = require('@imagekit/nodejs').default

const client = new Imagekit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadfile({buffer,filename,folder=''}){
    const file = await client.files.upload({
        file:await toFile(Buffer.from(buffer)),
        fileName:filename,
        folder:folder
    })
    return file
}
module.exports=uploadfile