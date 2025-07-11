import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import "../Css/NavigationButtons.css";
import { FaIdCard , FaFileAlt, FaCheck } from "react-icons/fa";

const NavigationButtons = ({
  activeStep,
  setActiveStep,
  formData,
  stepLabels,
}) => {
  // تحديد العنوان حسب نوع الخدمة
  const getFirstStepLabel = () => {
    if (formData?.card?.title) {
      // خدمات المرور
      if (
        formData.card.title === "تجديد رخصة قيادة" ||
        formData.card.title === "بدل فاقد / تالف للرخص" ||
        formData.card.title === "طلب رخصة إلكترونية" ||
        formData.card.title === "مخالفات المرور ودفعها"
      ) {
        return "بيانات الرخصة";
      }
      // الخدمات المدنية
      else if (
        formData.card.title === "شهادة ميلاد" ||
        formData.card.title === "قسيمة زواج" ||
        formData.card.title === "قسيمة طلاق" ||
        formData.card.title === "شهادة ميلاد مميكنة لأول مرة" ||
        formData.card.title === "شهادة وفاة"
      ) {
        return "بيانات الطلب";
      }
    }
    // افتراضي
    return "بيانات الطلب";
  };

  const currentLabels = stepLabels || [
    { label: getFirstStepLabel(), icon: <FaIdCard /> },
    { label: "بيانات الاستلام", icon: <FaFileAlt /> },
    { label: "تأكيد الطلب", icon: <FaCheck /> },
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
      licenseNumber,
      licenseType,
      personalPhoto,
      medicalResult,
      renewalPeriod,
    } = formData;

    if (
      card?.title === "شهادة ميلاد" ||
      card?.title === "قسيمة زواج" ||
      card?.title === "قسيمة طلاق"
    ) {
      if (!motherName || isSelf === "") return false;
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
      card?.title === "شهادة ميلاد مميكنة لأول مرة" ||
      card?.title === "شهادة وفاة"
    ) {
      if (
        !quadriliteralName ||
        !id ||
        !anotherMotherName ||
        !gender ||
        !kinship ||
        !numberOfCopies
      )
        return false;
    } else if (card?.title === "تجديد رخصة قيادة") {
      if (
        !licenseNumber ||
        !licenseType ||
        !personalPhoto ||
        !medicalResult ||
        !renewalPeriod
      )
        return false;
    }

    return true;
  };

  const isStep2Completed = () => {
    if (!formData) return false;

    const { governorate, city, district, detailedAddress } = formData;

    // التحقق من اكتمال بيانات الاستلام
    if (!governorate || !city || !district || !detailedAddress) {
      return false;
    }

    return true;
  };

  const handleButtonClick = (index) => {
    if (index === 1 && !isStep1Completed()) {
      return;
    }
    if (index === 2 && !isStep2Completed()) {
      return;
    }
    setActiveStep(index + 1);
  };

  return (
    <div className="navigation-container">
      <div className="justify-content-around align-items-center">
        {currentLabels.map((button, index) => {
          const isDisabled =
            (index === 1 && !isStep1Completed()) ||
            (index === 2 && !isStep2Completed());

          const isCompleted =
            (index === 0 && isStep1Completed()) ||
            (index === 1 && isStep2Completed());

          return (
            <button
              key={index}
              type="button"
              className={`btn btn-light border rounded-0 ${
                activeStep === index + 1 ? "active-button" : ""
              } ${isDisabled ? "disabled" : ""} ${
                isCompleted ? "completed-button" : ""
              }`}
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
