import express, { Request, Response } from "express";
import { User } from "../model/user";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator";
 export const postRegister = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ message: "User already exist" });
         
        }
        user = new User({firstName:firstName,lastName:lastName,email:email,password:password});
        await user.save();
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{
            expiresIn:"1d"
        })
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000,

        })
        return res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:" Something went wrong please try again later"})
        
    }
};
export const postLogin= async(req:Request,res:Response)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const{email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"})
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000,

        })
        res.status(200).json({userId:user._id})
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:"Something went wrong please try again later"})
        
    }
}

export const vaildateToken=(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
}
