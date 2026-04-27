import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { regivalidation } from "../validation/regivalidation.js";



const Userroute = Router()
Userroute.post('/regi',regivalidation,register)

export default Userroute;