import express from "express"
import { check } from "express-validator"
import { postLogin } from "../controllers/user"
const router=express.Router()
router.post("/login",[check("email","email is required"),
    check("password","password is required").isLength({min:6})
    
],postLogin)

export default router