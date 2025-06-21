import {useEffect} from "react";
import "./UtilityServices.css";

import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { billingService } from "../../services/billingService";
import CaptchaComponent from "../captcha";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../config/stripeConfig";
import StripePayment from "../StripePaymentForm";
import { useAuth } from "../../context/AuthContext";
import { FaArrowLeftLong } from "react-icons/fa6";




function UtilityFormFields({
  formData,
  errors,
  handleChange,
  captchaRef,
  showCaptcha,
}) {

  return (
    <>
  
      <div className="mb-3">
        <label className="form-label">الرقم القومي</label>
        <input
          type="text"
          className={`form-control custom-input ${
            errors.NID ? "is-invalid" : ""
          }`}
          name="NID"
          autoComplete="off"
          value={formData.NID}
          onChange={handleChange}
          placeholder="ادخل الرقم القومي"
          maxLength="14"
        />
        {errors.NID && <div className="invalid-feedback">{errors.NID}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">رقم العداد</label>
        <input
          type="number"
          className={`form-control custom-input ${
            errors.currentReading ? "is-invalid" : ""
          }`}
          name="currentReading"
          autoComplete="off"
          value={formData.currentReading}
          onChange={handleChange}
          placeholder="ادخل رقم العداد"
          min="0"
        />
        {errors.currentReading && (
          <div className="invalid-feedback">{errors.currentReading}</div>
        )}
      </div>
      {showCaptcha && (
        <div className="mt-3">
          <CaptchaComponent ref={captchaRef} />
        </div>
      )}
   </>
  );
}

const UtilityServices = forwardRef((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const card = location.state;
  const captchaRef = useRef();

  const [formData, setFormData] = useState({
    NID: "",
    currentReading: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    } else {
      setAuthError(null);
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getUtilityType = (title) => {
    if (title.includes("كهرباء")) return "Electricity";
    if (title.includes("مياه")) return "Water";
    if (title.includes("غاز")) return "Gas";
  
    return "Other";
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const newErrors = {};
      const isCaptchaValid = captchaRef.current?.validateCaptchaField();

      if (!formData.NID || formData.NID.length !== 14) {
        newErrors.NID = "الرقم القومي يجب أن يكون 14 رقم";
      }

      if (
        !formData.currentReading ||
        isNaN(formData.currentReading) ||
        Number(formData.currentReading) < 0
      ) {
        newErrors.currentReading = "قراءة العداد يجب أن تكون رقماً موجباً";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0 && isCaptchaValid;
    },
    getFormData: () => formData,
  }));
  if (!user) {
    return (
      <div className="mt-3 p-3">
        <Alert variant="warning" className="mb-3">
          <p className="mb-0">{authError}</p>
        </Alert>
      </div>
    );
  }
  const handleProceedToPayment = async () => {
    // Check if user is logged in
    // if (!user) {
    //   setAuthError("يجب تسجيل الدخول أولاً قبل القيام بهذه العملية");
    //   // setTimeout(() => {
    //   //   navigate("/login");
    //   // }, 2000);
    //   return;
    // }

    // setAuthError(null);
    setPaymentError(null);
    setIsProcessing(true);
    setPaymentData(null);

    try {
      console.log("بدء عملية السداد...");
      const isValid = ref.current.validateForm();
      if (!isValid) {
        console.log("فشل التحقق من صحة النموذج");
        setIsProcessing(false);
        return;
      }
      console.log("تم التحقق من صحة النموذج بنجاح");

      const apiPayload = {
        NID: formData.NID.trim(),
        type: getUtilityType(card.title),
        currentReading: parseInt(formData.currentReading, 10),
      };
      console.log("بيانات الطلب:", apiPayload);

      console.log("جاري إرسال الطلب للباك إند...");
      const result = await billingService.generateAndPayBill(apiPayload);
      console.log("استجابة الباك إند:", result);

      if (result && result.clientSecret && result.paymentIntentId) {
        console.log("تم استلام بيانات الدفع بنجاح");
        setPaymentData({
          clientSecret: result.clientSecret,
          paymentIntentId: result.paymentIntentId,
          billNumber: result.billNumber || "",
          amount: result.amount || 0,
        });
        console.log("تم تحديث حالة الدفع:", {
          clientSecret: result.clientSecret,
          paymentIntentId: result.paymentIntentId,
          billNumber: result.billNumber,
          amount: result.amount,
        });
        setPaymentStep("payment");
      } else {
        console.error("فشل في الحصول على بيانات الدفع:", result);
        throw new Error(
          result.message || "فشل في تهيئة عملية الدفع من الخادم."
        );
      }
    } catch (error) {
      console.error("حدث خطأ أثناء عملية السداد:", error);
      setPaymentError(error.message || "حدث خطأ غير متوقع أثناء تهيئة الدفع.");
      setPaymentStep("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log("تم الدفع بنجاح:", paymentResult);
    setPaymentStep("success_redirecting");
  };

  const handlePaymentError = (errorMessage) => {
    console.error("فشل الدفع:", errorMessage);
    setPaymentError(errorMessage);
    setPaymentStep("error");
  };

  const renderContent = () => {
  
    switch (paymentStep) {
      case "success_redirecting":
        return (
          <div className=" text-center p-4">
            <Spinner animation="border" role="status" />
            <p className="mt-2">جاري معالجة الدفع...</p>
          </div>
        );
      case "error":
        return (
          <div>
            <Alert variant="danger" className="mb-3">
              <h4>حدث خطأ!</h4>
              <p>{paymentError || "حدث خطأ غير متوقع."}</p>
            </Alert>
            <UtilityFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              captchaRef={captchaRef}
              showCaptcha={true}
            />
          </div>
        );
      case "payment":
        if (!paymentData?.clientSecret) {
          console.error("لا توجد بيانات الدفع المطلوبة");
          return (
            <div className="modern-card">
              <Alert variant="danger" className="mb-3">
                <h4>خطأ في بيانات الدفع</h4>
                <p>لم يتم استلام بيانات الدفع المطلوبة</p>
              </Alert>
              <UtilityFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                captchaRef={captchaRef}
                showCaptcha={true}
              />
              <button
                className="btn nav-btn px-4 py-2 fs-5 mb-2 w-100"
                onClick={handleProceedToPayment}
                disabled={isProcessing}
              >
                {isProcessing ? "جاري المعالجة..." : "متابعة"}
              </button>
            </div>
          );
        }
        return (
          <div className="payment-section">
            <h5>تفاصيل الفاتورة</h5>
            {paymentData.billNumber && (
              <p>رقم الفاتورة: {paymentData.billNumber}</p>
            )}
            {paymentData.amount && <p>المبلغ: {paymentData.amount}</p>}

            <div className="mt-4">
              <h5>إدخال بيانات البطاقة</h5>
              <Elements stripe={stripePromise}>
                <StripePayment
                  clientSecret={paymentData.clientSecret}
                  paymentIntentId={paymentData.paymentIntentId}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </Elements>
            </div>

            <button
              className="btn btn-link mt-2"
              onClick={() => {
                setPaymentStep("form");
                setPaymentError(null);
                setPaymentData(null);
              }}
            >
              إلغاء
            </button>
          </div>
        );
      case "form":
      default:
        return (
          <div>
       
            {authError && (
              <Alert variant="warning" className="mb-3">
                <p className="mb-0">{authError}</p>
              </Alert>
            )}
            <UtilityFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              captchaRef={captchaRef}
              showCaptcha={true}
            />
          
            <div className="d-flex justify-content-end">
              <button
                className="btn nav-btn btn-outline-secondry p2-4 py-2  mb-2"
                onClick={handleProceedToPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  "جاري الاستعلام..."
                ) : (
                  <>
                    متابعة &nbsp; <FaArrowLeftLong size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="utility-services">{renderContent()}</div>;
});

export default UtilityServices;
