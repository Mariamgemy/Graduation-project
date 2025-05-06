

import "../Css/IdValidation.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CaptchaComponent from "../components/captcha";
import factory from "../components/images/1505410_0.png"

const CustomModal
 = forwardRef(({ show, handleClose }, ref) => {
  const [id, setId] = useState("");
  const [factoryNumber, setFactoryNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const captchaRef = useRef();

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setId("");
    setFactoryNumber("");
    setErrors({});
    setApiError("");
    setIsLoading(false);
  };

  const isValidId = (id) => {
    const idRegex = /^\d{14}$/;
    return idRegex.test(id);
  };

  const validateForm = () => {
    const isCaptchaValid = captchaRef.current?.validateCaptchaField();
    const newErrors = {};
    setApiError("");

    if (!id) {
      newErrors.id = "الرقم القومي مطلوب";
    } else if (!isValidId(id)) {
      newErrors.id = "الرقم القومي يجب ان يكون 14 رقم ";
    }

    if (!factoryNumber) {
      newErrors.factoryNumber = "هذا الحقل مطلوب ";
    } else if (factoryNumber.length < 6) {
      newErrors.factoryNumber = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
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
       id,
       factoryNumber
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ أثناء التحقق ");
      }

      // Handle successful login
      // TODO: Store the token/user data as needed
      localStorage.setItem("token", data.token);

      // Close the modal and redirect or update UI as needed
      handleClose();
    } catch (error) {
      setApiError(error.message || "حدث خطأ أثناء التحقق ");
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => ({
id,
factoryNumber,
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
   <h3 className="mb-3">التحقق من الرقم القومي</h3>
   {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}
   <form onSubmit={handleSubmit}>
   <div className="mb-3">
            <label className="fw-bold">الرقم القومي</label>
            <input
            className="form-control mb-2"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ادخل الرقم القومي"
              disabled={isLoading}
            />
            {errors.id && (
              <div className="text-danger">{errors.id}</div>
            )}
          </div>
   <div className="mb-3">
            <label className="fw-bold">رقم المصنع </label>
            <input
            className="form-control mb-2"
              type="text"
              value={factoryNumber}
              onChange={(e) => setFactoryNumber(e.target.value)}
              placeholder="ادخل رقم المصنع "
              disabled={isLoading}
            />
            {errors.factoryNumber && (
              <div className="text-danger">{errors.factoryNumber}</div>
            )}
          </div>
          <img src={factory}
          alt="صورة رقم المصنع"
          className="w-25"/>
        
        <div className="mt-3">
        <CaptchaComponent ref={captchaRef} />
        {errors.captcha && <div className="text-danger">{errors.captcha}</div>}
      </div>
       
    

 
      

        

          <button
            type="submit"
            className="w-100 btn btn-outline-secondry border-0"
            disabled={isLoading}
          >
            {isLoading ? "جاري التحقق ..." : "تحقق "}
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

export default CustomModal
;
