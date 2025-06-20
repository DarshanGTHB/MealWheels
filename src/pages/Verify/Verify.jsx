import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Verify =  () => {
    const [params, setParams] = useState(new URLSearchParams(window.location.search));
    const success = params.get('success');
    const order_id = params.get('order_id');
    const navigate = useNavigate();

    const verifyPayment = async () => {
        // console.log("Verifying payment with success:", success, "and order_id:", order_id);
        if(!success || !order_id) {
            console.error("Invalid parameters");
            return;
        }else if(success === "true") {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/verify`, {
                    method: 'POST',
                    body: JSON.stringify({ order_id }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if(response.ok) {
                    const data = await response.json();
                    // console.log("Payment verified successfully:", data);
                    navigate("/orders");
                } else {
                    console.error("Failed to verify payment");
                }
            } catch (error) {
                navigate("/cart");
                console.error("Error verifying payment:", error);
            }
        } else {
          navigate("/cart");
            console.error("Payment verification failed");
        }
    };
    
    verifyPayment();
  return (
    <div>Verifying......</div>
  )
}

export default Verify
