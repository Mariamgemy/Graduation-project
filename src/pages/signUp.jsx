import React, { useState } from "react";
import "../Css/signUp.css";
import panaImage from "../components/images/pana.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateName = (name) => {
    return name.length > 1;
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // التحقق من صحة البريد الإلكتروني
    if (!validateName(formData.name)) {
      newErrors.name = "يرجى إدخال أسم صحيح";
    }
    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    // التحقق من كلمة المرور
    if (!validatePassword(formData.password)) {
      newErrors.password = "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل";
    }

    // التحقق من تطابق كلمتي المرور
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFlag(false);
      return;
    }

    console.log("بيانات المستخدم:", formData);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* القسم الأيسر (الصورة) */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <img
            src={panaImage}
            alt="صورة الويب سايت"
            className="img-fluid w-75"
          />
        </div>

        {/* القسم الأيمن (نموذج التسجيل) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h3 className="text-center mb-4 textP">إنشاء حساب</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  placeholder="أدخل اسمك"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback" style={{ color: "red" }}>
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback" style={{ color: "red" }}>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">كلمة المرور</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback" style={{ color: "red" }}>
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback" style={{ color: "red" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-secondary w-100">
                تسجيل
              </button>
              <p className="text-center mt-3">
                لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
