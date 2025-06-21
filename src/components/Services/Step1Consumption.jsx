import "./UtilityServices.css"
import { Form } from "react-bootstrap"
import Line from "../Line"
function Step1({ formData, errors, handleChange }) {
    return(
        <>

 {/* Bill Information Section */}
 <div className="form-section-custom mb-5 p-4 border rounded-3">
   <h5 className=" mb-4 fw-bold text-center text-clor">
     معلومات الفاتورة الأساسية
   </h5>
   <Line/>
   <div className="row">
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>قيمة الفاتورة (ريال)</Form.Label>
         <Form.Control
           type="number"
           name="BillAmount"
           value={formData.BillAmount}
           onChange={handleChange}
           className={`custom-input ${
             errors.BillAmount ? "is-invalid" : ""
           }`}
           placeholder="أدخل قيمة الفاتورة"
         />
         {errors.BillAmount && (
           <Form.Control.Feedback type="invalid">
             {errors.BillAmount}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>الاستهلاك (كيلو وات/ساعة)</Form.Label>
         <Form.Control
           type="number"
           name="Consumption"
           value={formData.Consumption}
           onChange={handleChange}
           className={`custom-input ${
             errors.Consumption ? "is-invalid" : ""
           }`}
           placeholder="أدخل قيمة الاستهلاك"
         />
         {errors.Consumption && (
           <Form.Control.Feedback type="invalid">
             {errors.Consumption}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
   </div>

   <div className="row">
     <div className="col-md-4 mb-3">
       <Form.Group>
         <Form.Label>شهر الفاتورة</Form.Label>
         <Form.Select
           name="BillMonth"
           value={formData.BillMonth}
           onChange={handleChange}
           className={`custom-select-style custom-input ${
             errors.BillMonth ? "is-invalid" : ""
           }`}
         >
           <option value="">اختر الشهر</option>
           {Array.from({ length: 12 }, (_, i) => (
             <option key={i + 1} value={i + 1}>
               {i + 1}
             </option>
           ))}
         </Form.Select>
         {errors.BillMonth && (
           <Form.Control.Feedback type="invalid">
             {errors.BillMonth}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
     <div className="col-md-4 mb-3">
       <Form.Group>
         <Form.Label>سنة الفاتورة</Form.Label>
         <Form.Select
           name="BillYear"
           value={formData.BillYear}
           onChange={handleChange}
           className={`custom-select-style custom-input ${
             errors.BillYear ? "is-invalid" : ""
           }`}
         >
           <option value="">اختر السنة</option>
           {Array.from({ length: 5 }, (_, i) => (
             <option key={i} value={new Date().getFullYear() - i}>
               {new Date().getFullYear() - i}
             </option>
           ))}
         </Form.Select>
         {errors.BillYear && (
           <Form.Control.Feedback type="invalid">
             {errors.BillYear}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
     <div className="col-md-4 mb-3">
       <Form.Group>
         <Form.Label>عدد أيام دورة الفاتورة</Form.Label>
         <Form.Control
           type="number"
           name="DaysInBillingCycle"
           value={formData.DaysInBillingCycle}
           onChange={handleChange}
           className={`custom-input ${
             errors.DaysInBillingCycle ? "is-invalid" : ""
           }`}
           placeholder="عدد الأيام"
         />
         {errors.DaysInBillingCycle && (
           <Form.Control.Feedback type="invalid">
             {errors.DaysInBillingCycle}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
   </div>

   <div className="row">
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>نمط استخدام الأجهزة</Form.Label>
         <Form.Select
           name="ApplianceUsage_Encoded"
           value={formData.ApplianceUsage_Encoded}
           onChange={handleChange}
           className={`custom-select-style custom-input ${
             errors.ApplianceUsage_Encoded ? "is-invalid" : ""
           }`}
         >
           <option value="">اختر نمط الاستخدام</option>
           <option value="1">استخدام منخفض جدًا</option>
           <option value="2">استخدام منخفض </option>
  <option value="3">استخدام معتدل</option>
  <option value="4">استخدام مرتفع</option>
  <option value="5">استخدام مرتفع جدًا</option>
         </Form.Select>
         {errors.ApplianceUsage_Encoded && (
           <Form.Control.Feedback type="invalid">
             {errors.ApplianceUsage_Encoded}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>نوع المنزل</Form.Label>
         <Form.Select
           name="HomeType_Encoded"
           value={formData.HomeType_Encoded}
           onChange={handleChange}
           className={`custom-select-style custom-input ${
             errors.HomeType_Encoded ? "is-invalid" : ""
           }`}
         >
           <option value="">اختر نوع المنزل</option>
           <option value="Villa">فيلا</option>
           <option value="Apartment">شقة</option>
           <option value="Duplex">دوبلكس</option>
           <option value="House">منزل</option>
         </Form.Select>
         {errors.HomeType_Encoded && (
           <Form.Control.Feedback type="invalid">
             {errors.HomeType_Encoded}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
   </div>
 </div>

 {/* Air Conditioning Information Section */}
 <div className="form-section-custom mb-5 p-4 border rounded-3">
   <h5 className=" mb-4 text-center text-clor fw-bold">
     معلومات التكييف
   </h5>
   <Line/>
   <div className="row">
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>عدد أجهزة التكييف</Form.Label>
         <Form.Control
           type="number"
           name="NumberOfAirConditioners"
           value={formData.NumberOfAirConditioners}
           onChange={handleChange}
           className={`custom-input ${
             errors.NumberOfAirConditioners ? "is-invalid" : ""
           }`}
           placeholder="عدد أجهزة التكييف"
         />
         {errors.NumberOfAirConditioners && (
           <Form.Control.Feedback type="invalid">
             {errors.NumberOfAirConditioners}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>ساعات تشغيل التكييف يوميًا</Form.Label>
         <Form.Control
           type="number"
           name="AirConditionerUsageHours"
           value={formData.AirConditionerUsageHours}
           onChange={handleChange}
           className={`custom-input ${
             errors.AirConditionerUsageHours ? "is-invalid" : ""
           }`}
           placeholder="ساعات التشغيل"
         />
         {errors.AirConditionerUsageHours && (
           <Form.Control.Feedback type="invalid">
             {errors.AirConditionerUsageHours}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
   </div>
   <div className="row">
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>نوع التكييف</Form.Label>
         <Form.Select
           name="AirConditionerType"
           value={formData.AirConditionerType}
           onChange={handleChange}
           className={`custom-select-style custom-input ${
             errors.AirConditionerType ? "is-invalid" : ""
           }`}
         >
           <option value="">اختر النوع</option>
           <option value="Central">مركزي</option>
           <option value="Split">سبليت</option>
           <option value="Window">نافذة</option>
         </Form.Select>
         {errors.AirConditionerType && (
           <Form.Control.Feedback type="invalid">
             {errors.AirConditionerType}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
     <div className="col-md-6 mb-3">
       <Form.Group>
         <Form.Label>حجم الأسرة</Form.Label>
         <Form.Control
           type="number"
           name="HouseholdSize"
           value={formData.HouseholdSize}
           onChange={handleChange}
           className={`custom-input ${
             errors.HouseholdSize ? "is-invalid" : ""
           }`}
           placeholder="عدد الأفراد"
         />
         {errors.HouseholdSize && (
           <Form.Control.Feedback type="invalid">
             {errors.HouseholdSize}
           </Form.Control.Feedback>
         )}
       </Form.Group>
     </div>
   </div>
 </div>
 
</>
    )
}
 
export default Step1