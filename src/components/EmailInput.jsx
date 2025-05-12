
import { FaMobileAlt } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import "../Css/PhoneInput.css";

const EmailInput = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <div className={`phone-input-container ${className}`}>
      <FaMobileAlt className="phone-icon" />
      <input
        type="text"
      className="form-control mb-2"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ paddingRight: "35px" }}
      />
    </div>
  );
};

export default EmailInput;
