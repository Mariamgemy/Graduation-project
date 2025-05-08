import React from "react";
import { FaUser, FaFileAlt, FaCheck } from "react-icons/fa";
import "../Css/NavigationButtons.css";

const TrafficNavigationButtons = ({ activeStep, setActiveStep, formData }) => {
  const buttons = [
    { label: "البيانات الشخصية", icon: <FaUser /> },
    { label: "بيانات الرخصة", icon: <FaFileAlt /> },
    { label: "بيانات الاستلام", icon: <FaFileAlt /> },
    { label: "تأكيد الطلب", icon: <FaCheck /> },
  ];

  const isStep1Completed = () => {
    if (!formData) return false;

    const {
      card,
fullName,
id,
birthDate,
    
    } = formData;
if (card.title ==="تجديد رخصة قيادة")
    if (!fullName || !id || !birthDate) return false;

    return true;
  };

  const isStep2Completed = () => {
    if (!formData) return false;

    const { deliveryInfo } = formData;

    // التحقق من اكتمال بيانات الاستلام
    if (
      !deliveryInfo ||
      !deliveryInfo.name ||
      !deliveryInfo.phone ||
      !deliveryInfo.address ||
      !deliveryInfo.governorate
    ) {
      return false;
    }

    return true;
  };
  const isStep3Completed = () => {
    if (!formData) return false;

    const { deliveryInfo } = formData;

    // التحقق من اكتمال بيانات الاستلام
    if (
      !deliveryInfo ||
      !deliveryInfo.name ||
      !deliveryInfo.phone ||
      !deliveryInfo.address ||
      !deliveryInfo.governorate
    ) {
      return false;
    }

    return true;
  };

  const handleButtonClick = (index) => {
    // منع الانتقال إلى الخطوة 2 إذا لم تكتمل الخطوة 1
    if (index === 1 && !isStep1Completed()) {
      return;
    }

    if (index === 2 && !isStep2Completed()) {
        return;
    }
    // منع الانتقال إلى الخطوة 4 إذا لم تكتمل الخطوة 3
    if (index === 3 && !isStep3Completed()) {
      return;
    }

    setActiveStep(index + 1);
  };

  return (
    <div className="navigation-container">
      <div className="d-flex justify-content-around align-items-center">
        {buttons.map((button, index) => {
          const isDisabled =
            (index === 1 && !isStep1Completed()) ||
            (index === 2 && !isStep2Completed())||
            (index === 3 && !isStep3Completed());


          return (
            <button
              key={index}
              type="button"
              className={`btn btn-light border rounded-0 ${
                activeStep === index + 1 ? "active-button" : ""
              } ${isDisabled ? "disabled" : ""} `}
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

export default TrafficNavigationButtons;
