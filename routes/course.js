import express, { Router } from "express";
import {  createCourses, getCourses } from "../controllers/course.js";
const router = express.Router();
router.post("/course",createCourses);
router.get("/",getCourses);


export default router;