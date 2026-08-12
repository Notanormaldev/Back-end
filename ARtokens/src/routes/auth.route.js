import { Router } from "express";
import { logincontroller, registercontroller } from "../controller/auth.controller.js";



const authrotue=Router()

authrotue.post('/register',registercontroller)
authrotue.post('/login',logincontroller)

export default authrotue;


