import { Router } from 'express';
import { check } from 'express-validator';
import {postLogin, postRegister} from "../controllers/user";

 const router=Router()

 
router.post("/register",[check("firstName","firstName is required").isString(),
    check("lastName","lastName is required").isString(),
    check("email","Please enter a valid email address").isEmail(),
    check("password","Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number").isLength({ min: 8 }),
    check("password","Password must contain at least one uppercase letter, one lowercase letter, and one number").matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "i")
],postRegister)



export default router