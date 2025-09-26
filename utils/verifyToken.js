import express from "express";
import jwt from "jsonwebtoken"
import { CreateError } from "./error.js";

/// Middleware to verify jwt
export const verifyToken = (req,res,next)=>{
    //Get the token from header
    const authHeader = req.headers["authorization"];
    // If no token provided
    if(!authHeader) return next (CreateError(401,"No token provided!"));
    //If token starts with bearer "Remove it"
    const token = authHeader.startsWith ("Bearer")?authHeader.split (" ")[1]
    :authHeader 
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if (err) return next (CreateError(401,"Token isn't valid"))
            req.user = user;
            next();
    })
}