
// import { card } from "react-bootstrap"
import NavigationButtons from "../NavigationButtons"
import Steppar from "../Steppar"
import { useLocation } from "react-router-dom";
import { useState } from "react";

function TrafficServices() {
    const location = useLocation();
    const card = location.state;

    const [plateNumber, setPlateNumber] = useState("");
      const [plateSource, setPlateSource] = useState("");
      const [plateType, setPlateType] = useState("");
      const [plateCode, setPlateCode] = useState("");

      const handleSubmit = (event) => {
        event.preventDefault();
        // إرسال النموذج والتحقق من البيانات
        console.log("تم إرسال النموذج:", {
          plateNumber,
          plateSource,
          plateType,
          plateCode,
          captcha,
        });
      };
  return (
    <div>
        
        {card.title === "مخالفات المرور ودفعها" && (
          <>
        
            <Steppar />
      <NavigationButtons />
  
      {/* حقول المخالفات */}
      <div className="mb-3">
      <label htmlFor="plateNumber" className="form-label">
              رقم اللوحة *
            </label>
            <input
              type="text"
              className="form-control"
              id="plateNumber"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="plateSource" className="form-label">
              المحافظة *
            </label>
            <select
              className="form-select  custom-select-style"
              id="plateSource"
              value={plateSource}
              onChange={(e) => setPlateSource(e.target.value)}
            >
              <option value="">برجاء الاختيار</option>
            
              <option value="1">القاهرة</option>
              <option value="2">الإسكندرية</option>
              <option value="3">الجيزة</option>
              <option value="4">الدقهلية</option>
              <option value="5">الشرقية</option>
              <option value="6">القليوبية</option>
              <option value="7">المنوفية</option>
              <option value="8">الغربية</option>
              <option value="9">المنيا</option>
              <option value="10">أسيوط</option>
              <option value="11">سوهاج</option>
              <option value="12">قنا</option>
              <option value="13">أسوان</option>
              <option value="14">الأقصر</option>
              <option value="15">البحر الأحمر</option>
              <option value="16">شمال سيناء</option>
              <option value="17">جنوب سيناء</option>
              <option value="18">الفيوم</option>
              <option value="19">بني سويف</option>
              <option value="20">سوهاج</option>
              <option value="21">الوادى الجديد</option>
              <option value="22">كفر الشيخ</option>
              <option value="23">دمياط</option>
              <option value="24">بورسعيد</option>
              <option value="25">السويس</option>
              <option value="26">الإسماعيلية</option>
              <option value="27">الجيزة</option>
              <option value="28">شمال سيناء</option>
              <option value="29">جنوب سيناء</option>
              <option value="30">الشرقية</option>
              <option value="31">البحيرة</option>
              <option value="32">المنوفية</option>

             
            </select>
          </div>
          </>
      
        )}

    </div>
  )
}

export default TrafficServices;