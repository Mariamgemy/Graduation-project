

import React, { useRef, useState } from "react";
import UtilityServices from "./Services/UtilityServices";
// import CaptchaComponent from "./captcha";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/UniqueCard.css";
import "../Css/Form.css";
import CivilServices from "./Services/CivilServices";
import TrafficServices from "./Services/TrafficServices";
import HousingServices from "./Services/HousingServices";

function Formm() {
  const location = useLocation();
  const card = location.state;
  const utilityRef = useRef();
  const civilRef = useRef();
  const trafficRef = useRef();
  const housingRef = useRef();
  const navigate = useNavigate();
  const captchaRef = useRef();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isUtilityCard =
    card.title === "سداد فاتورة الكهرباء" ||
    card.title === "سداد فاتورة المياه" ||
    card.title === "سداد فاتورة الغاز" ;


  const isCivilCard =
    card.title === "شهادة ميلاد" ||
    card.title === "شهادة وفاة" ||
    card.title === "قسيمة زواج" ||
    card.title === "قسيمة طلاق"||
    card.title === "شهادة ميلاد مميكنة لأول مرة";

  const isTrafficCard =
    card.title === "تجديد رخصة قيادة" ||
    card.title === "تجديد رخصة سيارة"||
    card.title === "بدل فاقد / تالف للرخص"||
    card.title === "مخالفات المرور ودفعها";

const isHousingCard =
    card.title === "شهادة كفاءة الطاقة" ||
    card.title === "متابعة استهلاك المياه والكهرباء بشكل لحظي" ||
    card.title ==="التقديم على عداد كهرباء / مياه"||
    card.title==="نقل ملكية عداد"||
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
      if ( isCivilCard ) {
        const isValidCivil = civilRef.current?.validateForm();
        if (!isValidCivil) isFormValid = false;
        else formData = civilRef.current?.getFormData(); // نجمع البيانات هنا
      }
      if (isTrafficCard) {
        const isValidTraffic = trafficRef.current?.validateForm();
        if (!isValidTraffic) isFormValid = false;
        else formData = trafficRef.current?.getFormData(); // نجمع البيانات هنا
      }
      if (isHousingCard) {
        const isValidHousing = housingRef.current?.validateForm();
        if (!isValidHousing) isFormValid = false;
        else formData = housingRef.current?.getFormData(); // نجمع البيانات هنا
      }
    
      // const isCaptchaValid = captchaRef.current?.validateCaptchaField();
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
      {isCivilCard && <CivilServices ref={civilRef} />}
      {isTrafficCard && <TrafficServices ref={trafficRef} />}
      {isHousingCard && <HousingServices ref={housingRef} />}
      {/* <CaptchaComponent ref={captchaRef} /> */}

      {/* <button
        type="submit"
        className={`btn nav-btn px-4 py-2 fs-5 mb-2 ${
          formSubmitted ? "btn-success" : "btn-outline-secondry"
        }`}
      >
        بحث
      </button> */}

     

    </form>
    </div> 
     </>
  );
}

export default Formm;