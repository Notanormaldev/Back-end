import { Router } from "express";
import { getaccesstokencontro, logincontroller, registercontroller } from "../controller/auth.controller.js";



const authrotue=Router()

authrotue.post('/register',registercontroller)
authrotue.post('/login',logincontroller)
authrotue.get('/get-act',getaccesstokencontro)
export default authrotue;


