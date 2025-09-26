import express from "express";
import { subscription, subscriptions } from "../controllers/subscription.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:courseId",verifyToken,subscription);
router.get("/",verifyToken,subscriptions)


export default router