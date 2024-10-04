import express from "express"
import { check } from "express-validator"
import { postLogin, vaildateToken } from "../controllers/user"
import verifyToken from "../middleware/auth";
const router=express.Router()
router.post("/login",[check("email","email is required"),
    check("password","password is required").isLength({min:6})
    
],postLogin);
router.get("/validate-token",verifyToken,vaildateToken)



export default router