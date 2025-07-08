import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Clock,
  CheckCircle,
  X,
  AlertCircle,
  Loader2,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Copy,
  RefreshCw,
} from "lucide-react";
import "../Css/CivilServicesDone.css";

// Base URL للـ API
const BASE_URL = "https://smartgovernment-fpcxb3cmfef3e6c0.uaenorth-01.azurewebsites.net/api";

function TrackOrder() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  // دالة جلب حالة الطلب
  const fetchOrderStatus = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/CivilDocuments/request/99786211-3199-4c22-aaa8-8c37be064b55/status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrderStatus(data);
      console.log("Order status data:", data);
      showToastMessage("تم تحميل حالة الطلب بنجاح!");
    } catch (error) {
      console.error("Error fetching order status:", error);
      setError(
        error.message || "حدث خطأ أثناء جلب حالة الطلب. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (requestId) {
      fetchOrderStatus();
    }
  }, [requestId]);

  // دالة الحصول على لون الحالة
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "قيد المراجعة":
        return "#ffc107";
      case "approved":
      case "تم الموافقة":
        return "#28a745";
      case "rejected":
      case "مرفوض":
        return "#dc3545";
      case "in_progress":
      case "قيد التنفيذ":
        return "#17a2b8";
      case "completed":
      case "مكتمل":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  // دالة الحصول على أيقونة الحالة
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "قيد المراجعة":
        return <Clock style={{ width: "1.5rem", height: "1.5rem" }} />;
      case "approved":
      case "تم الموافقة":
        return <CheckCircle style={{ width: "1.5rem", height: "1.5rem" }} />;
      case "rejected":
      case "مرفوض":
        return <X style={{ width: "1.5rem", height: "1.5rem" }} />;
      case "in_progress":
      case "قيد التنفيذ":
        return (
          <Loader2
            style={{ width: "1.5rem", height: "1.5rem" }}
            className="animate-spin"
          />
        );
      case "completed":
      case "مكتمل":
        return <CheckCircle style={{ width: "1.5rem", height: "1.5rem" }} />;
      default:
        return <AlertCircle style={{ width: "1.5rem", height: "1.5rem" }} />;
    }
  };

  // دالة عرض toast message
  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // دالة نسخ رقم الطلب
  const copyRequestId = async () => {
    try {
      await navigator.clipboard.writeText(requestId);
      showToastMessage("تم نسخ رقم الطلب بنجاح!");
    } catch (err) {
      console.error("Failed to copy request ID:", err);
      showToastMessage("فشل في نسخ رقم الطلب", "error");
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-custom min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Loader2
            className="animate-spin mb-3"
            style={{ width: "3rem", height: "3rem", color: "#667eea" }}
          />
          <h5 className="text-color">جاري تحميل حالة الطلب...</h5>
          <p className="text-muted">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-custom min-vh-100">
        {/* Toast للإشعارات */}
        {showToast && (
          <div
            className={`custom-toast toast-${toastType}`}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 9999,
              padding: "15px 20px",
              borderRadius: "8px",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              background:
                toastType === "success"
                  ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                  : "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
            }}
          >
            <div className="d-flex align-items-center">
              {toastType === "success" ? (
                <CheckCircle
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "0.5rem",
                  }}
                />
              ) : (
                <AlertCircle
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "0.5rem",
                  }}
                />
              )}
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card card-custom shadow-custom">
                <div className="card-body text-center py-5">
                  <AlertCircle
                    style={{ width: "4rem", height: "4rem", color: "#dc3545" }}
                    className="mb-3"
                  />
                  <h4 className="text-color mb-3">حدث خطأ</h4>
                  <p className="text-muted mb-4">{error}</p>
                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      onClick={() => fetchOrderStatus(true)}
                      className="btn btn-primary d-flex align-items-center gap-2"
                      disabled={refreshing}
                    >
                      {refreshing ? (
                        <Loader2
                          style={{ width: "1rem", height: "1rem" }}
                          className="animate-spin"
                        />
                      ) : (
                        <RefreshCw style={{ width: "1rem", height: "1rem" }} />
                      )}
                      إعادة المحاولة
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="btn btn-outline-secondary d-flex align-items-center gap-2"
                    >
                      <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
                      العودة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-custom min-vh-100">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-light d-flex align-items-center gap-2"
          >
            <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
            العودة
          </button>
          <button
            onClick={() => fetchOrderStatus(true)}
            className="btn btn-primary d-flex align-items-center gap-2"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2
                style={{ width: "1rem", height: "1rem" }}
                className="animate-spin"
              />
            ) : (
              <RefreshCw style={{ width: "1rem", height: "1rem" }} />
            )}
            تحديث
          </button>
        </div>

        {/* العنوان الرئيسي */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-clor mb-3 d-flex align-items-center justify-content-center gap-3">
            <Search style={{ width: "2rem", height: "2rem" }} />
            متابعة حالة الطلب
          </h1>
          <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
            <p className="text-muted mb-0">رقم الطلب:</p>
            <code className="fs-6 bg-light px-3 py-2 rounded">{requestId}</code>
            <button
              onClick={copyRequestId}
              className="btn btn-sm btn-outline-primary"
            >
              <Copy style={{ width: "1rem", height: "1rem" }} />
            </button>
          </div>
        </div>

        {orderStatus && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Status Card */}
              <div className="card card-custom mb-4 shadow-custom">
                <div className="card-header card-header-gradient">
                  <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                    <FileText style={{ width: "1.25rem", height: "1.25rem" }} />
                    حالة الطلب
                  </h5>
                </div>
                <div className="card-body">
                  {/* Status Badge */}
                  <div className="text-center mb-4">
                    <div
                      className="status-badge"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "15px 25px",
                        borderRadius: "25px",
                        backgroundColor: getStatusColor(orderStatus.status),
                        color: "white",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {getStatusIcon(orderStatus.status)}
                      {orderStatus.status || "غير محدد"}
                    </div>
                  </div>

                  {/* Status Details */}
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div
                        className="status-item p-3"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef",
                        }}
                      >
                        <label className="text-muted small fw-medium">
                          رقم الطلب
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.requestId || orderStatus.id || requestId}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="status-item p-3"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef",
                        }}
                      >
                        <label className="text-muted small fw-medium">
                          تاريخ التقديم
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.submissionDate ||
                            orderStatus.createdAt ||
                            "غير محدد"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="status-item p-3"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef",
                        }}
                      >
                        <label className="text-muted small fw-medium">
                          المدة المتوقعة
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.estimatedCompletion ||
                            orderStatus.estimatedTime ||
                            "غير محدد"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="status-item p-3"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef",
                        }}
                      >
                        <label className="text-muted small fw-medium">
                          آخر تحديث
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.lastUpdated ||
                            orderStatus.updatedAt ||
                            "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {orderStatus.progress && (
                    <div className="mt-4">
                      <label className="text-muted small fw-medium mb-2">
                        تقدم الطلب
                      </label>
                      <div
                        className="progress"
                        style={{ height: "10px", borderRadius: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          style={{
                            width: `${orderStatus.progress}%`,
                            background:
                              "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "5px",
                          }}
                        ></div>
                      </div>
                      <small className="text-muted">
                        {orderStatus.progress}% مكتمل
                      </small>
                    </div>
                  )}

                  {/* Notes */}
                  {orderStatus.notes && (
                    <div
                      className="mt-4 p-3"
                      style={{
                        backgroundColor: "#e3f2fd",
                        borderRadius: "10px",
                        border: "1px solid #bbdefb",
                      }}
                    >
                      <label className="text-muted small fw-medium mb-2">
                        ملاحظات
                      </label>
                      <p className="text-dark mb-0">{orderStatus.notes}</p>
                    </div>
                  )}

                  {/* Additional Info */}
                  {orderStatus.additionalInfo && (
                    <div
                      className="mt-4 p-3"
                      style={{
                        backgroundColor: "#f3e5f5",
                        borderRadius: "10px",
                        border: "1px solid #e1bee7",
                      }}
                    >
                      <label className="text-muted small fw-medium mb-2">
                        معلومات إضافية
                      </label>
                      <p className="text-dark mb-0">
                        {orderStatus.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Applicant Info */}
              {orderStatus.applicant && (
                <div className="card card-custom mb-4 shadow-custom">
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
                        <p className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                          <User style={{ width: "1rem", height: "1rem" }} />
                          {orderStatus.applicant.name || "غير متوفر"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          الرقم القومي
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.applicant.nationalId || "غير متوفر"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          رقم الهاتف
                        </label>
                        <p className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                          <Phone style={{ width: "1rem", height: "1rem" }} />
                          {orderStatus.applicant.phone || "غير متوفر"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          البريد الإلكتروني
                        </label>
                        <p className="text-dark fw-semibold d-flex align-items-center gap-2">
                          <Mail style={{ width: "1rem", height: "1rem" }} />
                          {orderStatus.applicant.email || "غير متوفر"}
                        </p>
                      </div>
                      {orderStatus.applicant.address && (
                        <div className="col-md-6">
                          <label className="text-muted small fw-medium">
                            العنوان
                          </label>
                          <p className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                            <MapPin style={{ width: "1rem", height: "1rem" }} />
                            {orderStatus.applicant.address}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Service Details */}
              {orderStatus.serviceDetails && (
                <div className="card card-custom mb-4 shadow-custom">
                  <div className="card-header border-bottom">
                    <h6 className="fw-bold text-color mb-0 d-flex align-items-center gap-2">
                      <FileText style={{ width: "1rem", height: "1rem" }} />
                      تفاصيل الخدمة
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          نوع الخدمة
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.serviceDetails.serviceType || "غير محدد"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          نوع الوثيقة
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.serviceDetails.documentType ||
                            "غير محدد"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          الإدارة المختصة
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.serviceDetails.department || "غير محدد"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small fw-medium">
                          الرسوم
                        </label>
                        <p className="fw-bold text-dark mb-0">
                          {orderStatus.serviceDetails.fees || "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
