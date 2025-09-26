import express from "express";
import Course from "../models/Course.js";
import { CreateError } from "../utils/error.js";
import user from "../models/user.js";
import Subscription from "../models/Subscription.js";
//Subscribe to a course
export const subscription =async (req,res,next)=>{
    try {
        const course = await Course.findById(req.params.courseId);
        if(!course) return next(CreateError(404,"Course not found"));

        const subscription = new Subscription({
            user:req.user.id,
            course:course._id,
            amount:course.price,
            status:"pending",
        })
        await subscription.save();
        res.status(200).json(subscription);
        
    } catch (err) {
        next(err)
        
    }
}
/// Get logged _in user's subscriptions
export const subscriptions = async(req,res,next)=>{
    try {
        const subscriptions = await Subscription.find({user:req.user.id}).populate("course","title price");
        res.status(200).json(subscriptions)
        
    } catch (err) {
        next()
        
    }
}

