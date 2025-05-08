import React from "react";
import { CDBContainer } from "cdbreact";
import "../Css/Steppar.css";

const TrafficStepper = ({ active, setActive, formData }) => {
  const stepsCount = 4;

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
      

  }
    

 

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

  const handleStepClick = (stepNumber) => {
    // منع الانتقال إلى الخطوة 2 إذا لم تكتمل الخطوة 1
    if (stepNumber === 2 && !isStep1Completed()) {
      return;
    }

    // منع الانتقال إلى الخطوة 3 إذا لم تكتمل الخطوة 2
    if (stepNumber === 3 && !isStep2Completed()) {
      return;
    }
    if (stepNumber === 4 && !isStep3Completed()) {
      return;
    }

    setActive(stepNumber);
  };

  const renderSteps = () => {
    const steps = [];
    for (let i = stepsCount; i >= 1; i--) {
      const isDisabled =
        (i === 2 && !isStep1Completed()) || (i === 3 && !isStep2Completed()) || (i===4 && !isStep3Completed());

      steps.push(
        <div
          key={i}
          className={`step-circle ${active === i ? "active" : ""} ${
            isDisabled ? "disabled" : ""
          }`}
          onClick={() => handleStepClick(i)}
          style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
        >
          {i}
        </div>
      );
      if (i > 1) {
        steps.push(
          <div
            key={`line-${i}`}
            className={`step-line ${isDisabled ? "disabled" : ""}`}
          />
        );
      }
    }
    return steps;
  };

  return (
    <CDBContainer>
      <div className="stepper-container">{renderSteps()}</div>
    </CDBContainer>
  );
};

export default TrafficStepper;
