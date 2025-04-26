import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Css/PaymentMethods.css";

const PaymentMethods = () => {
    const [selected, setSelected] = useState("");

    const methods = [
      {
        id: "cash",
        name: "الدفع عند الاستلام",
        icon: "💵",
      },
      {
        id: "paypal",
        name: "PayPal",
        icon: "💳",
      },
    ];

  return (
    <div className="payment-methods-container"> {/* Use the container class */}
      <label className="payment-methods-label mb-3 form-label">طريقة الدفع</label>

      <div className="d-flex gap-4  items-center flex-wrap"> 
        {methods.map((method) => (
          <motion.label
            key={method.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`payment-method-label ${ // Use the method label class
              selected === method.id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="payment-method-radio" // Use the radio class
            />
            <div className="payment-method-icon">{method.icon}</div> {/* Use the icon class */}
            <div className="payment-method-name">{method.name}</div> {/* Use the name class */}
          </motion.label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;