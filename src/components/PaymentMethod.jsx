import React, { useState } from "react";
import { motion } from "framer-motion";
import StripePayment from "./StripePaymentForm"; // Import the Stripe form
import "../Css/PaymentMethods.css";

// Assuming billDetails are passed as props or fetched from context/state
const PaymentMethods = ({ billDetails, onPaymentSuccess, onPaymentError }) => {
    const [selected, setSelected] = useState(""); // Default selection

    const methods = [
      {
        id: "cash",
        name: "الدفع عند الاستلام", // Cash on Delivery
        icon: "💵",
      },
      {
        id: "stripe", // Changed PayPal to Stripe
        name: "أدفع الآن ", // Updated name
        icon: "💳",
      },
      // Add other methods if needed
    ];

  return (
    <div className="payment-methods-container"> 
      <label className="payment-methods-label mb-3 form-label">طريقة الدفع</label>

      <div className="d-flex gap-4 items-center flex-wrap mb-4"> 
        {methods.map((method) => (
          <motion.label
            key={method.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`payment-method-label ${ 
              selected === method.id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="payment-method-radio" 
            />
            <div className="payment-method-icon">{method.icon}</div> 
            <div className="payment-method-name">{method.name}</div> 
          </motion.label>
        ))}
      </div>

      {/* Conditionally render the Stripe form */}
      {selected === "stripe" && (
        <div className="stripe-form-section mt-4">
          <h5>Enter Card Details:</h5>
          <StripePayment 
            billDetails={billDetails} 
            onPaymentSuccess={onPaymentSuccess} 
            onPaymentError={onPaymentError} 
          />
        </div>
      )}

      {/* Add logic for other payment methods if needed */}
      {selected === "cash" && (
         <div className="cash-payment-section mt-4">
            <p>Payment will be collected upon delivery/service completion.</p>
            {/* Optionally add a button to confirm cash payment choice */}
            {/* <button onClick={handleConfirmCash}>Confirm Cash Payment</button> */}
         </div>
      )}

    </div>
  );
};

export default PaymentMethods;

