import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Copy,
  ArrowRight,
  Sparkles,
  CheckCircle,
  FileText,
  Phone,
  Mail,
} from "lucide-react";
import "../Css/CivilServicesDone.css";
import { useAuth } from "../context/AuthContext";

// مكون الرسوم المتحركة للنجاح
const SuccessAnimation = () => (
  <div className="d-flex justify-content-center align-items-center mb-4">
    <div className="success-animation">
      <div className="success-circle">
        <CheckCircle className="success-icon" />
      </div>
      <div className="sparkle-badge">
        <Sparkles style={{ width: "1rem", height: "1rem", color: "white" }} />
      </div>
    </div>
  </div>
);

// مكون Toast للإشعارات
const Toast = ({ message, isVisible, onClose, type = "success" }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const toastClass = `custom-toast toast-${type}`;

  return (
    <div className={toastClass}>
      <div className="d-flex align-items-center">
        <CheckCircle
          style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }}
        />
        <span>{message}</span>
      </div>
    </div>
  );
};

// مكون الكونفيتي
const Confetti = ({ show }) => {
  if (!show) return null;

  return (
    <div className="confetti-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

function CivilServicesDone() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const { user } = useAuth();

  // الحصول على البيانات المرسلة من الصفحة السابقة
  const {
    serviceType,
    documentType,
    requestId,
    trackingNumber,
    responseData,
    certificateId,
    backendResponse,
  } = location.state || {};

  // بيانات الطلب
  const orderData = {
    serviceType: serviceType || "الخدمات المدنية",
    documentType: documentType || "شهادة ميلاد",
    requestId:
      requestId ||
      certificateId ||
      responseData?.id ||
      responseData?.requestId ||
      "REQ-" + Date.now(),
    trackingNumber:
      trackingNumber || responseData?.trackingNumber || "TRK-" + Date.now(),
    submissionDate: responseData?.submissionDate
      ? new Date(responseData.submissionDate).toLocaleDateString("ar-EG")
      : new Date().toLocaleDateString("ar-EG"),
    estimatedCompletion: responseData?.estimatedCompletion || "3-5 أيام عمل",
    status: responseData?.status || "قيد المراجعة",
    department: responseData?.department || "الأحوال المدنية",
    fees: responseData?.fees || "70 جنيه",
  };

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const copyBackendResponse = async () => {
    if (!backendResponse && !responseData) {
      showToastMessage("لا توجد بيانات للنسخ", "error");
      return;
    }

    try {
      const dataToShow = backendResponse || responseData;
      // تحويل البيانات لنص وإزالة العلامتين " من البداية والنهاية
      let responseText = JSON.stringify(dataToShow, null, 2);
      
      // إزالة العلامتين من البداية والنهاية إذا كانت موجودة
      if (responseText.startsWith('"') && responseText.endsWith('"')) {
        responseText = responseText.slice(1, -1);
      }
      
      await navigator.clipboard.writeText(responseText);
      setCopied(true);
      showToastMessage("تم نسخ رقم الطلب بنجاح!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToastMessage("فشل في نسخ رقم الطلب", "error");
    }
  };

  const trackOrder = () => {
    const requestIdToUse = orderData.requestId;
    if (!requestIdToUse) {
      showToastMessage("لا يوجد رقم طلب للبحث عنه", "error");
      return;
    }
    navigate(`/track-order/${requestIdToUse}`);
  };

  return (
    <div className="bg-gradient-custom">
      {/* Toast للإشعارات */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
      />

      {/* الخلفية المتحركة */}
      <div className="animated-bg"></div>

      {/* كونفيتي متحرك */}
      <Confetti show={showConfetti} />

      <div className="container py-5 position-relative" style={{ zIndex: 10 }}>
        {/* أيقونة النجاح */}
        <SuccessAnimation />

        {/* العنوان الرئيسي */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-clor mb-4 d-flex align-items-center justify-content-center gap-3 flex-wrap">
            تم تقديم الطلب بنجاح
            <Sparkles
              className="text-warning"
              style={{ width: "2rem", height: "2rem" }}
            />
          </h1>
          <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "600px" }}>
            شكراً لك {user?.name || "عميلنا الكريم"}! تم استلام طلبك وسيتم مراجعته في
            أقرب وقت ممكن.
          </p>
        </div>

        {/* تفاصيل الطلب */}
        <div className="card card-custom mb-4 shadow-custom">
          <div className="card-header card-header-gradient">
            <h5 className="card-title mb-0 d-flex align-items-center gap-2">
              <FileText style={{ width: "1.25rem", height: "1.25rem" }} />
              تفاصيل الطلب
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <label className="text-muted small fw-medium">نوع الخدمة</label>
                <p className="fw-bold text-dark mb-0">
                  {orderData.serviceType}
                </p>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="text-muted small fw-medium">
                  نوع الوثيقة
                </label>
                <p className="fw-bold text-dark mb-0">
                  {orderData.documentType}
                </p>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="text-muted small fw-medium">
                  الإدارة المختصة
                </label>
                <p className="fw-bold text-dark mb-0">{orderData.department}</p>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="text-muted small fw-medium">
                  المدة المتوقعة
                </label>
                <p className="fw-bold text-dark mb-0">
                  {orderData.estimatedCompletion}
                </p>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="text-muted small fw-medium">حالة الطلب</label>
                <br />
                <span className="badge status-pending">{orderData.status}</span>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="text-muted small fw-medium">الرسوم</label>
                <p className="fw-bold text-dark mb-0">{orderData.fees}</p>
              </div>
            </div>
          </div>
        </div>

        {/* أرقام الطلب */}
        <div className="card card-custom mb-4 shadow-custom">
          <div className="card-header border-bottom">
            <h6 className="fw-bold text-color mb-0 d-flex align-items-center gap-2">
              <Copy style={{ width: "1rem", height: "1rem" }} />
              رقم الطلب للمتابعة
            </h6>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <div className="copy-code-box">
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <div className="flex-grow-1">
                    <p className="text-color small mb-2">رقم الطلب</p>
                    <code>
                      {JSON.stringify(backendResponse || responseData, null, 2)}
                    </code>
                  </div>
                  <button
                    onClick={copyBackendResponse}
                    className="btn btn-primary btn-custom"
                  >
                    <Copy style={{ width: "1rem", height: "1rem" }} />
                    {copied ? "تم النسخ!" : "نسخ"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الخطوات التالية */}
        <div className="card card-custom mb-4 shadow-custom">
          <div className="card-header border-bottom">
            <h6 className="fw-bold text-color mb-0">الخطوات التالية</h6>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              {(
                backendResponse?.nextSteps ||
                responseData?.nextSteps || [
                  "انتظر رسالة تأكيد عبر الهاتف أو البريد الإلكتروني",
                  "قم بمتابعة حالة الطلب باستخدام رقم التتبع",
                  "احضر الأوراق المطلوبة عند الاستلام",
                  "تواصل مع خدمة العملاء في حالة وجود استفسارات",
                ]
              ).map((step, index) => (
                <li key={index} className="d-flex align-items-start gap-3 mb-3">
                  <span
                    className="flex-shrink-0 badge bg-primary rounded-pill d-flex align-items-center justify-content-center"
                    style={{
                      width: "24px",
                      height: "24px",
                      fontSize: "12px",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="d-flex justify-content-center mb-4">
          <button
            onClick={trackOrder}
            className="btn nav-btn btn-outline-secondry d-flex align-items-center justify-content-center gap-2 px-4 py-2 shadow"
          >
            متابعة الطلب
            <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
        </div>

        {/* رسالة إضافية */}
        <div className="text-center mt-4 bg-white bg-opacity-75 rounded p-4 shadow">
          <p className="text-color fs-5 mb-3">
            سيتم إرسال تحديثات حول حالة طلبك عبر:
          </p>
          <div className="d-flex justify-content-center gap-4 text-bold">
            <span className="d-flex align-items-center gap-2">
              <Mail
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#3377A9",
                }}
              />
              البريد الالكتروني
            </span>
            <span className="d-flex align-items-center gap-2">
              <Phone
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#3377A9",
                }}
              />
              رقم الهاتف
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CivilServicesDone;