import dotenv  from "dotenv"

dotenv.config()

function errorhandling(err,req,res,next){
     const respo = {
        err:err.message
     }

     if(process.env.NODE_ENV === 'devlopment'){
        respo.stack = err.stack
     }

     res.status(err.status).json({
        respo
     })
}

export default errorhandling