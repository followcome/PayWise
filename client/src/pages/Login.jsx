import axios from "axios";
import { useState } from "react";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:7200/api/auth/login",{email
                ,password,
            });
            ///Save token to local storage
            localStorage.setItem("token",res.data.token);
            alert("Login Successful!");
        } catch (err) {
            alert("Login failed:"+err.response?.data?.message || err.message);
            
        }

    };
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
        <input type="email"placeholder="Email"
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <input type="password"placeholder="password"
        value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <button type="submit">Login</button>

    </form>
        </div>
    )
}