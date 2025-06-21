import { MdAttachEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import "../Css/PhoneInput.css";

const EmailInput = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <div className={`phone-input-container ${className}`}>
      <MdAttachEmail  className="phone-icon" />
      <input
        autoComplete="email"
        type="email"
        name="email"
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
