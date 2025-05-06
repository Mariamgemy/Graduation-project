import "../Css/IdValidation.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import CustomModal from "./IdValidation";
import { useState, useEffect } from "react";
import PhoneInput from "../components/PhoneInput";
import PasswordInput from "../components/PasswordInput";
import { forwardRef, useImperativeHandle, useRef } from "react";

const LoginCard = forwardRef(({ show, handleClose }, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setPhoneNumber("");
    setPassword("");
    setErrors({});
    setApiError("");
    setIsLoading(false);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-25]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors = {};
    setApiError("");

    if (!phoneNumber) {
      newErrors.phoneNumber = "رقم الهاتف مطلوب";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "رقم الهاتف غير صحيح";
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
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("YOUR_API_ENDPOINT/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ أثناء تسجيل الدخول");
      }

      // Handle successful login
      // TODO: Store the token/user data as needed
      localStorage.setItem("token", data.token);

      // Close the modal and redirect or update UI as needed
      handleClose();
    } catch (error) {
      setApiError(error.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => ({
      phoneNumber,
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
          <Link className="text-color" onClick={() => setShowModal(true)}>
            إنشاء حساب.
          </Link>
          <CustomModal
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
        </p>

        {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-bold">الموبايل</label>
            <PhoneInput
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="ادخل رقم الهاتف"
              disabled={isLoading}
            />
            {errors.phoneNumber && (
              <div className="text-danger">{errors.phoneNumber}</div>
            )}
            <Link to="#">
              <p className="text-color">*هل نسيت رقم الموبايل؟</p>
            </Link>
          </div>

          <div className="mb-3">
            <label className="fw-bold">كلمة المرور</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ادخل كلمة السر"
              disabled={isLoading}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <Link to="#">
              <p className="text-color">*هل نسيت كلمة السر؟</p>
            </Link>
          </div>

          <button
            type="submit"
            className="w-100 btn btn-outline-secondry border-0"
            disabled={isLoading}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default LoginCard;
