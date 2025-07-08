import { useEffect } from "react";
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
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
  FaFileInvoice,
  FaLock,
  FaSpinner,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import Sidebar from "../SideBar";

function BillDetailsCard({ paymentData, formData, card }) {
  const getUtilityType = (title) => {
    if (title.includes("كهرباء")) return "كهرباء";
    if (title.includes("مياه")) return "مياه";
    if (title.includes("غاز")) return "غاز";
    return "خدمة أخرى";
  };

  return (
    <div className="bill-details-card">
      <div className="bill-header">
        <div className="bill-icon">
          <FaFileInvoice />
        </div>
        <h3 className="bill-title">تفاصيل الفاتورة</h3>
      </div>

      <div className="bill-info">
        {paymentData?.billNumber && (
          <div className="bill-info-item">
            <span className="bill-info-label">رقم الفاتورة</span>
            <span className="bill-info-value">#{paymentData.billNumber}</span>
          </div>
        )}

        <div className="bill-info-item">
          <span className="bill-info-label">نوع الخدمة</span>
          <span className="bill-info-value">
            {getUtilityType(card?.title || "")}
          </span>
        </div>

        <div className="bill-info-item">
          <span className="bill-info-label">الرقم القومي</span>
          <span className="bill-info-value">{formData.NID}</span>
        </div>

        <div className="bill-info-item">
          <span className="bill-info-label">قراءة العداد</span>
          <span className="bill-info-value">{formData.currentReading}</span>
        </div>
      </div>

      {paymentData?.amount && (
        <div className="bill-amount">
          <div className="bill-amount-label">المبلغ المستحق</div>
          <div className="bill-amount-value">{paymentData.amount} جنيه</div>
        </div>
      )}
    </div>
  );
}
function ErrorMessage({ errorMessage, onRetry, onChangeCard }) {
  return (
    <div className="error-message-card">
      <div className="error-icon">
        <FaTimesCircle />
      </div>
      <h2 className="error-title">فشل في الدفع</h2>
      <p className="error-description">
        عذراً، لم نتمكن من معالجة دفعتك. يرجى المحاولة مرة أخرى أو استخدام بطاقة
        أخرى.
      </p>
      <div className="success-details">
        <strong>السبب:</strong> {errorMessage || "خطأ غير محدد"}
      </div>
      <div className="button-group">
        <button className="btn-enhanced btn-danger" onClick={onRetry}>
          المحاولة مرة أخرى
        </button>
      </div>
    </div>
  );
}
function ProcessingState() {
  return (
    <div className="processing-state">
      <div className="processing-icon">
        <FaSpinner className="loading-spinner" />
      </div>
      <h3>جاري معالجة الدفع...</h3>
      <p>يرجى عدم إغلاق هذه الصفحة أو الضغط على زر الرجوع</p>
    </div>
  );
}
function PaymentFormCard({
  paymentData,
  onPaymentSuccess,
  onPaymentError,
  formData,
  card,
}) {
  return (
    <div className="payment-form-card">
      <div className="payment-header">
        <div className="payment-icon">
          <FaCreditCard />
        </div>
        <h3 className="payment-title">بيانات البطاقة الائتمانية</h3>
      </div>

      <Elements stripe={stripePromise}>
        <StripePayment
          clientSecret={paymentData.clientSecret}
          paymentIntentId={paymentData.paymentIntentId}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
          // إضافة البيانات المطلوبة
          formData={formData}
          card={card}
          paymentData={paymentData}
          billDetails={paymentData}
        />
      </Elements>

      <div className="security-notice">
        <FaLock />
        معاملتك محمية بتشفير SSL وتتم معالجتها بأمان تام
      </div>
    </div>
  );
}
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
        <label className="form-label">رقم العداد </label>
        <input
          type="text"
          className={`form-control custom-input ${
            errors.NID ? "is-invalid" : ""
          }`}
          name="NID"
          autoComplete="off"
          value={formData.NID}
          onChange={handleChange}
          placeholder="ادخل رقم العداد "
          maxLength="14"
        />
        {errors.NID && <div className="invalid-feedback">{errors.NID}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">قراءة العداد الحالية</label>
        <input
          type="number"
          className={`form-control custom-input ${
            errors.currentReading ? "is-invalid" : ""
          }`}
          name="currentReading"
          autoComplete="off"
          value={formData.currentReading}
          onChange={handleChange}
          placeholder="ادخل قراءة العداد"
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
  const handleRetryPayment = () => {
    setPaymentStep("form");
    setPaymentError(null);
    setPaymentData(null);
  };
  const handleChangeCard = () => {
    setPaymentStep("payment");
    setPaymentError(null);
  };

  const renderContent = () => {
    switch (paymentStep) {
      case "success_redirecting":
        return <ProcessingState />;
      case "error":
        return (
          <div>
            <ErrorMessage
              errorMessage={paymentError}
              onRetry={handleRetryPayment}
              onChangeCard={handleChangeCard}
            />
            <div className="modern-card">
              <UtilityFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                captchaRef={captchaRef}
                showCaptcha={true}
              />
              <div className="d-flex justify-content-end">
                <button
                  className="btn nav-btn btn-outline-secondry p2-4 py-2 mb-2 mt-3"
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="loading-spinner" />
                      جاري الاستعلام...
                    </>
                  ) : (
                    <>
                      متابعة
                      <FaArrowLeftLong />
                    </>
                  )}
                </button>
              </div>
            </div>
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
              <div className="button-group">
                <button
                  className="btn-enhanced"
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="loading-spinner" />
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      متابعة
                      <FaArrowLeftLong />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        }
        return (
          <div className="payment-section">
            <div>
              <BillDetailsCard
                paymentData={paymentData}
                formData={formData}
                card={card}
              />

              <PaymentFormCard
                paymentData={paymentData}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                // إضافة البيانات المطلوبة
                formData={formData}
                card={card}
              />

              <div className="button-group">
                <button
                  className="btn nav-btn btn-outline-secondry p2-4 py-2 mb-2 fs-5 mt-3"
                  onClick={() => {
                    setPaymentStep("form");
                    setPaymentError(null);
                    setPaymentData(null);
                  }}
                >
                  إلغاء والعودة
                </button>
              </div>
            </div>
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
                  <>
                    <FaSpinner className="loading-spinner" />
                    جاري الاستعلام...
                  </>
                ) : (
                  <>
                    متابعة
                    <FaArrowLeftLong />
                  </>
                )}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 col-lg-3 mb-3">
        <Sidebar />
      </div>
      <div className="col-md-8 col-lg-9">
        {/* باقي محتوى الخدمة */}
        {renderContent()}
      </div>
    </div>
  );
});

export default UtilityServices;
