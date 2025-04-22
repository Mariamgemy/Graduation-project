import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Css/NavigationButtons.css'; // تأكد من استيراد ملف CSS

function NavigationButtons() {
  const [activeButton, setActiveButton] = useState('بيانات اللوحة');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`تم النقر على زر: ${buttonName}`);
  };

  return (
    <div className="navigation-container">
      <div className="d-flex justify-content-around align-items-center">
        <button
          type="button"
          className={`btn btn-light border rounded-0 ${activeButton === 'بيانات الشهادة' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('بيانات الشهادة')}
        >
          <i className="bi bi-file-earmark-text me-2"></i> بيانات الشهادة
        </button>
        <button
          type="button"
          className={`btn btn-light border rounded-0 ${activeButton === 'بيانات الاستلام' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('بيانات الاستلام')}
        >
       <i className="bi bi-person-vcard me-2"></i> بيانات الاستلام
        </button>
        {/* <button
          type="button"
          className={`btn btn-light border rounded-0 ${activeButton === 'الرقم المروري' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('الرقم المروري')}
        >
          <i className="bi bi-person-vcard me-2"></i> الرقم المروري
        </button> */}
        <button
          type="button"
          className={`btn btn-light border rounded-0 ${activeButton === 'نتيجة الطلب' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('نتيجة الطلب')}
        >
            <i className="bi bi-card-text me-2"></i>  نتيجة الطلب  
        </button>
      </div>
      <div className="separator-line"></div>
    </div>
  );
}

export default NavigationButtons;