import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import CaptchaComponent from "../components/captcha";
import EmailInput from "../components/EmailInput";
import { API_CONFIG } from "../api/config";
import "../Css/IdValidation.css";
import { useModal } from "../components/ModalManager";
import PasswordInput from "../components/PasswordInput";
const ForgotPassword = ({ show, handleClose }, ref) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(0); // للعد التنازلي
  const [canResend, setCanResend] = useState(false); // إمكانية إعادة الإرسال
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const captchaRef = useRef();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    if (!show) {
      resetForm();
      setStep(1);
      clearCountdown();
    }
  }, [show]);

  // تشغيل العد التنازلي
  useEffect(() => {
    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [countdown]);

  const clearCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    setCountdown(0);
    setCanResend(false);
  };

  const startCountdown = () => {
    setCountdown(60); // دقيقة واحدة
    setCanResend(false);
  };

  const resetForm = () => {
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setErrors({});
    setApiError("");
    setSuccessMessage("");
    setIsLoading(false);
    clearCountdown();
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    setApiError("");
    setSuccessMessage("");

    if (step === 1) {
      if (!email) newErrors.email = "البريد الإلكتروني مطلوب";
      else if (!isValidEmail(email))
        newErrors.email = "البريد الإلكتروني غير صحيح";
    } else if (step === 2) {
      if (otp.some((digit) => !digit))
        newErrors.otp = "يرجى إدخال الرمز كاملاً";
    } else if (step === 3) {
      if (!newPassword) newErrors.newPassword = "كلمة المرور الجديدة مطلوبة";
      else if (newPassword.length < 8)
        newErrors.newPassword = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";

      if (!confirmPassword)
        newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
      else if (newPassword !== confirmPassword)
        newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input (من الشمال لليمين)
      if (value && index < 5) {
        const nextInput = document.querySelector(
          `input[name=otp-${index + 1}]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };
  // تحديث handleKeyDown للاتجاه من الشمال لليمين
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  // دالة إعادة إرسال OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/auth/send-password-reset-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في إعادة إرسال رمز التحقق");
      }

      // إعادة تعيين OTP وبدء العد التنازلي
      setOtp(["", "", "", "", "", ""]);
      startCountdown();
      setApiError(""); // مسح أي خطأ سابق

      // يمكنك إضافة رسالة نجاح هنا إذا أردت
      // setApiError("تم إعادة إرسال رمز التحقق بنجاح");
    } catch (error) {
      setApiError(error.message || "حدث خطأ أثناء إعادة إرسال رمز التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      if (step === 1) {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/auth/send-password-reset-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "حدث خطأ أثناء إرسال رمز التحقق"
          );
        }

        setSuccessMessage("تم إرسال رمز التحقق إلى بريدك الإلكتروني");
        setStep(2);
        startCountdown();
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        // Reset password
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/auth/reset-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              otpCode: otp.join(""),
              newPassword,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "فشل في تغيير كلمة المرور");
        }

        setSuccessMessage("تم تغيير كلمة المرور بنجاح");
        setTimeout(() => {
          handleClose();
          openModal('login')
        }, 2000);
      }
    } catch (error) {
      setApiError(error.message || "حدث خطأ أثناء العملية");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="mb-3">إدخال البريد الإلكتروني</h3>
            <div className="mb-3">
              <label className="fw-bold form-label">البريد الإلكتروني</label>
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ادخل البريد الالكتروني"
                disabled={isLoading}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mt-3">
              <CaptchaComponent ref={captchaRef} />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="mb-3">التحقق من البريد الإلكتروني</h3>
            <p className="text-center mb-4">
              تم إرسال رمز التحقق إلى بريدك الإلكتروني
            </p>
            <div className="mb-4">
              <div
                className="d-flex justify-content-center gap-2"
                style={{ direction: "ltr" }}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`otp-${index}`}
                    className="form-control text-center"
                    style={{ width: "50px", height: "50px" }}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    disabled={isLoading}
                  />
                ))}
              </div>
              {errors.otp && (
                <div className="text-danger text-center mt-2">{errors.otp}</div>
              )}
            </div>

            {/* قسم العد التنازلي وإعادة الإرسال */}
            <div className="text-center mb-3">
              {countdown > 0 ? (
                <p className="text-muted">
                  يمكنك طلب رمز جديد بعد {countdown} ثانية
                </p>
              ) : (
                <button
                  type="button"
                  className="btn btn-link text-color w-100"
                  onClick={handleResendOtp}
                  disabled={isLoading || !canResend}
                >
                  إعادة إرسال الرمز
                </button>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="mb-3">تغيير كلمة المرور</h3>
            <div className="mb-3">
              <label className="fw-bold form-label">كلمة المرور الجديدة</label>
              <PasswordInput
          
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="أدخل كلمة المرور الجديدة"
                disabled={isLoading}
              />
              {errors.newPassword && (
                <div className="text-danger">{errors.newPassword}</div>
              )}
            </div>
      
            <div className="mb-3">
              <label className="fw-bold form-label">تأكيد كلمة المرور</label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="أعد إدخال كلمة المرور الجديدة"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => ({ email, otpCode: otp.join("") }),
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
       

        {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderContent()}

          <button
            type="submit"
            className="w-100 btn btn-outline-secondry border-0 mt-2 mb-3"
            disabled={isLoading}
          >
            {isLoading
              ? "جاري التحقق..."
              : step === 2
              ? " تأكيد"
              : step === 1
              ? "إرسال رمز التحقق"
              : "تأكيد"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
