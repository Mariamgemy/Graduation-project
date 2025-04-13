import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Css/PasswordInput.css";

const PasswordInput = ({ value, onChange, placeholder, className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`password-input-container ${className}`}>
      <FaLock className="password-icon" />
      <input
        type={showPassword ? "text" : "password"}
       className="form-control  mb-2"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ paddingRight: "35px" }}
      />
      <button
        type="button"
        className="toggle-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEye />: <FaEyeSlash />  }
      </button>
    </div>
  );
};

export default PasswordInput;
