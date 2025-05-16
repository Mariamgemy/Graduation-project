import React, { useState } from "react";
import "../Css/signUp.css";
import panaImage from "../components/images/pana.svg";
import { Link, useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear individual field error on change
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "يرجى إدخال أسم صحيح";
    }

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^01[0-25]\d{8}$/;
      return phoneRegex.test(phoneNumber);
    };

    if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "يرجى إدخال رقم موبايل صحيح";
    }

    if (formData.password.length < 8) {
      newErrors.password = "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("YOUR_API_ENDPOINT/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل في إنشاء الحساب");
      }

      setApiSuccess("تم إنشاء الحساب بنجاح! سيتم تحويلك لصفحة تسجيل الدخول.");
      setTimeout(() => navigate("/login"), 2000); // تحويل بعد ثانيتين
    } catch (error) {
      setApiError(error.message || "حدث خطأ أثناء إنشاء الحساب.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <img src={panaImage} alt="صورة" className="img-fluid w-75" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h3 className="text-center mb-4 textP">إنشاء حساب</h3>

            {apiError && <div className="alert alert-danger">{apiError}</div>}
            {apiSuccess && (
              <div className="alert alert-success">{apiSuccess}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك"
                  disabled={isLoading}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">رقم الموبايل </label>
                <input
                  type="Number"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  name="phone"
                  autoComplete="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخل رقم الموبايل "
                  disabled={isLoading}
                />
                {errors.phone && (
                  <div className="text-danger">{errors.phone}</div>
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-100"
                disabled={isLoading}
              >
                {isLoading ? "جاري التسجيل..." : "تسجيل"}
              </button>

              <p className="text-center mt-3">
                لديك حساب؟
                <Link
                  onClick={() => setShowModal(true)}
                  style={{ cursor: "pointer" ,color:"#3373a3" }}
                >
                  تسجيل الدخول
                </Link>
                <LoginCard
                  show={showModal}
                  handleClose={() => setShowModal(false)}
                />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
