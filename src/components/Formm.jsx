

// import React, { useState } from "react";
// import Steppar from "./Steppar";
// import NavigationButtons from "./NavigationButtons";
// import CaptchaComponent from "./captcha";
// import "../Css/UniqueCard.css";
// import "../Css/Form.css";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import TrafficServices from "./Services/TrafficServices";
// import UtilityServices from "./Services/UtilityServices"


// function Formm() {

//   const utilityRef = useRef();

//   // const [captcha, setCaptcha] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // هنا يمكنك إضافة منطق إرسال النموذج والتحقق من البيانات
//     console.log("تم إرسال النموذج:", {
//       plateNumber,
//       plateSource,
//       plateType,
//       plateCode,
//       captcha,
//     });
//   };

//   const location = useLocation();
//   const card = location.state;

//   return (
//     <div>
//       <div className=" p-4">
//       <h2 className="mb-5 text-primary text-color">{card.title}</h2>

       
//         {/* أزرار التنقل بين أنواع الاستعلام */}
//         <div className="mb-3">
  
//         </div>

//         <form onSubmit={handleSubmit}>
//         <TrafficServices/>
//         <UtilityServices/>

      
          
         
//           {/* حقل التحقق (Captcha) - تصميم بسيط */}
//           <CaptchaComponent />

//           <Link
//             to={"/backend"}
//             className="btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2"
//           >
//             بحث
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Formm;

// import React, { useState, useRef } from "react";
// import UtilityServices from "./Services/UtilityServices";
// import { useLocation } from "react-router-dom";
// import CaptchaComponent from "./captcha";
// import { useNavigate  } from "react-router-dom";
// import "../Css/UniqueCard.css"
// import "../Css/Form.css";

// function Formm() {
//   const location = useLocation();
//   const card = location.state;
//   const utilityRef = useRef();
//   const navigate = useNavigate();
//   const captchaRef = useRef(); 

//   const isUtilityCard =
//   card.title === "سداد فاتورة الكهرباء" ||
//   card.title === "سداد فاتورة المياه" ||
//   card.title === "سداد فاتورة الغاز" ||
//   card.title === "تقديم شكوى مرافق";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isUtilityCard) {
//       const isValid = utilityRef.current?.validateForm();
//       if (!isValid) return; // لو في أخطاء مش هيكمل
//     }

//     console.log("نموذج صالح للإرسال ✅");
//     // تكملي إرسال البيانات أو التنقل للصفحة التالية
//     navigate("/backend");
//   };

//   return (
//     <>
//     <div className=" p-4">  
//           <h2 className="mb-5  text-color">{card.title}</h2>

//     <form onSubmit={handleSubmit}>
//       {isUtilityCard && <UtilityServices ref={utilityRef} />}
//       <CaptchaComponent ref={captchaRef} />
      // <button
      //   type="submit"
      //   className="btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2"
      // >
      //   بحث
      // </button>
//     </form>
//     </div>
//     </>
//   );
// }
// export default Formm;

import React, { useRef, useState } from "react";
import UtilityServices from "./Services/UtilityServices";
import CaptchaComponent from "./captcha";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/UniqueCard.css";
import "../Css/Form.css";

function Formm() {
  const location = useLocation();
  const card = location.state;
  const utilityRef = useRef();
  const navigate = useNavigate();
  const captchaRef = useRef();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isUtilityCard =
    card.title === "سداد فاتورة الكهرباء" ||
    card.title === "سداد فاتورة المياه" ||
    card.title === "سداد فاتورة الغاز" ||
    card.title === "تقديم شكوى مرافق";

  const handleSubmit = (e) => {
    e.preventDefault();

    let isFormValid = true;

    if (isUtilityCard) {
      const isValidUtility = utilityRef.current?.validateForm();
      if (!isValidUtility) isFormValid = false;
    }
  
    const isCaptchaValid = captchaRef.current?.validateCaptchaField();
    if (!isCaptchaValid) isFormValid = false;
  
    if (!isFormValid) return;

    console.log("النموذج صالح للإرسال ✅");
    setFormSubmitted(true);
    navigate("/backend");
  };

  return (
    <>
     <div className=" p-4">  
           <h2 className="mb-5  text-color">{card.title}</h2>
  
    <form onSubmit={handleSubmit}>
      {isUtilityCard && <UtilityServices ref={utilityRef} />}
      <CaptchaComponent ref={captchaRef} />

      <button
        type="submit"
        className={`btn nav-btn px-4 py-2 fs-5 mb-2 ${
          formSubmitted ? "btn-success" : "btn-outline-secondry"
        }`}
      >
        بحث
      </button>


      {formSubmitted && (<button
        type="submit"
        className="btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2"
      >
        بحث
      </button>)}
    </form>
    </div> 
     </>
  );
}

export default Formm;
