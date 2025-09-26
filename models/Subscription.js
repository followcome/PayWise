import mongoose from "mongoose";


const subScriptionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum: ["pending","paid"],
        default:"pending",
    },
    reference:{
        type:String, //
    }
},{timestamps: true});

export default mongoose.model("Subscription",subScriptionSchema);