import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
  Copy,
  Download,
  AlertCircle,
  CreditCard,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/TrafficServices.css"
import Line from "../components/Line";
function TrafficDone() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // استقبال البيانات من الـ state أو localStorage
  const orderData =
    location.state ||
    JSON.parse(localStorage.getItem("lastTrafficOrder") || "{}");
  const responseData = orderData.responseData || {};

  // تحديد نوع الخدمة من الكود
  const getServiceType = (documentType) => {
    if (
      documentType?.includes("رخصة إلكترونية") ||
      documentType?.includes("Digital License")
    ) {
      return "license";
    } else if (
      documentType?.includes("تجديد") ||
      documentType?.includes("Renewal")
    ) {
      return "renewal";
    } else if (
      documentType?.includes("بدل فاقد") ||
      documentType?.includes("تالف") ||
      documentType?.includes("Lost") ||
      documentType?.includes("Replacement")
    ) {
      return "replacement";
    } else if (
      documentType?.includes("مخالفات") ||
      documentType?.includes("Fine") ||
      documentType?.includes("Traffic")
    ) {
      return "violation";
    }
    return "license"; // default
  };
  const handleOrdersClick = () => {
    navigate("/orders");
  };
  const serviceType = getServiceType(orderData.documentType);

  // تحديد محتوى الصفحة بناءً على نوع الخدمة
  const getServiceContent = (type) => {
    const services = {
      license: {
        title: "تم تقديم طلب الرخصة الإلكترونية بنجاح",
        description:
          "تم استلام طلبك للحصول على رخصة إلكترونية وسيتم معالجته في أقرب وقت ممكن",
        icon: <Shield size={64} className="text-color" />,
        color: "primary",
        bgColor: "bg-color-subtle",
        borderColor: "bordercolor",

        steps: [
          "تم استلام طلبك",
          "جاري مراجعة المستندات",
          "سيتم إنشاء الرخصة الإلكترونية",
          "يمكنك تحميل الرخصة مع رمز QR",
        ],
        estimatedTime: "3-5 أيام عمل",
        features: [
          "رخصة إلكترونية معتمدة",
          "رمز QR للتحقق",
          "صالحة في جميع أنحاء الجمهورية",
          "إمكانية الطباعة",
        ],
      },
      violation: {
        title: "تم تقديم طلب الاستعلام عن المخالفات",
        description:
          "تم استلام طلبك للاستعلام عن المخالفات المرورية وسيتم عرض النتائج قريباً",
        icon: <AlertCircle size={64} className="text-color" />,
        color: "danger",
        bgColor: "bg-color-subtle",
        borderColor: "bordercolor",

        steps: [
          "تم استلام طلبك",
          "جاري البحث في قاعدة البيانات",
          "سيتم عرض تفاصيل المخالفات",
          "يمكنك دفع المخالفات إلكترونياً",
        ],
        estimatedTime: "فوري - 30 دقيقة",
        features: [
          "عرض جميع المخالفات",
          "تفاصيل المخالفة والغرامة",
          "إمكانية الدفع الإلكتروني",
          "سجل المخالفات المدفوعة",
        ],
      },
      renewal: {
        title: "تم تقديم طلب تجديد الرخصة",
        description: "تم استلام طلبك لتجديد رخصة القيادة وسيتم معالجته قريباً",
        icon: <RefreshCw size={64} className="text-color" />,
        color: "success",
        bgColor: "bg-color-subtle",
        borderColor: "bordercolor",

        steps: [
          "تم استلام طلبك",
          "جاري مراجعة صلاحية الرخصة",
          "سيتم تجديد الرخصة",
          "يمكنك استلام الرخصة المجددة",
        ],
        estimatedTime: "5-7 أيام عمل",
        features: [
          "تجديد صلاحية الرخصة",
          "فحص السجل المروري",
          "إمكانية التوصيل للمنزل",
          "إشعار عند الانتهاء",
        ],
      },
      replacement: {
        title: "تم تقديم طلب بدل فاقد/تالف",
        description:
          "تم استلام طلبك للحصول على بدل فاقد أو تالف للرخصة وسيتم معالجته قريباً",
        icon: <FileText size={64} className="text-color" />,
        color: "warning",
        bgColor: "bg-color-subtle",
        borderColor: "bordercolor",

        steps: [
          "تم استلام طلبك",
          "جاري التحقق من البيانات",
          "سيتم إصدار البدل",
          "يمكنك استلام الرخصة الجديدة",
        ],
        estimatedTime: "7-10 أيام عمل",
        features: [
          "بدل معتمد للرخصة",
          "نفس بيانات الرخصة الأصلية",
          "إمكانية التوصيل للمنزل",
          "إلغاء الرخصة المفقودة",
        ],
      },
    };
    return services[type] || services.license;
  };

  const serviceContent = getServiceContent(serviceType);

  // نسخ رقم الطلب
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // التنقل للصفحة الرئيسية
  const handleGoHome = () => {
    navigate("/");
  };

  // التنقل لتتبع الطلب
  const handleTrackOrder = () => {
    navigate("/track-order", { state: { requestId: responseData.requestId } });
  };

  return (
    <div className="min-vh-100 bg-light py-4">
   
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {/* Header Section */}
            <div
              className={`card ${serviceContent.bgColor} ${serviceContent.borderColor} border-2 mb-4`}
            >
              <div className="card-body text-center py-5">
                <div className="mb-4">{serviceContent.icon}</div>
                <h1 className="card-title h2 mb-3">{serviceContent.title}</h1>
                <p className="card-text text-muted fs-5">
                  {serviceContent.description}
                </p>
              </div>
            </div>

            {/* Request Details */}
            <div className="card shadow-sm mb-4">
              <div className="card-body p-4">
                <h2 className="card-title h4 mb-4 text-color fw-bold">
                  <i className="fas fa-clipboard-list me-2"></i>
                  تفاصيل الطلب
                </h2>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted fw-medium">
                          <i className="fas fa-cog me-2 text-color"></i>
                          نوع الخدمة:
                        </span>
                        <span className="fw-bold text-dark">
                          {orderData.documentType || "خدمة مرورية"}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted fw-medium">
                          <i className="fas fa-clock me-2 text-color"></i>
                          الوقت المتوقع:
                        </span>
                        <span className="fw-bold">
                          {serviceContent.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted fw-medium">
                          <i className="fas fa-calendar-alt me-2 text-color"></i>
                          تاريخ التقديم:
                        </span>
                        <span className="fw-bold text-dark">
                          {new Date().toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted fw-medium">
                          <i className="fas fa-info-circle me-2 text-color"></i>
                          حالة الطلب:
                        </span>
                        <span className="badge bg-warning text-dark px-3 py-2">
                          <i className="fas fa-spinner me-1"></i>
                          قيد المعالجة
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {copied && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <CheckCircle className="me-2" size={20} />
                    تم نسخ رقم الطلب بنجاح!
                  </div>
                )}
              </div>
            </div>

            {/* رقم الطلب */}
            <div className="card shadow-sm mb-4">
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
                        <code className="request-id-code">
                          {responseData.requestId || "غير متوفر"}
                        </code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(responseData.requestId)}
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

            {/* Processing Steps */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h2 className="card-title text-color d-flex justify-content-center h4 mb-4">مراحل المعالجة</h2>
                <Line/>
                <div className="list-group list-group-flush">
                  {serviceContent.steps.map((step, index) => (
                    <div
                      key={index}
                      className="list-group-item d-flex align-items-center border-0 px-0"
                    >
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                          index === 0
                            ? "bg-success text-white"
                            : "bg-light text-muted"
                        }`}
                        style={{ width: "30px", height: "30px" }}
                      >
                        {index === 0 ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Clock size={16} />
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <p
                          className={`mb-0 ${
                            index === 0
                              ? "text-success fw-medium"
                              : "text-muted"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h2 className="card-title text-color d-flex justify-content-center h4 mb-4">مميزات الخدمة</h2>
      <Line/>
                <div className="row">
                  {serviceContent.features.map((feature, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
              <button
                onClick={handleOrdersClick}
                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
              >
                <Clock className="me-2" size={20} />
                تتبع الطلب
              </button>

              <button
                onClick={handleGoHome}
                className="btn btn-secondary btn-lg d-flex align-items-center justify-content-center"
              >
                <ArrowRight className="me-2" size={20} />
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrafficDone;
