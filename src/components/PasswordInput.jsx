import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Css/PasswordInput.css";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  className = "",
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`password-input-container ${className}`}>
      <FaLock className="password-icon" />
      <input
        autoComplete={
          name === "new-password" ? "new-password" : "current-password"
        }
        type={showPassword ? "text" : "password"}
        name={name}
        className="form-control mb-2"
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
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;
