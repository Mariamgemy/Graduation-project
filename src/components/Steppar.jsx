import React from "react";
import { CDBContainer } from "cdbreact";
import "../Css/Steppar.css";

const Steppar = ({ active, setActive, formData }) => {
  const stepsCount = 3;

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
      if (
        !quadriliteralName ||
        !kinship ||
        !anotherMotherName ||
        !gender ||
        !id ||
        !numberOfCopies
      )
        return false;
    } else if (card.title === "شهادة كفاءة الطاقة"){
      if (  !quadriliteralName ||
        !id ||
        !detailedAddress ||
        !phone ||
        !facilityType ||
        !certificateType ||
        !elctricBill ||
        !idPhoto ) return false;
    }
    else if (card.title === "تقديم شكوى مرافق"){
      if(!email ||
        !subscriberNumber ||
        !fullName ||
        !complaintType ||
        !governorate ||
        !complaintDescription ||
        !utilityType)  return false;
    }
    else if (card.title === "التقديم على عداد كهرباء / مياه"){
      if(!email ||
        !phone ||
        !fullName ||
        !id)  return false;

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

  const handleStepClick = (stepNumber) => {
    // منع الانتقال إلى الخطوة 2 إذا لم تكتمل الخطوة 1
    if (stepNumber === 2 && !isStep1Completed()) {
      return;
    }

    // منع الانتقال إلى الخطوة 3 إذا لم تكتمل الخطوة 2
    if (stepNumber === 3 && !isStep2Completed()) {
      return;
    }

    setActive(stepNumber);
  };

  const renderSteps = () => {
    const steps = [];
    for (let i = stepsCount; i >= 1; i--) {
      const isDisabled =
        (i === 2 && !isStep1Completed()) || (i === 3 && !isStep2Completed());

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

export default Steppar;
