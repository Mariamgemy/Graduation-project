import "../Css/IdValidation.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { API_CONFIG } from "../api/config";
import { useAuth } from "../context/AuthContext.jsx";
import { useModal } from "../components/ModalManager"; 




const LoginCard = forwardRef(({ show, handleClose }, ref) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();
  const { switchModal } = useModal(); 

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    setApiError("");
    setIsLoading(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    setApiError("");

    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!isValidEmail(email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.log("فشل التحقق من صحة النموذج");
      return;
    }
  
    setIsLoading(true);
    setApiError("");
  
    try {
      console.log(
        "الرابط النهائي للـ API هو:",
        `${API_CONFIG.BASE_URL}/Auth/login`
      );
  
      const response = await fetch(`${API_CONFIG.BASE_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  // تأكد إن API_CONFIG.BASE_URL صحيح
console.log(API_CONFIG); // شوف إيه القيمة بالضبط
      console.log("تم استلام الرد من API:", response.status);
  
      // التحقق من حالة الاستجابة قبل محاولة تحويلها لـ JSON
      if (!response.ok) {
        let errorMessage = "حدث خطأ أثناء تسجيل الدخول";
        
        // محاولة قراءة رسالة الخطأ إذا كانت موجودة
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // إذا فشل تحويل JSON، استخدم رسالة خطأ حسب الـ status code
          if (response.status === 404) {
            errorMessage = "خدمة تسجيل الدخول غير متاحة حالياً";
          } else if (response.status === 401) {
            errorMessage = "البريد الإلكتروني أو كلمة المرور خاطئة";
          } else if (response.status >= 500) {
            errorMessage = "خطأ في السيرفر، يرجى المحاولة لاحقاً";
          }
        }
        
        throw new Error(errorMessage);
      }
  
      // تحويل الاستجابة لـ JSON فقط إذا كانت ناجحة
      const data = await response.json();
      // console.log("بيانات الرد:", data);

  
      // Handle successful login
      console.log("تم تسجيل الدخول بنجاح، جاري حفظ البيانات...");
      localStorage.setItem("token", data.data.token);
      login({ email, name: data.data.displayName, token: data.data.token });
      console.log("تم حفظ بيانات المستخدم في localStorage و context");
      // console.log("token", data.data.displayName);
      // console.log("token", success);
  
      handleClose();
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
      setApiError(error.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => ({
      email,
      password,
    }),
  }));

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="blur-background-modal"
      backdropClassName="custom-backdrop"
    >
      <Modal.Body className="p-4 rounded-4">
        <h3 className="mb-3 text-center text-color">سجل دخولك</h3>
        <p className="text-center">
          ليس لديك حساب؟
          <Link
            className="text-color ms-1"
            style={{ cursor: 'pointer' }}
            onClick={() => switchModal('register')}
          >
            إنشاء حساب.
          </Link>
        </p>

        {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-bold form-label">البريد الإلكتروني</label>

            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ادخل البريد الالكتروني"
              disabled={isLoading}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="fw-bold form-label">كلمة المرور</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ادخل كلمة السر"
              disabled={isLoading}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <p
              className="text-color mt-2"
              style={{ cursor: "pointer" }}
              onClick={() => switchModal('forgotPassword')}
            >
              *هل نسيت كلمة السر؟
            </p>
          </div>

          <button
            type="submit"
            className="w-100 btn btn-outline-secondry border-0 mt-2 mb-3"
            disabled={isLoading}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default LoginCard;