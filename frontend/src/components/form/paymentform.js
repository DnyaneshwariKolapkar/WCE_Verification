import React from 'react'
import '../../assets/style.css'
import { useState } from 'react';

const Paymentform = () => {
    const [loading, setLoading] = useState(false);
    const [orderAmount, setOrderAmount] = useState(100);
    const [orders, setOrders] = useState({ order_id: "order_LIGD2sNvGUnVJ3" });

    const handlePayment = async () => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onerror = () => {
            alert("Error occured while loading script");
        };
        script.onload = async () => {
            try {
                const options = {
                    key: "rzp_test_QwvhpNmUFUsCQQ",
                    amount: orderAmount,
                    currency: "INR",
                    name: "Razorpay",
                    description: "Test Transaction",
                    order_id: orders.order_id,
                    handler: async (response) => {
                        const data = {
                            orderCreationId: orders.order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };
                        alert("Payment Successful");
                        setLoading(false);
                    },
                    prefill: {
                        name: "Gaurav Kumar",
                        email: "example",
                        contact: "9999999999",
                    },
                };
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                paymentObject.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                setLoading(true);                
            } catch (error) {
            alert("Error");
            setLoading(false);
        }
    };
    document.body.appendChild(script);
}


return (
    <>
        <br />
        <div className="container" >
        <div className="title">Payment form</div>
        <div className="content">
          <div className='div-form'>
            <div className="user-details">
              <div className="input-box">
                <div className="details">Total Number of Students</div>
                <input type="number" placeholder="" required  style={{width:"30%"}}/>
              </div>
              <div className="input-box">
                <div className="details">Total Amount (900<span>&#215;</span>Total no of students)</div>
                <input type="number" placeholder="Total amount" required  style={{width:"30%"}}/>
              </div>
              <hr style={{ width: '100%', textAlign: 'left' }} />
            </div>
            {/* <button classname="button" disabled={loading} onClick={handlePayment} >Pay</button>
        {loading && <p>Processing...</p>} */}
        <div className="button">
              <input type="submit" value="Pay" disabled={loading} onClick={handlePayment}/>
              {loading && <p>Processing...</p>}
            </div>
          </div>
        </div>
      </div>
        
    </>
)
}

export default Paymentform;
