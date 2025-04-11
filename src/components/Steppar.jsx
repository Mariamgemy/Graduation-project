import React, { useState } from "react";
import { CDBContainer } from "cdbreact";
import "../Css/Steppar.css"; // تأكد من وجود هذا الملف

const Steppar = () => {
  const [active, setActive] = useState(1);
  const stepsCount = 4; // عدد الخطوات كما في الصورة

  const handleStepClick = stepNumber => {
    setActive(stepNumber);
  };

  const renderSteps = () => {
    const steps = [];
    for (let i = stepsCount; i >= 1; i--) {
      steps.push(
        <div
          key={i}
          className={`step-circle ${active === i ? 'active' : ''}`}
          onClick={() => handleStepClick(i)}
        >
          {i}
        </div>
      );
      if (i > 1) {
        steps.push(<div key={`line-${i}`} className="step-line"></div>);
      }
    }
    return steps;
  };

  return (
    <CDBContainer>
      <div className="stepper-container">
        {renderSteps()}
      </div>

      {/* يمكنك إضافة محتوى الخطوة النشطة هنا بناءً على قيمة 'active' */}
      <div style={{ marginTop: '20px' }}>
        {/* ... محتوى الخطوات هنا بناءً على قيمة active ... */}
      </div>
    </CDBContainer>
  );
};

export default Steppar;