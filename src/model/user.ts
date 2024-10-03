import mongoose from "mongoose";
import bcrypt from "bcryptjs"
type UserType={
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    password: string;
    
}


const userSchema=new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email:{type :String , unique:true,required:true},
    password:{type:String ,required:true}


})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()

})

export const User=mongoose.model<UserType>("User",userSchema)