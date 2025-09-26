import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { initializePayment, verifyPayment } from "../controllers/payment.js";

const router = express.Router();
router.post("/initialize/:courseId",verifyToken,initializePayment);
router.get("/verify/:subscriptionId",verifyPayment);

export default router;