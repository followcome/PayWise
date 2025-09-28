import axios from "axios"
import { useEffect, useState } from "react"
import "./Home.css";


export default function Home (){
    const [courses, setCourses] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const fetchCourses = async ()=>{
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api`,
                    {withCredentials:true}
                );


                setCourses(res.data);
            } catch (err) {

                setError(err.message);
                
            }finally{
                setLoading(false);
            }
        }
        fetchCourses();
    },[]);
    const handleBuyCourse = async (courseId)=>{
        const token = localStorage.getItem("token");
        if(!token) {
            alert("You must login first!");
            return;
        }
        
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/initialize/${courseId}`,
                {},{headers:{
                    Authorization:`Bearer ${token}`
                }}
            );
            window.location.href = res.data.authorization_url;
        } catch (err) {
            
            setError(err.message);
            
        }
    }
        if(loading) return <p>Loading Courses...</p>
        if(error) return <p style={{color:"red"}}>Error:{error}</p>;
        if(courses.length === 0) return <p>No courses found.</p>

    return <div className="home-container" >
            <h1>Available Courses</h1>
            
            {courses.map((course)=>(
                <div key={course._id} className="course-card">
                    <h3 className="course-title">{course.title}-₦{course.price}</h3>
                    <button className="buy-button" onClick={()=>handleBuyCourse(course._id)}>Buy Now</button>

                </div>
            ))}
    </div>
}

    