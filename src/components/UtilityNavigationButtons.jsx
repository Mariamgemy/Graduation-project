import React from "react";
import { FaUser, FaFileAlt, FaCheck } from "react-icons/fa";
import "../Css/NavigationButtons.css";

const UtilityNavigationButtons = ({ activeStep, setActiveStep, formData }) => {
  const buttons = [
    { label: "بيانات مقدم الطلب", icon: <FaUser /> },
    { label: "بيانات العداد والعقار", icon: <FaFileAlt /> },
    { label: "نتيجة الطلب", icon: <FaCheck /> },
  ];

  const isStep1Completed = () => {
    if (!formData) return false;

    const {
      card,
   
      quadriliteralName,
      id,
phone,
      idPhoto,
      certificateType,
      facilityType,
      elctricBill,
      detailedAddress,
      subscriberNumber,
      fullName,
      email,
      complaintType,
      governorate,
      complaintDescription,
      utilityType,
    } = formData;

   
      if (card.title === "شهادة كفاءة الطاقة" || card.title === "تقديم شكوى مرافق") {
        if(    !quadriliteralName || !id || !detailedAddress || !phone || !facilityType || !certificateType || !elctricBill || !idPhoto ||!email || !subscriberNumber || !fullName || !complaintType || !governorate || !complaintDescription || !utilityType)
        return false;  }
     else if (
      card.title === "شهادة ميلاد مميكنة لأول مرة" ||
      card.title === "شهادة وفاة"
    ) {
      if (!quadriliteralName || !kinship) return false;
    }

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

  const handleButtonClick = (index) => {
    // منع الانتقال إلى الخطوة 2 إذا لم تكتمل الخطوة 1
    if (index === 1 && !isStep1Completed()) {
      return;
    }

    // منع الانتقال إلى الخطوة 3 إذا لم تكتمل الخطوة 2
    if (index === 2 && !isStep2Completed()) {
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
            (index === 2 && !isStep2Completed());

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

export default UtilityNavigationButtons;
