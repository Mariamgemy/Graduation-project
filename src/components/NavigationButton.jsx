import React from "react";
import "../Css/NavigationButtons.css";

const NavigationButton = ({
  activeStep,
  setActiveStep,
  buttons,
  validations = [],
}) => {
  const handleButtonClick = (index) => {
    // لو فيه دالة فاليديشن خاصة بالخطوة دي ومش محققة الشرط، امنع التنقل
    if (validations[index] && !validations[index]()) {
      return;
    }
    setActiveStep(index + 1);
  };

  return (
    <div className="navigation-container">
      <div className="d-flex justify-content-around align-items-center">
        {buttons.map((button, index) => {
          const isDisabled =
            validations[index] && !validations[index]();

          return (
            <button
              key={index}
              type="button"
              className={`btn btn-light border rounded-0 ${
                activeStep === index + 1 ? "active-button" : ""
              } ${isDisabled ? "disabled" : ""}`}
              onClick={() => handleButtonClick(index)}
              disabled={isDisabled}
            >
              {button.icon} {button.label}
            </button>
          );
        })}
      </div>
      <div className="separator-line"></div>
    </div>
  );
};

export default NavigationButton;
