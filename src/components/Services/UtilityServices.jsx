import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CaptchaComponent from "../captcha";
import { useRef } from "react";

const UtilityServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;

  const [activeStep, setActiveStep] = useState(1);
  const [company, setCompany] = useState("");
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const captchaRef = useRef();



  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const isCaptchaValid = captchaRef.current?.validateCaptchaField();
      const newErrors = {};

      if (card.title === "سداد فاتورة الكهرباء") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      }

      if (card.title === "سداد فاتورة المياه") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!meterNumber) newErrors.meterNumber = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      }

    

      if (card.title === "سداد فاتورة الغاز") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      }

      

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({
      company,
      subscriberNumber,
      meterNumber,
    }),
  }));

  return (
    <>
      {card.title === "سداد فاتورة الكهرباء" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة </label>
            <select
              className={`form-select custom-select-style custom-input ${
                errors.company ? "is-invalid" : ""
              }`}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value=""> </option>
              <option value="كهرباء شمال القاهرة">كهرباء شمال القاهرة</option>
              <option value="كهرباء جنوب القاهرة">كهرباء جنوب القاهرة</option>
              <option value="كهرباء جنوب الدلتا">كهرباء جنوب الدلتا</option>
              <option value="كهرباء القناة">كهرباء القناة</option>
              <option value="كهرباء مصر الوسطي">كهرباء مصر الوسطي</option>
              <option value="كهرباء مصر العليا">كهرباء مصر العليا</option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم السداد الالكتروني </label>
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
        </>
      )}

      {card.title === "سداد فاتورة المياه" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة </label>
            <select
              className={`form-select custom-select-style custom-input ${
                errors.company ? "is-invalid" : ""
              }`}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value=""> </option>
              <option value="القاهرة الكبرى والجيزة والقليوبية">
                القاهرة الكبرى والجيزة والقليوبية
              </option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="الدلتا">الدلتا</option>
              <option value="الصعيد">الصعيد</option>
              <option value="القناة وسيناء">القناة وسيناء</option>
              <option value="المناطق الحدودية والوادي الجديد">
                المناطق الحدودية والوادي الجديد
              </option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم العداد </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.meterNumber ? "is-invalid" : ""
              }`}
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
            />
            {errors.meterNumber && (
              <div className="text-danger">{errors.meterNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم المشترك </label>
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
        </>
      )}

    

      {card.title === "سداد فاتورة الغاز" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة </label>
            <select
              className={`form-select custom-select-style custom-input ${
                errors.company ? "is-invalid" : ""
              }`}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value=""> </option>
              <option value="1">بتروتريد</option>
              <option value="2">نات جاس</option>
              <option value="3">شركة طاقة للغاز</option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم المشترك </label>
            <input
              type="text"
              className={`form-control custom-input ${
                errors.subscriberNumber ? "is-invalid" : ""
              }`}
              placeholder="ادخل الارقام من المحافظة حتى الفرعي"
              value={subscriberNumber}
              onChange={(e) => setSubscriberNumber(e.target.value)}
            />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )}
          </div>
        </>
      )}
      <div className="mt-3">
        <CaptchaComponent ref={captchaRef} />
        {errors.captcha && <div className="text-danger">{errors.captcha}</div>}
      </div>

      <div className="text-start">
        <button
          type="submit"
          className={`btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2 ${
            formSubmitted ? "btn-success" : "btn-outline-secondry"
          }`}
        >
          {formSubmitted ? "تم الإرسال بنجاح" : "التالي"}
        </button>

        {formSubmitted && (
          <button
            type="submit"
            className="btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2"
          >
            التالي
          </button>
        )}
      </div>
    </>
  );
});

export default UtilityServices;
