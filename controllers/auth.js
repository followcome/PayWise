import express from "express";
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";

export const register = async(req,res,next)=>{
    
    try {
        const {name,email,password}= req.body;

        ///Check If User Exist Already
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User Already Existed!"});
        /// hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User ({
            name,
            email,
            password:hashedPassword,
        })
            await newUser.save()
        res.status(200).json({message:"New User has been Created"});
    } catch (err) {
        next(err);
    }
}

export const login =async (req,res,next)=>{
    
    try{
        const {email,password}= req.body;
    
        ///Check if User exist
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid email or password"});
        //Check Password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)return res.status(400).json({message:"Invalid email or password"});
        ///Create JWT
        const token = jwt.sign({
            id:user._id ,email:user.email
        },process.env.JWT,
    {expiresIn:"1hr"});
        res.status(200).json({token,user:{id:user._id, name:user.name,email:user.email}}); 
    }catch(err){
        
        next(err)
    }

}