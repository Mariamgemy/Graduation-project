import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Civil.css";

import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";
import UtilityNavigationButtons from "../UtilityNavigationButtons";

const HousingServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;

  const [activeStep, setActiveStep] = useState(1);


  const [quadriliteralName, setQuadriliteralName] = useState("");
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [utilityType, setUtilityType] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [idPhoto, setIdPhoto] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState("");

  const [certificateType, setCertificateType] = useState("");
  const [facilityType, setFacilityType] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [elctricBill, setElctricBill] = useState("");

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-25]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidEmail = (Email) => {
    const emailRegex = /^[\w]+@([\w]+\.)+[\w]+$/;
    return emailRegex.test(Email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return nameRegex.test(name);
  };
  const isValidMotherName = (motherName) => {
    const nameRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{2,}$/;
    return nameRegex.test(motherName);
  };
  const isValidId = (id) => {
    const idRegex = /^\d{14}$/;
    return idRegex.test(id);
  };


  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const newErrors = {};

      if (activeStep === 1) {
        if (card.title === "شهادة كفاءة الطاقة") {
          if (!idPhoto) newErrors.idPhoto = "هذا الحقل مطلوب";
          if (!certificateType) newErrors.certificateType = "هذا الحقل مطلوب";
          if (!facilityType) newErrors.facilityType = "هذا الحقل مطلوب";
          if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
          if (!phone) newErrors.phone = "هذا الحقل مطلوب";
          else if (!isValidPhoneNumber(phone)) {
            newErrors.phone = "رقم الهاتف غير صحيح";
          }
          if (!elctricBill) newErrors.elctricBill = "هذا الحقل مطلوب";
          if (!quadriliteralName)
            newErrors.quadriliteralName = "هذا الحقل مطلوب";
          else if (!isValidMotherName(quadriliteralName)) {
            newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }
          if (!id) {
            newErrors.id = "هذا الحقل مطلوب";
          } else if (!isValidId(id)) {
            newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
          }
        }
        else if (card.title === "تقديم شكوي مرافق") {
          if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
          else if (!isValidMotherName(fullName)) {
            newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }
          if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
          if (!complaintType) newErrors.complaintType = "هذا الحقل مطلوب";
          if (!complaintDescription) newErrors.complaintDescription = "هذا الحقل مطلوب";
          if (!governorate) newErrors.governorate = "هذا الحقل مطلوب";
          if (!utilityType) newErrors.utilityType = "هذا الحقل مطلوب";
          if (!email) newErrors.email = "هذا الحقل مطلوب";
          else if (!isValidEmail(email)) {
            newErrors.email = "البريد الإلكتروني غير صالح";
          }
          if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
          if (!phone) newErrors.phone = "هذا الحقل مطلوب";
          else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
        

        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({
      quadriliteralName,
      id,
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

    }),
  }));


  const handleNext = () => {
    const newErrors = {};

    if (activeStep === 1) {
      if (card.title === "شهادة كفاءة الطاقة") {
        if (!quadriliteralName) newErrors.quadriliteralName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(quadriliteralName)) {
          newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
        if (!phone) newErrors.phone = "هذا الحقل مطلوب";
        else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
        if (!facilityType) newErrors.facilityType = "هذا الحقل مطلوب";
        if (!certificateType) newErrors.certificateType = "هذا الحقل مطلوب";
        if (!elctricBill) newErrors.elctricBill = "هذا الحقل مطلوب";
        if (!idPhoto) newErrors.idPhoto = "هذا الحقل مطلوب";
      }
      else if (card.title === "تقديم شكوى مرافق") {
        if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(fullName)) {
          newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
        if (!complaintType) newErrors.complaintType = "هذا الحقل مطلوب";
        if (!complaintDescription) newErrors.complaintDescription = "هذا الحقل مطلوب";
        if (!governorate) newErrors.governorate = "هذا الحقل مطلوب";
        if (!utilityType) newErrors.utilityType = "هذا الحقل مطلوب";
        if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
        if (!email) newErrors.email = "هذا الحقل مطلوب";
        else if (!isValidEmail(email)) {
          newErrors.email = "البريد الإلكتروني غير صالح";
        }
        if (!phone) newErrors.phone = "هذا الحقل مطلوب";
        else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
      

      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (activeStep === 1) {
        // Check if all required fields for step 1 are filled
        let step1Completed = true;
        if(card.title === "شهادة كفاءة الطاقة" || card.title === "تقديم شكوى مرافق") {
          if(    !quadriliteralName || !id || !detailedAddress || !phone || !facilityType || !certificateType || !elctricBill || !idPhoto ||!email || !subscriberNumber || !fullName || !complaintType || !governorate || !complaintDescription || !utilityType)
          {
            step1Completed = false;
          }
        }
        if (step1Completed && activeStep < 3) {
          setActiveStep(activeStep + 1);
        }
      } else if (activeStep < 3) {
        setActiveStep(activeStep + 1);
      }
    
  };
}


  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            {card.title === "شهادة كفاءة الطاقة" && (
        <>
          <div className="mb-3"></div>

          <div className="mt-3 p-3">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label"> الاسم رباعي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.quadriliteralName ? "is-invalid" : ""
                    }`}
                    value={quadriliteralName}
                    onChange={(e) => setQuadriliteralName(e.target.value)}
                  />
                  {errors.quadriliteralName && (
                    <div className="text-danger">
                      {errors.quadriliteralName}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">الرقم القومي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.id ? "is-invalid" : ""
                    }`}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">العنوان بالتفصيل</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.detailedAddress ? "is-invalid" : ""
                    }`}
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                  />
                  {errors.detailedAddress && (
                    <div className="text-danger">{errors.detailedAddress}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الهاتف </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">نوع المنشأة </label>
                  <select
                    type="text"
                    className={`form-select custom-select-style custom-input ${
                      errors.facilityType ? "is-invalid" : ""
                    }`}
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="Residential">سكني</option>
                    <option value="Commercial">تجاري</option>
                    <option value="Industrial">صناعي</option>
                  </select>
                  {errors.facilityType && (
                    <div className="text-danger">{errors.facilityType}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">الغرض من استخراج الشهادة</label>
                  <select
                    type="text"
                    className={`form-select custom-select-style custom-input ${
                      errors.certificateType ? "is-invalid" : ""
                    }`}
                    value={certificateType}
                    onChange={(e) => setCertificateType(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="Residential">بيع عقار</option>
                    <option value="Commercial">تأجير</option>
                    <option value="Industrial">تسجيل رسمي</option>
                  </select>
                  {errors.certificateType && (
                    <div className="text-danger">{errors.certificateType}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">صورة اخر فاتورة كهرباء</label>
                  <div className="file-input-container">
                    <input
                      type="file"
                      id="elctricBill"
                      accept="image/*"
                      onChange={(e) => {
                        setElctricBill(e.target.files[0]);
                      }}
                    />
                    <label
                      htmlFor="elctricBill"
                      className={` file-input-label ${
                        errors.elctricBill ? "is-invalid" : ""
                      }`}
                    >
                      <span className="file-name">
                        {elctricBill ? elctricBill.name : "لم يتم اختيار ملف"}
                      </span>
                      <span className="browse-button">اختر ملف</span>
                    </label>
                  </div>
                  {errors.elctricBill && (
                    <div className="text-danger">{errors.elctricBill}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">صورة بطاقة الرقم القومي</label>
                  <div className="file-input-container">
                    <input
                      type="file"
                      id="idPhoto"
                      accept="image/*"
                      onChange={(e) => {
                        setIdPhoto(e.target.files[0]);
                      }}
                    />
                    <label
                      htmlFor="idPhoto"
                      className={`file-input-label ${
                        errors.idPhoto ? "is-invalid" : ""
                      }`}
                    >
                      <span className="file-name">
                        {idPhoto ? idPhoto.name : "لم يتم اختيار ملف"}
                      </span>
                      <span className="browse-button">اختر ملف</span>
                    </label>
                  </div>
                  {errors.idPhoto && (
                    <div className="text-danger">{errors.idPhoto}</div>
                  )}
                </div>
              </div>
            </div>

            {/* New Requirements Section */}
            <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
              <h4 className="text-color mb-3 fw-bold">
                شروط إصدار شهادة كفاءة الطاقة
              </h4>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>يجب أن يكون مقدم الطلب هو صاحب العداد .</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>يجب أن تكون بيانات العداد صحيحة ومحدثة.</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب تسديد أي مستحقات مالية متأخرة قبل تقديم الطلب.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-start">
                      <span className="me-2 text-warning fs-4">💡</span>
                      <span>
                        العقار يجب أن يكون مبنيًّا بشكل قانوني ومسجل في الجهات
                        الرسمية.
                      </span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        لا يتم إصدار الشهادة إلا بعد فحص استهلاك الطاقة (قد
                        يتطلب زيارة ميدانية أحيانًا حسب القوانين).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
             {card.title === "تقديم شكوى مرافق" && (
        <>
          <div className="mb-3">
            <label className="form-label">نوع المرفق </label>
            <select
              className={`form-select custom-select-style custom-input ${
                errors.utilityType ? "is-invalid" : ""
              }`}
              value={utilityType}
              onChange={(e) => setUtilityType(e.target.value)}
            >
              <option value=""> </option>
              <option value="كهرباء">كهرباء</option>
              <option value="مياه">مياه</option>
              <option value="غاز">غاز</option>
            </select>
            {errors.utilityType && (
              <div className="text-danger">{errors.utilityType}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">المحافظة</label>
            <select
              className={`form-select custom-select-style custom-input ${
                errors.governorate ? "is-invalid" : ""
              }`}
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
            >
              <option value=""> </option>
              <option value="القاهرة">القاهرة</option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="الجيزة">الجيزة</option>
              <option value="الدقهلية">الدقهلية</option>
              <option value="الشرقية">الشرقية</option>
              <option value="القليوبية">القليوبية</option>
              <option value="المنوفية">المنوفية</option>
              <option value="الغربية">الغربية</option>
              <option value="المنيا">المنيا</option>
              <option value="أسيوط">أسيوط</option>
              <option value="سوهاج">سوهاج</option>
              <option value="قنا">قنا</option>
              <option value="أسوان">أسوان</option>
              <option value="الأقصر">الأقصر</option>
              <option value="البحر الأحمر">البحر الأحمر</option>
              <option value="شمال سيناء">شمال سيناء</option>
              <option value="جنوب سيناء">جنوب سيناء</option>
              <option value="الفيوم">الفيوم</option>
              <option value="بني سويف">بني سويف</option>
              <option value="سوهاج">سوهاج</option>
              <option value="الوادى الجديد">الوادى الجديد</option>
              <option value="كفر الشيخ">كفر الشيخ</option>
              <option value="دمياط">دمياط</option>
              <option value="بورسعيد">بورسعيد</option>
              <option value="السويس">السويس</option>
              <option value="الإسماعيلية">الإسماعيلية</option>
              <option value="الجيزة">الجيزة</option>
              <option value="شمال سيناء">شمال سيناء</option>
              <option value="جنوب سيناء">جنوب سيناء</option>
              <option value="الشرقية">الشرقية</option>
              <option value="البحيرة">البحيرة</option>
              <option value="المنوفية">المنوفية</option>
            </select>
            {errors.governorate && (
              <div className="text-danger">{errors.governorate}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">العنوان التفصيلي </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.detailedAddress ? "is-invalid" : ""
              }`}
              value={detailedAddress}
              onChange={(e) => setDetailedAddress(e.target.value)}
            />
            {errors.detailedAddress && (
              <div className="text-danger">{errors.detailedAddress}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نوع الشكوى </label>
            <select
              className={`form-select custom-select-style custom-input ${
                errors.complaintType ? "is-invalid" : ""
              }`}
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
            >
              <option value=""> </option>
              <option value="cut">انقطاع الخدمة</option>
              <option value="highBill">فاتورة مرتفعة</option>
              <option value="leak">تسريب</option>
              <option value="badService">خدمة سيئة</option>
              <option value="other">أخرى</option>
            </select>
            {errors.complaintType && (
              <div className="text-danger">{errors.complaintType}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">وصف الشكوى </label>
            <textarea
              className={`form-control customW ${
                errors.complaintDescription ? "is-invalid" : ""
              }`}
              rows="4"
              value={complaintDescription}
              onChange={(e) => setComplaintDescription(e.target.value)}
            ></textarea>
            {errors.complaintDescription && (
              <div className="text-danger">{errors.complaintDescription}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم المشترك </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.subscriberNumber ? "is-invalid" : ""
              }`}
              value={subscriberNumber}
              onChange={(e) => setSubscriberNumber(e.target.value)}
            />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">الاسم رباعي </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.fullName ? "is-invalid" : ""
              }`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم الهاتف </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.phone ? "is-invalid" : ""
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">البريد الإلكتروني </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.email ? "is-invalid" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
        </>
      )}
      { card.title === "التقديم على عداد كهرباء / مياه" &&(
        <>
         <div className="mb-3">
                  <label className="form-label"> الاسم رباعي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.quadriliteralName ? "is-invalid" : ""
                    }`}
                    value={quadriliteralName}
                    onChange={(e) => setQuadriliteralName(e.target.value)}
                  />
                  {errors.quadriliteralName && (
                    <div className="text-danger">
                      {errors.quadriliteralName}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">الرقم القومي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.id ? "is-invalid" : ""
                    }`}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الهاتف </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">البريد الإلكتروني </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
        </>
      )}
          </div>
        );
      case 2:
        return (
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">بيانات الاستلام</h3>
            {/* Add delivery information form fields here */}
          </div>
        );
      case 3:
        return (
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">نتيجة الطلب</h3>
            {/* Add request result information here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-3">
        <Steppar
          active={activeStep}
          setActive={setActiveStep}
     
          formData={{
            card,
            idPhoto,
            certificateType,
            facilityType,
            detailedAddress,
            phone,
            elctricBill,
            quadriliteralName,
            id,
            subscriberNumber,
            fullName,
            email,
            phone,
            complaintType,
            governorate,
            complaintDescription,
            utilityType,
          }}
        />
        <UtilityNavigationButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}

          formData={{
            card,
            idPhoto,
            certificateType,
            facilityType,
            detailedAddress,
            phone,
            elctricBill,
            quadriliteralName,
            id,
            subscriberNumber,
            fullName,
            email,
            phone,
            complaintType,
            governorate,
            complaintDescription,
            utilityType,
          }}
        />
      </div>

      {renderStepContent()}

      {activeStep < 3 && (
        <div className="text-start">
          <button
            type="button"
            className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
            onClick={handleNext}
          >
            التالي &nbsp; <FaArrowLeftLong size={20} />
          </button>
        </div>
      )}
    </>
  );
});

export default HousingServices;
