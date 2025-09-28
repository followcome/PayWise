import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PaymentSuccess.css';

export default function PaymentSuccess (){
    const {subscriptionId } = useParams();
    console.log("PaymentSuccess mount. subscriptionId:", subscriptionId);
    const [status,setStatus] = useState("Verifying...");
    useEffect(()=>{
        const VerifyPayment = async ()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment/verify/${subscriptionId}`);
                setStatus(res.data.message);
            } catch (err) {
        
                setStatus("Verification failed")
                
            }
            
        };
        VerifyPayment()
        
    },[subscriptionId]);

    return(
        <div className="success-container">
            <h1>Payment Status</h1>
            <p>{status}</p>
        </div>
    )
}