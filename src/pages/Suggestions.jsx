import Line from "../components/Line";
import Suggest from "../components/images/Suggest.png";
import CaptchaComponent from "../components/captcha";
import Footer from "../components/Footer";
import "../Css/Suggestions.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Suggestions = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    complaint: "",
    textComplaint: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    phone: "",
    complaint: "",
    textComplaint: "",
    captcha: "",
  });
  const [flag, setFlag] = useState(false);
  const captchaRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-25]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidEmail = (Email) => {
    const emailRegex = /^[\w]+@([\w]+\.)+[\w]+$/;
    return emailRegex.test(Email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.userName) {
      newErrors.userName = "هذا الحقل مطلوب";
    } else if (!isValidName(formData.userName)) {
      newErrors.userName = "الاسم غير صالح";
    }
    if (!formData.phone) {
      newErrors.phone = "هذا الحقل مطلوب";
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "الرقم غير صالح";
    }
    if (!formData.email) {
      newErrors.email = "هذا الحقل مطلوب";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "البريد الالكتروني غير صالح";
    }
    if (!formData.complaint) newErrors.complaint = "هذا الحقل مطلوب";
    if (!formData.textComplaint) newErrors.textComplaint = "هذا الحقل مطلوب";

    // التحقق من صحة الكابتشا
    const isCaptchaValid = captchaRef.current.validateCaptchaField();
    // if (!isCaptchaValid) {
    //   newErrors.captcha = "يرجى إدخال رمز التحقق بشكل صحيح";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFlag(false);
      return;
    }

    // إذا وصلنا هنا، فهذا يعني أن جميع البيانات صحيحة
    console.log("بيانات الشكوي:", formData);

    try {
      // يمكنك إضافة كود الاتصال بال API هنا
      // const response = await submitToAPI(formData);
      // console.log("استجابة submitToAPI:", response);

      // التوجيه للصفحة التالية فقط بعد نجاح التحقق
      navigate("/complaintDone");
    } catch (error) {
      console.error("خطأ أثناء الإرسال:", error.message);
    }
  };

  return (
    <>
      <div className="container-fluid mb-5 px-5">
        <h2 className=" text-color fw-bold mt-5 text-center mb-4">
          الشكاوي والمقترحات
        </h2>
        <Line />
        <div>
          <div className="row h-100 flex-row-reverse">
            <div className="col-md-5 d-none d-md-flex justify-content-center ">
              <img
                src={Suggest}
                alt="صورة الويب سايت"
                className="img-fluid w-100"
              />
            </div>

            <div className="col-md-7 d-flex justify-content-center">
              <div className="w-100 ">
                <form
                  className="d-flex flex-column mb-5"
                  onSubmit={handleSubmit}
                >
                  <label className="form-label" htmlFor="userName">
                    الاسم
                  </label>
                  <input
                    className={`form-control custom-input ${
                      errors.userName ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="userName"
                    autoComplete="name"
                    placeholder="الاسم"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  {errors.userName && (
                    <div className="text-danger">{errors.userName}</div>
                  )}
                  <label className="form-label" htmlFor="email">
                    البريد الإلكتروني
                  </label>
                  <input
                    className={`form-control custom-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                  <label className="form-label" htmlFor="phone">
                    رقم الموبايل
                  </label>
                  <input
                    className={`form-control custom-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="رقم الموبايل"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                  <label className="form-label" htmlFor="type">
                    نوع الشكوى
                  </label>
                  <select
                    className={`form-select custom-input ${
                      errors.complaint ? "is-invalid" : ""
                    }`}
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                  >
                    <option value="اختر"></option>
                    <option value="شكوى عامة "> شكوى عامة </option>
                    <option value="شكوى لخدمة "> شكوى لخدمة </option>
                    <option value="شكوى لطلب "> شكوى لطلب </option>
                  </select>
                  {errors.complaint && (
                    <div className="text-danger">{errors.complaint}</div>
                  )}
                  <label className="form-label">محتوى الشكوى </label>
                  <textarea
                    className={`form-control customW ${
                      errors.textComplaint ? "is-invalid" : ""
                    }`}
                    name="textComplaint"
                    rows="4"
                    value={formData.textComplaint}
                    onChange={handleChange}
                  ></textarea>
                  {errors.textComplaint && (
                    <div className="text-danger">{errors.textComplaint}</div>
                  )}
                  <div className="mt-3">
                    <CaptchaComponent ref={captchaRef} />
                    {errors.captcha && (
                      <div className="text-danger">{errors.captcha}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`btn nav-btn btn-outline-secondry px-4 py-2 fs-5 mb-2 `}
                  >
                    ارسال
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Suggestions;
