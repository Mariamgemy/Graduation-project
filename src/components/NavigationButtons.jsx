import React from "react";
import { FaUser, FaFileAlt, FaCheck } from "react-icons/fa";
import "../Css/NavigationButtons.css";

const NavigationButtons = ({ activeStep, setActiveStep, formData }) => {
  const buttons = [
    { label: "بيانات الطلب", icon: <FaUser /> },
    { label: "بيانات الاستلام", icon: <FaFileAlt /> },
    { label: "نتيجة الطلب", icon: <FaCheck /> },
  ];

  const isStep1Completed = () => {
    if (!formData) return false;

    const {
      card,
      motherName,
      isSelf,
      numberOfCopies,
      quadriliteralName,
      id,
      anotherMotherName,
      kinship,
      gender,
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

    if (
      card.title === "شهادة ميلاد" ||
      card.title === "قسيمة زواج" ||
      card.title === "قسيمة طلاق"
    ) {
      if (!motherName || !isSelf) return false;
      if (isSelf === true && !numberOfCopies) return false;
      if (
        isSelf === false &&
        (!quadriliteralName ||
          !id ||
          !anotherMotherName ||
          !kinship ||
          !gender ||
          !numberOfCopies)
      )
        return false;
    } else if (
      card.title === "شهادة ميلاد مميكنة لأول مرة" ||
      card.title === "شهادة وفاة"
    ) {
      if (!quadriliteralName || !kinship) return false;
    }
    else if (card.title === "شهادة كفاءة الطاقة") {

      if (!quadriliteralName ||!id ||!detailedAddress ||!phone || !facilityType || !certificateType || !elctricBill || !idPhoto) return false
    }
    
    else if (card.title === "تقديم شكوى مرافق" ) {
      if (!fullName || !subscriberNumber || !complaintType || !complaintDescription || !governorate || !utilityType || !detailedAddress || !phone || !email) return false
    }

    
    else if(card.title ==="التقديم على عداد كهرباء / مياه"){
      if (!id || !email || !phone || !fullName) return false

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

export default NavigationButtons;
