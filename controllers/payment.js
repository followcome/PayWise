import axios from "axios";
import Course from "../models/Course.js";
import Subscription from "../models/Subscription.js";
import { CreateError } from "../utils/error.js";


export const initializePayment = async (req,res,next) =>{
    try {
    
        const {courseId} = req.params;
        console.log("Extracted courseId:", courseId);
        //Find the course
        const course = await Course.findById(req.params.courseId);
        if(!course) return next (CreateError(404,"Course not found"));
        //Create subscription with "pending";
        const subscription = new Subscription({
            user:req.user.id,
            course:course._id,
            amount:course.price,
            status:"pending",
        });
        await subscription.save();

        //call paystack
        const response = await axios.post("https://api.paystack.co/transaction/initialize", {
            email:req.user.email,
            amount:course.price * 100,
            callback_url:`http://localhost:7200/api/payment/verify/ ${subscription._id}`,
        },
   { headers: {
        Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
    }});

    /// save paystack reference
        subscription.reference = response.data.data.reference;
        await subscription.save();

        ///return paystack checkout url
        res.json({authorization_url :response.data.data.authorization_url});
        
        
    } catch (err) {
        console.error("Error in /initialize route:", err);
        res.status(500).json({
            message:"payment initialization failed",
            error: err.message,
        });
        
    }
}

    ////verify paystack payment

    export const verifyPayment  = async (req,res,next) =>{
        try {
            const {subscriptionId} = req.params;
            // if(!subscription){
            //     return res.status(400).json({
            //         success:false,
            //         message:"Subscription not found"
            //     })
            // }
            //Find subscription
            const subscription = await Subscription.findById(req.params.subscriptionId);
            if(!subscription) return next(CreateError(404,"Subscription not found"));
            ///verify with paystack using reference
            const response = await axios.get(`https://api.paystack.co/transaction/verify/${subscription.reference}`,
                {
                    headers : {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                    },
                }
            );
            //update subscription status
            if (response.data.data.status === "success"){
                subscription.status = "paid";
                await subscription.save();
                return res.json({
                    message: "Payment successful",subscription
                })
            }else {
                return res.json({message: "Payment not successful yet",subscription});
            }
            
        } catch (err) {
            res.status(500).json({
                message:"Payment verification failed",
                error :err.message,
            });
            
        }

    };