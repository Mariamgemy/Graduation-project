import React, { useState, useEffect } from "react";
import "../Css/signUp.css";
import panaImage from "../components/images/pana.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginCard from "./LoginCard";
import { API_CONFIG } from "../api/config";
import { useModal } from "../components/ModalManager";
import PasswordInput from "../components/PasswordInput";
const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();
  // استقبال البيانات من المودال
  const { id, email, otpCode, isVerified, otpVerified } = location.state || {};

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    // البيانات المحققة مسبقاً
    nid: id || "",
    email: email || "",
    // البيانات الجديدة
    displayName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // التحقق من وجود البيانات المطلوبة
  useEffect(() => {
    if (!id || !email || !isVerified || !otpVerified) {
      // إذا لم تكن البيانات متوفرة، أعد التوجيه للصفحة الرئيسية
      navigate("/");
    }
  }, [id, email, isVerified, otpVerified, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear individual field error on change
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.displayName.trim().length < 2) {
      newErrors.displayName = "يرجى إدخال اسم صحيح";
    }

    if (formData.userName.trim().length < 3) {
      newErrors.userName = "يرجى إدخال اسم مستخدم صحيح (3 أحرف على الأقل)";
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = "يرجى إدخال عنوان صحيح";
    }

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^(\+20)?01[0-25]\d{8}$/;
      return phoneRegex.test(phoneNumber);
    };

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "يرجى إدخال رقم موبايل صحيح";
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
      const registerData = {
        registerData: {
          displayName: formData.displayName,
          email: formData.email,
          userName: formData.userName,
          password: formData.password,
          nid: formData.nid,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
        },
        otpCode: otpCode || "verified",
      };

      console.log("البيانات المرسلة:", registerData);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/auth/register-with-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل في إنشاء الحساب");
      }

      // حفظ تاريخ التسجيل في localStorage
      localStorage.setItem("memberSince", new Date().toISOString());

      setApiSuccess("تم إنشاء الحساب بنجاح! سيتم تحويلك للصفحة الرئيسية.");
      setTimeout(() => {
        navigate("/");
        setTimeout(() => openModal("login"), 500);
      }, 1000);
    } catch (error) {
      setApiError(error.message || "حدث خطأ أثناء إنشاء الحساب.");
      console.error("خطأ في التسجيل:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // إذا لم تكن البيانات متوفرة، اعرض رسالة تحميل
  if (!id || !email || !isVerified || !otpVerified) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">جاري التحقق من البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <img src={panaImage} alt="صورة" className="img-fluid w-75" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center mt-5">
          <div className="w-75">
            <h3 className="text-center mb-4 textP"> تسجيل الدخول</h3>

            {apiError && <div className="alert alert-danger">{apiError}</div>}
            {apiSuccess && (
              <div className="alert alert-success">{apiSuccess}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* الاسم المعروض */}
              <div className="mb-3">
                <label className="form-label">الاسم بالكامل</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.displayName ? "is-invalid" : ""
                  }`}
                  name="displayName"
                  autoComplete="name"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  disabled={isLoading}
                />
                {errors.displayName && (
                  <div className="text-danger">{errors.displayName}</div>
                )}
              </div>

              {/* اسم المستخدم */}
              <div className="mb-3">
                <label className="form-label">اسم المستخدم</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.userName ? "is-invalid" : ""
                  }`}
                  name="userName"
                  autoComplete="username"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="أدخل اسم المستخدم"
                  disabled={isLoading}
                />
                {errors.userName && (
                  <div className="text-danger">{errors.userName}</div>
                )}
              </div>

              {/* العنوان */}
              <div className="mb-3">
                <label className="form-label">العنوان</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="أدخل عنوانك"
                  disabled={isLoading}
                />
                {errors.address && (
                  <div className="text-danger">{errors.address}</div>
                )}
              </div>

              {/* رقم الهاتف */}
              <div className="mb-3">
                <label className="form-label">رقم الموبايل</label>
                <input
                  type="tel"
                  className={`form-control ${
                    errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  name="phoneNumber"
                  dir="rtl"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="أدخل رقم الموبايل"
                  disabled={isLoading}
                />
                {errors.phoneNumber && (
                  <div className="text-danger">{errors.phoneNumber}</div>
                )}
              </div>

              {/* كلمة المرور */}
              <div className="mb-3">
                <label className="form-label">كلمة المرور</label>
                <PasswordInput
                  // className={`${
                  //   errors.password ? "is-invalid" : ""
                  // }`}
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

              {/* تأكيد كلمة المرور */}
              <div className="mb-3">
                <label className="form-label">تأكيد كلمة المرور</label>
                <PasswordInput
                  // className={`form-control ${
                  //   errors.confirmPassword ? "is-invalid" : ""
                  // }`}
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
                className="btn nav-btn btn-outline-secondry p2-4 py-2 mb-2 mt-4 w-100"
                disabled={isLoading}
              >
                {isLoading ? "جاري التسجيل..." : "إكمال التسجيل"}
              </button>

              <p className="text-center mt-3">
                لديك حساب؟
                <Link
                  onClick={() => setShowModal(true)}
                  style={{ cursor: "pointer", color: "#3373a3" }}
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
