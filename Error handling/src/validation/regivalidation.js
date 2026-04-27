import { body, validationResult } from "express-validator";


const validate = (req,res,next)=>{
    const err = validationResult(req)

    if(err.isEmpty()){
        return next()
    }

    res.status(200).json({
        err:err.array()
    })
}

export const regivalidation = [
    body('username').isString(),
    body('email').isEmail(),
    validate
]