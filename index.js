import express from "express";
import cors from "cors"
import dotenv,{config} from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import courseRoute from "./routes/course.js"
import subScriptionRoute from "./routes/subscription.js"
import paymentRoute from "./routes/payment.js"



import { verifyToken } from "./utils/verifyToken.js";


const app = express();
dotenv.config()

const connect =async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected!")

    }catch(error){
        throw (error);
    }
    

}



///Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174', "https://pay-wise-rji5o6kay-followcomes-projects.vercel.app/"],
  credentials: true   
}));
app.use("/api/auth",authRoute);
app.use("/api",courseRoute);
app.use("/api/subscription",subScriptionRoute);
app.use("/api/payment",paymentRoute);


const PORT = process.env.PORT || 7200;
app.use((err,req,res,next)=>{
    const errorStatus = err.errorStatus || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
        
    })
});
app.get("/api/protected",verifyToken,(req,res,next)=>{
    res.json({message: `Hello ${req.user.email},you access a protected route`})
});

app.get("/",(req,res)=>{
    res.send("SaaS Api is Ready!")
})


app.listen(PORT,()=>{
    connect()

    console.log(`server is running on ${PORT}`)
})