

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

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      let isFormValid = true;
    
      let formData = {};
    
      if (isUtilityCard) {
        const isValidUtility = utilityRef.current?.validateForm();
        if (!isValidUtility) isFormValid = false;
        else formData = utilityRef.current?.getFormData(); // نجمع البيانات هنا
      }
    
      const isCaptchaValid = captchaRef.current?.validateCaptchaField();
      if (!isCaptchaValid) isFormValid = false;
    
      if (!isFormValid) return;
    
      console.log("النموذج جاهز للإرسال ✅");
      console.log("البيانات ال هتبعت:", formData);
    
      // await submitToAPI(formData); // إرسال البيانات
      setFormSubmitted(true);
      // navigate("/backend", { state: { responseData: response } });
      try {
        const response = await submitToAPI(formData); 
    
      
        navigate("/backend", { state: { responseData: response } });
      } catch (error) {
        console.error("خطأ أثناء الإرسال:", error.message);
      }
    };
  
    
    const submitToAPI = async (data) => {
      try {
        const response = await fetch("https://your-backend-api.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error("فشل في الإرسال إلى السيرفر");
        }
    
        const result = await response.json();
        console.log("تم الإرسال بنجاح ✅", result);
      } catch (error) {
        console.error("خطأ أثناء الإرسال:", error.message);
      }
    };
    

  return (
    <>
     <div className=" p-4">  
           <h2 className="mb-5  text-color">{card.title}</h2>
  
    <form onSubmit={handleSubmit}>
      {isUtilityCard && <UtilityServices ref={utilityRef} />}
      <CaptchaComponent ref={captchaRef} />

      {/* <button
        type="submit"
        className={`btn nav-btn px-4 py-2 fs-5 mb-2 ${
          formSubmitted ? "btn-success" : "btn-outline-secondry"
        }`}
      >
        بحث
      </button> */}

      <button
  type="submit"
  className={`btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2 ${formSubmitted ? "btn-success" : "btn-outline-secondry"}`}
>
  {formSubmitted ? "تم الإرسال بنجاح" : "بحث"}
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
