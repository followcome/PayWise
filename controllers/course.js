import Course from "../models/Course.js";

export const createCourses = async(req,res,next)=>{
    // / Add a new Course
    try{
        const {title,price,description} = req.body;
        const newCourse = new Course ({
            title,
            price,
            description
        });
        await newCourse.save();
        res.status(200).json(newCourse);

    }catch(err){
        next(err);
    }
}

export const getCourses = async(req,res,next)=>{
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        next(err);
        
    }
}