import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Copy,
  Download,
  ArrowRight,
  Sparkles,
  Share2,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  User,
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
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();

  // الحصول على البيانات من localStorage
  const getUserData = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  // الحصول على البيانات المرسلة من الصفحة السابقة
  const { 
    serviceType, 
    documentType, 
    requestId, 
    trackingNumber,
    responseData,
    certificateId,
    backendResponse 
  } = location.state || {};

  // بيانات المستخدم من localStorage
  const userData = getUserData();

  // بيانات الطلب مع البيانات الحقيقية
  const orderData = {
    // بيانات الخدمة
    serviceType: serviceType || "الخدمات المدنية",
    documentType: documentType || "شهادة ميلاد",
    requestId: requestId || certificateId || responseData?.id || responseData?.requestId || "REQ-" + Date.now(),
    trackingNumber: trackingNumber || responseData?.trackingNumber || "TRK-" + Date.now(),
    
    // بيانات التوقيت
    submissionDate: responseData?.submissionDate 
      ? new Date(responseData.submissionDate).toLocaleDateString("ar-EG")
      : new Date().toLocaleDateString("ar-EG"),
    submissionTime: responseData?.submissionTime 
      ? new Date(responseData.submissionTime).toLocaleTimeString("ar-EG")
      : new Date().toLocaleTimeString("ar-EG"),
    
    // بيانات الطلب
    estimatedCompletion: responseData?.estimatedCompletion || "3-5 أيام عمل",
    status: responseData?.status || "قيد المراجعة",
    priority: responseData?.priority || "عادي",
    department: responseData?.department || "الأحوال المدنية",
    fees: responseData?.fees || "70 جنيه",
    
    // بيانات المستخدم الحقيقية من localStorage
    applicantName: userData?.name || responseData?.applicantName || "غير محدد",
    nationalId: userData?.nationalId || responseData?.nationalId || "غير محدد",
    phone: userData?.phone || responseData?.phone || "غير محدد",
    email: userData?.email || responseData?.email || "غير محدد",
    address: userData?.address || responseData?.address || "غير محدد",
    birthDate: userData?.birthDate || responseData?.birthDate || "غير محدد",
    gender: userData?.gender || responseData?.gender || "غير محدد",
  };

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);

    // تحديث الوقت كل ثانية
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // طباعة البيانات للتحقق
    console.log("Location state:", location.state);
    console.log("User data from localStorage:", userData);
    console.log("Order data:", orderData);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToastMessage(`تم نسخ ${label} بنجاح!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToastMessage(`فشل في نسخ ${label}`, "error");
    }
  };

  const copyBackendResponse = async () => {
    if (!backendResponse && !responseData) {
      showToastMessage("لا توجد بيانات للنسخ", "error");
      return;
    }

    try {
      const dataToShow = backendResponse || responseData;
      const responseText = JSON.stringify(dataToShow, null, 2);
      await navigator.clipboard.writeText(responseText);
      
      showToastMessage("تم نسخ رقم الطلب بنجاح!");
    } catch (err) {
      showToastMessage("فشل في نسخ رقم الطلب  ", "error");
    }
  };

 

  const shareOrder = async () => {
    const shareData = {
      title: "تم تقديم الطلب بنجاح",
      text: `تم تقديم طلب ${orderData.documentType} برقم: ${orderData.requestId}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToastMessage("تم مشاركة تفاصيل الطلب!");
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\nرقم الطلب: ${orderData.requestId}\nرقم التتبع: ${orderData.trackingNumber}`
        );
        showToastMessage("تم نسخ تفاصيل الطلب للمشاركة!");
      }
    } catch (err) {
      showToastMessage("فشل في مشاركة الطلب", "error");
    }
  };

  const trackOrder = () => {
    showToastMessage("سيتم توجيهك لصفحة متابعة الطلب...", "info");
    setTimeout(() => {
      // يمكنك تغيير الرابط حسب النظام الخاص بك
      window.open(`#/track-order/${orderData.requestId}`, "_blank");
    }, 1500);
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
            شكراً لك {orderData.applicantName}! تم استلام طلبك وسيتم مراجعته في أقرب وقت ممكن. 
            ستصلك تحديثات دورية حول حالة طلبك.
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
                    <p className="text-color  small mb-2">رقم الطلب </p>
                    <code> {JSON.stringify(backendResponse || responseData, null, 2)}</code>
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

       

        {/* معلومات مقدم الطلب */}
        {/* <div className="card card-custom mb-4 shadow-custom">
          <div className="card-header border-bottom">
            <h6 className="fw-bold text-color mb-0 d-flex align-items-center gap-2">
              <User style={{ width: "1rem", height: "1rem" }} />
              معلومات مقدم الطلب
            </h6>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="text-muted small fw-medium">
                  الاسم الكامل
                </label>
                <p className="fw-bold text-dark mb-0">
                {user?.name || "غير متوفر"}
                </p>
              </div>
              <div className="col-md-6">
                <label className="text-muted small fw-medium">
                  الرقم القومي
                </label>
                <p className="fw-bold text-dark mb-0"> {user?.nationalId || "غير متوفر"}</p>
              </div>
              <div className="col-md-6">
                <label className="text-muted small fw-medium">رقم الهاتف</label>
                <p className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <Phone style={{ width: "1rem", height: "1rem" }} />
                  {user?.phone || "غير متوفر"}
                </p>
              </div>
              <div className="col-md-6">
                <label className="text-muted small fw-medium">
                  البريد الإلكتروني
                </label>
                <p className="text-dark fw-semibold d-flex align-items-center gap-2">
                  <Mail style={{ width: "1rem", height: "1rem" }} />
                  {user?.email || "غير متوفر"}
                </p>
              </div>
              <div className="col-md-6">
                <label className="text-muted small fw-medium">العنوان</label>
                <p className="fw-bold text-dark mb-0">{user.address || "غير محدد"}</p>
              </div>
              <div className="col-md-6">
                <label className="text-muted small fw-medium">تاريخ الميلاد</label>
                <p className="fw-bold text-dark mb-0">{user.birthDate || "غير محدد"}</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* الخطوات التالية */}
        <div className="card card-custom mb-4 shadow-custom">
          <div className="card-header border-bottom">
            <h6 className="fw-bold text-color mb-0">الخطوات التالية</h6>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              {((backendResponse?.nextSteps || responseData?.nextSteps) || [
                "انتظر رسالة تأكيد عبر الهاتف أو البريد الإلكتروني",
                "قم بمتابعة حالة الطلب باستخدام رقم التتبع",
                "احضر الأوراق المطلوبة عند الاستلام",
                "تواصل مع خدمة العملاء في حالة وجود استفسارات"
              ]).map((step, index) => (
                <li
                  key={index}
                  className="d-flex align-items-start gap-3 mb-3"
                >
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
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
       
         
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
              <Mail style={{ width: "1.25rem", height: "1.25rem", color: "#3377A9"}} />
            البريد الالكتروني
            </span>
            <span className="d-flex align-items-center gap-2">
              <Phone style={{ width: "1.25rem", height: "1.25rem", color: "#3377A9" }} />
             رقم الهاتف
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CivilServicesDone;