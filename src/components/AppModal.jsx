import { useState } from "react";
import { Modal } from "react-bootstrap";
import LoginCard from "../pages/LoginCard";
import CustomModal from "../pages/IdValidation";
import ForgotPassword from "../pages/ForgotPassword";

const AppModal = ({ show, onHide, type }) => {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setStep(1);
    onHide();
  };

  const renderModalContent = () => {
    switch (type) {
      case "login":
        return (
          <LoginCard
            show={show}
            handleClose={handleClose}
            openRegister={() => onHide("register")}
            openForgotPassword={() => onHide("forgotPassword")}
          />
        );
      case "register":
        return <CustomModal show={show} handleClose={handleClose} />;
      case "forgotPassword":
        return <ForgotPassword show={show} handleClose={handleClose} />;
      default:
        return null;
    }
  };

  return renderModalContent();
};

export default AppModal;
