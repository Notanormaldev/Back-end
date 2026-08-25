import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    refershtoken:{
        type:String
    }
},{
    timestamps:true
})


const usermodel = mongoose.model("users",userSchema)
export default usermodel 