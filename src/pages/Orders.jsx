import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Badge,
  Form,
  Button,
  Modal,
  Nav,
  Spinner,
} from "react-bootstrap";
import {
  FaClipboardList,
  FaSearch,
  FaEye,
  FaFileAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaIdCard,
  FaReceipt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../Css/orders.css";
import { useAuth } from "../context/AuthContext";
import { API_CONFIG } from "../api/config";
import { paymentService } from "../services/paymentService";
import OrderCard from "../components/OrderCard";

// Custom styles to inject the new color palette
const customStyles = {
  primaryColor: "#3377A9",
  secondaryColor: "#2d485c",
  lightColor: "#f8f9fa",
  textColor: "#343a40",
  primaryRgb: "51, 119, 169",
  secondaryRgb: "45, 72, 92",
};

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [civilRequests, setCivilRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // حالات متابعة الطلب
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const [activeView, setActiveView] = useState(null);
  const [trafficRequests, setTrafficRequests] = useState([]);
  const [trafficLoading, setTrafficLoading] = useState(false);
  const [trafficError, setTrafficError] = useState(null);
  const [trackingType, setTrackingType] = useState("auto");

  const [showBillDetailsModal, setShowBillDetailsModal] = useState(false);
  const [billDetails, setBillDetails] = useState(null);
  const [billLoading, setBillLoading] = useState(false);

  // حالات الدفع
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
  });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // State لإظهار مودال إدخال كود الدفع
  const [showPaymentCodeModal, setShowPaymentCodeModal] = useState(false);
  const [paymentCodeInput, setPaymentCodeInput] = useState("");
  const [paymentCodeInputError, setPaymentCodeInputError] = useState("");

  useEffect(() => {
    if (user) {
      fetchCivilRequests();
      fetchTrafficRequests();
    }
  }, [user]);

  // جلب جميع الطلبات
  const fetchCivilRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/CivilDocuments/my-requests?userNID=${
          user.nationalId || user.nid
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              user.token || localStorage.getItem("authToken")
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في جلب الطلبات");
      }

      let requests = await response.json();
      // تحقق من أن النتيجة عبارة عن مصفوفة
      if (!Array.isArray(requests)) {
        requests = [];
      }

      requests = requests.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCivilRequests(requests);
    } catch (error) {
      console.error("Error fetching civil requests:", error);
      setError("حدث خطأ في جلب الطلبات");
    } finally {
      setLoading(false);
    }
  };

  // متابعة طلب محدد
  const trackRequest = async (requestId) => {
    try {
      setTrackingLoading(true);
      setTrackingError(null);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/CivilDocuments/request/${requestId}/status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              user.token || localStorage.getItem("authToken")
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في تتبع الطلب");
      }

      const result = await response.json();
      setTrackingResult(result);
      setShowTrackingModal(true);
    } catch (error) {
      console.error("Error tracking request:", error);
      setTrackingError("حدث خطأ في تتبع الطلب");
    } finally {
      setTrackingLoading(false);
    }
  };

  // متابعة طلب خدمات المرور
  const trackTrafficRequest = async (requestId) => {
    try {
      setTrackingLoading(true);
      setTrackingError(null);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/License/${requestId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              user.token || localStorage.getItem("authToken")
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في تتبع طلب خدمات المرور");
      }

      const result = await response.json();
      setTrackingResult(result);
      setShowTrackingModal(true);
    } catch (error) {
      console.error("Error tracking traffic request:", error);
      setTrackingError("حدث خطأ في تتبع طلب خدمات المرور");
    } finally {
      setTrackingLoading(false);
    }
  };

  // جلب طلبات خدمات المرور
  const fetchTrafficRequests = async () => {
    try {
      setTrafficLoading(true);
      setTrafficError(null);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/License/my-requests?userNID=${
          user.nationalId || user.nid
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              user.token || localStorage.getItem("authToken")
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في جلب طلبات خدمات المرور");
      }

      let requests = await response.json();
      // تحقق من أن النتيجة عبارة عن مصفوفة
      if (!Array.isArray(requests)) {
        requests = [];
      }

      requests = requests.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTrafficRequests(requests);
    } catch (error) {
      console.error("Error fetching traffic requests:", error);
      setTrafficError("حدث خطأ في جلب طلبات خدمات المرور");
    } finally {
      setTrafficLoading(false);
    }
  };

  // متابعة طلب بالرقم المرجعي
  const handleTrackByReference = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setTrackingError("يرجى إدخال الرقم المرجعي للطلب");
      return;
    }

    setTrackingError(null); // مسح أي خطأ سابق

    if (trackingType === "traffic") {
      await trackTrafficRequest(trackingId);
    } else if (trackingType === "civil") {
      await trackRequest(trackingId);
    } else {
      // تتبع تلقائي - جرب المرور أولاً ثم الأحوال المدنية
      try {
        await trackTrafficRequest(trackingId);
      } catch (error) {
        try {
          await trackRequest(trackingId);
        } catch (secondError) {
          setTrackingError(
            "لم يتم العثور على الطلب. تأكد من صحة الرقم المرجعي."
          );
        }
      }
    }
  };

  // جلب تفاصيل الفاتورة
  const fetchBillDetails = async (requestOrPaymentCode) => {
    try {
      setBillLoading(true);
      let requestId;
      if (typeof requestOrPaymentCode === "string") {
        if (requestOrPaymentCode.length < 8) {
          requestId = requestOrPaymentCode;
        } else {
          // إذا كان طويل، فهو paymentCode مباشرة
          const response = await fetch(
            `${API_CONFIG.BASE_URL}/License/initiate-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  user.token || localStorage.getItem("authToken")
                }`,
              },
              body: JSON.stringify({ PaymentCode: requestOrPaymentCode }),
            }
          );
          if (!response.ok) {
            throw new Error("فشل في جلب تفاصيل الفاتورة");
          }
          const apiResult = await response.json();
          const data = apiResult.data || {};
          setBillDetails({
            PaymentIntentId: data.paymentIntentId,
            amount: data.amount,
            billNumber: data.billNumber,
            paymentCode: data.paymentCode,
            clientSecret: data.clientSecret,
          });
          setShowBillDetailsModal(true);
          return;
        }
      } else {
        const request = requestOrPaymentCode;
        requestId = request.id || request.referenceNumber;
      }
      // أولاً: جلب كود الدفع من generate-payment-code
      try {
        const res = await fetch(
          `${API_CONFIG.BASE_URL}/license/${requestId}/generate-payment-code`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                user.token || localStorage.getItem("authToken")
              }`,
            },
          }
        );
        if (!res.ok) throw new Error("فشل في جلب كود الدفع");
        const data = await res.json();
        const paymentCode = data.paymentCode;
        if (!paymentCode) {
          throw new Error("لم يتم الحصول على كود دفع صالح");
        }
        // ثانياً: جلب تفاصيل الفاتورة باستخدام كود الدفع
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/License/initiate-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                user.token || localStorage.getItem("authToken")
              }`,
            },
            body: JSON.stringify({ PaymentCode: paymentCode }),
          }
        );
        if (!response.ok) {
          throw new Error("فشل في جلب تفاصيل الفاتورة");
        }
        const apiResult = await response.json();
        const billData = apiResult.data || {};
        setBillDetails({
          PaymentIntentId: billData.paymentIntentId,
          amount: billData.amount,
          billNumber: billData.billNumber,
          paymentCode: billData.paymentCode,
          clientSecret: billData.clientSecret,
        });
        setShowBillDetailsModal(true);
      } catch (err) {
        console.error("Error generating payment code:", err);
        setShowPaymentCodeModal(true);
        setPaymentCodeInput("");
        setPaymentCodeInputError(
          "لم نتمكن من جلب كود الدفع تلقائيًا. يرجى إدخاله يدويًا."
        );
        return;
      }
    } catch (error) {
      console.error("Error fetching bill details:", error);
      setTrackingError("حدث خطأ في جلب تفاصيل الفاتورة");
    } finally {
      setBillLoading(false);
    }
  };

  // معالجة زر الاستعلام عن التفاصيل
  const handleInquireDetails = (request) => {
    const paymentCode =
      request.paymentCode ||
      request.referenceNumber ||
      request.id ||
      (request.data &&
        (request.data.paymentCode ||
          request.data.referenceNumber ||
          request.data.id));

    if (!paymentCode || paymentCode.toString().length < 8) {
      setShowPaymentCodeModal(true);
      setPaymentCodeInput("");
      setPaymentCodeInputError("");
      return;
    }

    fetchBillDetails(request);
  };

  // دالة عند إدخال كود الدفع يدويًا
  const handleManualPaymentCode = async (e) => {
    e.preventDefault();
    if (!paymentCodeInput || paymentCodeInput.length < 8) {
      setPaymentCodeInputError("يرجى إدخال كود دفع صحيح");
      return;
    }

    setShowPaymentCodeModal(false);
    await fetchBillDetails(paymentCodeInput);
  };

  // عند الضغط على الدفع بالفيزا
  const handleVisaClick = () => {
    setShowBillDetailsModal(false);
    setShowPaymentModal(true);
  };

  // معالجة تغيير بيانات الدفع
  const handlePaymentDataChange = (field, value) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // معالجة تنسيق رقم البطاقة
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // معالجة تنسيق تاريخ الانتهاء
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  // معالجة الدفع
  const handlePayment = async (e) => {
    e.preventDefault();
    if (
      !paymentData.cardNumber ||
      !paymentData.expiryDate ||
      !paymentData.cvv
    ) {
      setPaymentError("يرجى إدخال جميع البيانات المطلوبة");
      return;
    }
    try {
      setPaymentLoading(true);
      setPaymentError(null);
      const paymentRequest = {
        PaymentIntentId: billDetails?.PaymentIntentId,
        cardNumber: paymentData.cardNumber.replace(/\s/g, ""),
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
      };
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/License/complete-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              user.token || localStorage.getItem("authToken")
            }`,
          },
          body: JSON.stringify(paymentRequest),
        }
      );
      const result = await response.json();
      if (result.success) {
        setShowPaymentModal(false);
        setPaymentData({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });

        // بدلاً من fetchTrafficRequests، نوجه لصفحة PaymentSuccess
        const paymentData = {
          paymentIntentId: billDetails?.PaymentIntentId,
          clientSecret: billDetails?.clientSecret,
          amount: billDetails?.amount || "غير محدد",
          billNumber: billDetails?.billNumber || "غير محدد",
          paymentCode: billDetails?.paymentCode || "غير محدد",
        };

        const paymentResult = {
          transactionId: billDetails?.PaymentIntentId,
          paymentIntentId: billDetails?.PaymentIntentId,
          status: "succeeded",
          amount: billDetails?.amount || "غير محدد",
          date: new Date().toLocaleDateString("ar-EG"),
        };

        const formData = {
          NID: user?.nationalId || "غير محدد",
          serviceType: "خدمات المرور",
          userData: {
            name: user?.name || "غير محدد",
            nationalId: user?.nationalId || "غير محدد",
          },
        };

        // إنشاء كائن card يحتوي على معلومات الخدمة
        const card = {
          title: "خدمات المرور",
          type: "traffic",
        };

        // التوجيه لصفحة PaymentSuccess مع البيانات
        navigate("/payment-success", {
          state: {
            paymentResult,
            paymentData,
            formData,
            card,
          },
        });
      } else {
        setPaymentError(result.message || "فشل في عملية الدفع");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("حدث خطأ في عملية الدفع. يرجى المحاولة مرة أخرى.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleShowBillDetails = (billDetails) => {
    setBillDetails(billDetails);
    setShowBillDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { variant: "warning", text: "قيد المراجعة", icon: "⏳" },
      pending: { variant: "warning", text: "قيد الانتظار", icon: "⏳" },
      approved: { variant: "primary", text: "قيد التنفيذ", icon: "⚙️" },
      rejected: { variant: "danger", text: "مرفوض", icon: "❌" },
      paid: {
        variant: "primary",
        text: "تم الدفع (سيتم العمل علي الطلب)",
        icon: "💸",
      },
      completed: { variant: "success", text: "مكتمل", icon: "✅" },
      processing: { variant: "primary", text: "قيد المعالجة", icon: "⚙️" },
      ready: { variant: "success", text: "جاهز للاستلام", icon: "📦" },
    };

    const normalizedStatus = status?.toLowerCase();
    const config = statusConfig[normalizedStatus] || {
      variant: "secondary",
      text: status || "غير محدد",
      icon: "📄",
    };

    return (
      <Badge bg={config.variant} className="d-flex align-items-center gap-1">
        <span>{config.icon}</span>
        {config.text}
      </Badge>
    );
  };

  const getDocumentTypeText = (documentType) => {
    const typeMap = {
      BirthCertificate: "شهادة ميلاد",
      BirthCertificateForFisrTime: "شهادة ميلاد مميكنة لأول مرة",
      MarriageCertificate: "قسيمة زواج",
      DivorceCertificate: "قسيمة طلاق",
      "Death Certificate": "شهادة وفاة",
      DeathCertificate: "شهادة وفاة",
    };
    return typeMap[documentType] || documentType;
  };

  const getTrafficServiceText = (serviceCode) => {
    const serviceMap = {
      DRIVING_RENEW: "تجديد رخصة قيادة",
      DRIVING_REPLACE_LOST: "بدل فاقد / تالف للرخص",
      LICENSE_DIGITAL: "طلب رخصة إلكترونية",
    };
    return serviceMap[serviceCode] || serviceCode;
  };

  // تحديد ما إذا كان الطلب يحتاج دفع
  const shouldShowPaymentButton = (status) => {
    const paymentRequiredStatuses = ["approved", "processing", "قيد التنفيذ"];
    return paymentRequiredStatuses.includes(status?.toLowerCase());
  };

  // التحقق من صحة المستخدم
  if (!user) {
    return (
      <div className="container mt-4">
        <Alert variant="warning" className="text-center">
          <FaUser className="mb-2" size={30} />
          <div>يجب تسجيل الدخول لعرض الطلبات</div>
        </Alert>
      </div>
    );
  }

  // حالة التحميل
  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <Spinner animation="border" size="lg" className="mb-3" />
          <div>جاري التحميل...</div>
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          {error}
          <div className="mt-2">
            <Button variant="outline-primary" onClick={fetchCivilRequests}>
              إعادة المحاولة
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <Container className="mt-5 pt-5">
      {/* الصفحة الرئيسية */}
      {activeView === null && (
        <Row className="justify-content-center g-4 mb-5">
          <Col xs={12} className="text-center mb-4">
            <h2 style={{ color: customStyles.secondaryColor }}>
              إدارة الطلبات
            </h2>
            <p className="text-muted">اختر نوع الخدمة للمتابعة</p>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 shadow-sm hover-card"
              style={{
                cursor: "pointer",
                border: "2px solid transparent",
                transition: "all 0.3s ease",
              }}
              onClick={() => setActiveView("orders")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = customStyles.primaryColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaClipboardList
                    size={50}
                    style={{ color: customStyles.primaryColor }}
                  />
                </div>
                <Card.Title className="h5">طلبات الأحوال المدنية</Card.Title>
                <Card.Text className="text-muted">
                  عرض جميع طلبات الأحوال المدنية
                </Card.Text>
                <Badge bg="secondary">{civilRequests.length} طلب</Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 shadow-sm hover-card"
              style={{
                cursor: "pointer",
                border: "2px solid transparent",
                transition: "all 0.3s ease",
              }}
              onClick={() => setActiveView("traffic")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = customStyles.primaryColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaFileAlt
                    size={50}
                    style={{ color: customStyles.primaryColor }}
                  />
                </div>
                <Card.Title className="h5">طلبات خدمات المرور</Card.Title>
                <Card.Text className="text-muted">
                  عرض جميع طلبات خدمات المرور
                </Card.Text>
                <Badge bg="secondary">{trafficRequests.length} طلب</Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 shadow-sm hover-card"
              style={{
                cursor: "pointer",
                border: "2px solid transparent",
                transition: "all 0.3s ease",
              }}
              onClick={() => setActiveView("track")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor =
                  customStyles.secondaryColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaSearch
                    size={50}
                    style={{ color: customStyles.secondaryColor }}
                  />
                </div>
                <Card.Title className="h5">متابعة الطلبات</Card.Title>
                <Card.Text className="text-muted">
                  تتبع حالة طلباتك الحالية
                </Card.Text>
                <Badge bg="info">تتبع سريع</Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* صفحة طلبات الأحوال المدنية */}
      {activeView === "orders" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button
              variant="outline-secondary"
              onClick={() => setActiveView(null)}
              className="d-flex align-items-center gap-2"
            >
              <FaArrowRightLong />
              رجوع
            </Button>
            <h4 className="mb-0" style={{ color: customStyles.secondaryColor }}>
              طلبات الأحوال المدنية
            </h4>
          </div>

          <Card className="shadow-sm">
            <Card.Header
              style={{
                backgroundColor: customStyles.primaryColor,
                color: "white",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-2">
                <FaClipboardList />
                <span>جميع طلبات الأحوال المدنية</span>
              </div>
              <Button
                variant="outline-light"
                size="sm"
                onClick={fetchCivilRequests}
              >
                تحديث
              </Button>
            </Card.Header>
            <Card.Body>
              {civilRequests.length === 0 ? (
                <Alert variant="info" className="text-center">
                  <FaClipboardList size={30} className="mb-2" />
                  <div>لا توجد طلبات للخدمات المدنية</div>
                </Alert>
              ) : (
                <Row>
                  {civilRequests.map((request, index) => (
                    <Col
                      key={request.id || index}
                      xs={12}
                      md={6}
                      lg={4}
                      className="mb-3"
                    >
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Header className="bg-light">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6
                              className="mb-0"
                              style={{ color: customStyles.primaryColor }}
                            >
                              {getDocumentTypeText(request.documentType)}
                            </h6>
                            {getStatusBadge(request.status)}
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <div className="mb-3">
                            {request.referenceNumber && (
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <FaIdCard className="text-muted" />
                                <small>
                                  <strong>الرقم المرجعي:</strong>{" "}
                                  {request.referenceNumber}
                                </small>
                              </div>
                            )}
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FaUser className="text-muted" />
                              <small>
                                <strong>الاسم:</strong>{" "}
                                {request.ownerName || "غير محدد"}
                              </small>
                            </div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FaIdCard className="text-muted" />
                              <small>
                                <strong>الرقم القومي:</strong>{" "}
                                {request.ownerNID || "غير محدد"}
                              </small>
                            </div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FaMapMarkerAlt className="text-muted" />
                              <small>
                                <strong>العنوان:</strong>{" "}
                                {request.governorate || "غير محدد"},{" "}
                                {request.city || "غير محدد"}
                              </small>
                            </div>
                            {request.createdAt && (
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <FaCalendarAlt className="text-muted" />
                                <small>
                                  <strong>تاريخ الطلب:</strong>{" "}
                                  {new Date(
                                    request.createdAt
                                  ).toLocaleDateString("ar-EG")}
                                </small>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline-primary"
                            style={{
                              borderColor: customStyles.primaryColor,
                              color: customStyles.primaryColor,
                            }}
                            size="sm"
                            onClick={() =>
                              trackRequest(
                                request.id || request.referenceNumber
                              )
                            }
                            disabled={trackingLoading}
                            className="w-100"
                          >
                            <FaEye className="me-1" />
                            {trackingLoading ? "جاري التتبع..." : "تتبع الطلب"}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </>
      )}

      {activeView === "traffic" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button
              variant="outline-secondary"
              onClick={() => setActiveView(null)}
              className="d-flex align-items-center gap-2"
            >
              <FaArrowRightLong />
              رجوع
            </Button>
            <h4 className="mb-0" style={{ color: customStyles.secondaryColor }}>
              طلبات خدمات المرور
            </h4>
          </div>
          <Card className="shadow-sm">
            <Card.Header
              style={{
                backgroundColor: customStyles.secondaryColor,
                color: "white",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-2">
                <FaFileAlt />
                <span>جميع طلبات خدمات المرور</span>
              </div>
              <Button
                variant="outline-light"
                size="sm"
                onClick={fetchTrafficRequests}
              >
                تحديث
              </Button>
            </Card.Header>
            <Card.Body>
              {trafficLoading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <div className="mt-2">جاري التحميل...</div>
                </div>
              ) : trafficError ? (
                <Alert variant="danger">
                  {trafficError}
                  <div className="mt-2">
                    <Button
                      variant="outline-primary"
                      onClick={fetchTrafficRequests}
                    >
                      إعادة المحاولة
                    </Button>
                  </div>
                </Alert>
              ) : trafficRequests.length === 0 ? (
                <Alert variant="info" className="text-center">
                  <FaFileAlt size={30} className="mb-2" />
                  <div>لا توجد طلبات لخدمات المرور</div>
                </Alert>
              ) : (
                <Row>
                  {trafficRequests.map((request, index) => (
                    <Col
                      key={request.id || index}
                      xs={12}
                      md={6}
                      lg={4}
                      className="mb-3"
                    >
                      <OrderCard
                        order={request}
                        onDetailsClick={handleShowBillDetails}
                        onTrackClick={trackTrafficRequest}
                        onInquireDetails={handleInquireDetails}
                        trackingLoading={trackingLoading}
                        billLoading={billLoading}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </>
      )}
      {activeView === "track" && (
        <>
          <Button
            className="btn nav-btn btn-outline-secondary py-1 mb-3"
            onClick={() => setActiveView(null)}
          >
            <FaArrowRightLong size={20} />
            رجوع
          </Button>
          <Card className="mb-4">
            <Card.Header>
              <h5
                className="mb-0"
                style={{ color: customStyles.secondaryColor }}
              >
                <FaSearch className="me-2" />
                متابعة طلب بالرقم المرجعي
              </h5>
            </Card.Header>
            <Card.Body>
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link
                    active={trackingType === "auto"}
                    onClick={() => setTrackingType("auto")}
                  >
                    تتبع تلقائي
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={trackingType === "civil"}
                    onClick={() => setTrackingType("civil")}
                  >
                    أحوال مدنية
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={trackingType === "traffic"}
                    onClick={() => setTrackingType("traffic")}
                  >
                    خدمات المرور
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Form onSubmit={handleTrackByReference}>
                <Row>
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>
                        {trackingType === "auto" && "الرقم المرجعي للطلب"}
                        {trackingType === "civil" &&
                          "الرقم المرجعي لطلب الأحوال المدنية"}
                        {trackingType === "traffic" && "رقم طلب خدمات المرور"}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder={
                          trackingType === "auto"
                            ? "أدخل الرقم المرجعي للطلب"
                            : trackingType === "civil"
                            ? "أدخل الرقم المرجعي لطلب الأحوال المدنية"
                            : "أدخل رقم طلب خدمات المرور"
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="d-flex align-items-end">
                    <Button
                      type="submit"
                      variant="primary"
                      style={{
                        backgroundColor: customStyles.primaryColor,
                        borderColor: customStyles.primaryColor,
                      }}
                      disabled={trackingLoading}
                      className="w-100"
                    >
                      {trackingLoading ? "جاري البحث..." : "تتبع الطلب"}
                    </Button>
                  </Col>
                </Row>
              </Form>
              {trackingError && (
                <Alert variant="danger" className="mt-3">
                  {trackingError}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </>
      )}

      {/* Modal لعرض تفاصيل متابعة الطلب */}
      <Modal
        show={showTrackingModal}
        onHide={() => setShowTrackingModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title style={{ color: customStyles.secondaryColor }}>
            <FaEye className="me-2" />
            تفاصيل متابعة الطلب
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trackingResult && (
            <div>
              {/* حالة الطلب */}
              <div
                className="mb-4 p-3 rounded"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">حالة الطلب</h5>
                  {getStatusBadge(
                    trackingResult.status || trackingResult.data?.status
                  )}
                </div>
              </div>

              {/* تفاصيل الطلب */}
              <div className="request-details">
                <h5
                  className="mb-3"
                  style={{ color: customStyles.secondaryColor }}
                >
                  تفاصيل الطلب
                </h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="info-card p-3 rounded border mb-3">
                      <h6 className="text-muted mb-2">اسم الخدمة</h6>
                      <p className="mb-0 fw-bold">
                        {getTrafficServiceText(
                          trackingResult.serviceCode ||
                            trackingResult.data?.serviceCode
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-card p-3 rounded border mb-3">
                      <h6 className="text-muted mb-2">اسم مقدم الطلب</h6>
                      <p className="mb-0 fw-bold">
                        {trackingResult.applicantName ||
                          trackingResult.data?.applicantName ||
                          "غير محدد"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-card p-3 rounded border mb-3">
                      <h6 className="text-muted mb-2">الرقم القومي</h6>
                      <p className="mb-0 fw-bold" dir="ltr">
                        {trackingResult.applicantNID ||
                          trackingResult.data?.applicantNID ||
                          "غير محدد"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-card p-3 rounded border mb-3">
                      <h6 className="text-muted mb-2">تاريخ الطلب</h6>
                      <p className="mb-0 fw-bold">
                        {trackingResult.createdAt
                          ? new Date(
                              trackingResult.createdAt
                            ).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : trackingResult.data?.createdAt
                          ? new Date(
                              trackingResult.data.createdAt
                            ).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "غير محدد"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* بيانات إضافية */}
                {(trackingResult.extraFields?.originalLicenseNumber ||
                  trackingResult.data?.extraFields?.originalLicenseNumber ||
                  trackingResult.extraFields?.issueDate ||
                  trackingResult.data?.extraFields?.issueDate ||
                  trackingResult.extraFields?.expiryDate ||
                  trackingResult.data?.extraFields?.expiryDate) && (
                  <div className="mt-4">
                    <h6
                      style={{ color: customStyles.secondaryColor }}
                      className="mb-3"
                    >
                      بيانات الرخصة
                    </h6>
                    <div className="row">
                      {(trackingResult.extraFields?.originalLicenseNumber ||
                        trackingResult.data?.extraFields
                          ?.originalLicenseNumber) && (
                        <div className="col-md-6">
                          <div className="info-card p-3 rounded border mb-3">
                            <h6 className="text-muted mb-2">
                              رقم الرخصة الأصلية
                            </h6>
                            <p className="mb-0 fw-bold" dir="ltr">
                              {trackingResult.extraFields
                                ?.originalLicenseNumber ||
                                trackingResult.data?.extraFields
                                  ?.originalLicenseNumber}
                            </p>
                          </div>
                        </div>
                      )}
                      {(trackingResult.extraFields?.issueDate ||
                        trackingResult.data?.extraFields?.issueDate) && (
                        <div className="col-md-6">
                          <div className="info-card p-3 rounded border mb-3">
                            <h6 className="text-muted mb-2">تاريخ الإصدار</h6>
                            <p className="mb-0 fw-bold">
                              {trackingResult.extraFields?.issueDate ||
                                trackingResult.data?.extraFields?.issueDate}
                            </p>
                          </div>
                        </div>
                      )}
                      {(trackingResult.extraFields?.expiryDate ||
                        trackingResult.data?.extraFields?.expiryDate) && (
                        <div className="col-md-6">
                          <div className="info-card p-3 rounded border mb-3">
                            <h6 className="text-muted mb-2">تاريخ الانتهاء</h6>
                            <p className="mb-0 fw-bold">
                              {trackingResult.extraFields?.expiryDate ||
                                trackingResult.data?.extraFields?.expiryDate}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ملاحظات */}
                {(trackingResult.notes || trackingResult.data?.notes) && (
                  <div className="mt-4">
                    <h6
                      style={{ color: customStyles.secondaryColor }}
                      className="mb-3"
                    >
                      ملاحظات
                    </h6>
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      {trackingResult.notes || trackingResult.data?.notes}
                    </div>
                  </div>
                )}
                {/* زر الدفع إذا كان الطلب قيد التنفيذ */}
                {shouldShowPaymentButton(
                  trackingResult.status || trackingResult.data?.status
                ) && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline-success"
                      size="lg"
                      onClick={() => {
                        const paymentCode =
                          trackingResult.paymentCode ||
                          trackingResult.referenceNumber ||
                          trackingResult.id ||
                          (trackingResult.data &&
                            (trackingResult.data.paymentCode ||
                              trackingResult.data.referenceNumber ||
                              trackingResult.data.id));
                        if (!paymentCode || paymentCode.toString().length < 8) {
                          setShowPaymentCodeModal(true);
                          setPaymentCodeInput("");
                          setPaymentCodeInputError("");
                          return;
                        }
                        fetchBillDetails({
                          paymentCode: paymentCode,
                          id: trackingResult.id,
                        });
                      }}
                      disabled={billLoading}
                    >
                      <FaReceipt className="me-1" />
                      {billLoading
                        ? "جاري التحميل..."
                        : "استعلام عن تفاصيل الفاتورة والدفع"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button
            variant="secondary"
            onClick={() => setShowTrackingModal(false)}
            className="px-4"
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal تفاصيل الفاتورة */}
      <Modal
        show={showBillDetailsModal}
        onHide={() => setShowBillDetailsModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title style={{ color: customStyles.primaryColor }}>
            تفاصيل الفاتورة
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {billDetails ? (
            <div className="text-center">
              <div className="mb-4">
                <div className="alert alert-info">
                  <div className="mb-2">
                    <strong>رقم الفاتورة:</strong>{" "}
                    {billDetails.billNumber || "-"}
                  </div>
                  <div className="mb-2">
                    <strong>كود الدفع:</strong> {billDetails.paymentCode || "-"}
                  </div>
                  <div className="mb-2">
                    <strong>المبلغ المستحق:</strong>{" "}
                    <span
                      style={{
                        color: customStyles.secondaryColor,
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                      }}
                    >
                      {billDetails.amount || "-"} جنيه
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="success"
                style={{ minWidth: 180 }}
                onClick={handleVisaClick}
              >
                الدفع بالفيزا
              </Button>
            </div>
          ) : (
            <div className="text-center">جاري تحميل تفاصيل الفاتورة...</div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button
            variant="secondary"
            onClick={() => setShowBillDetailsModal(false)}
            className="px-4"
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal الدفع */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title style={{ color: customStyles.primaryColor }}>
            الدفع بالفيزا
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ملخص الفاتورة */}
          {billDetails && (
            <div className="mb-4 p-3 border rounded bg-light">
              <div className="row mb-2">
                <div className="col-6 text-end text-muted">رقم الفاتورة</div>
                <div className="col-6 text-start">
                  {billDetails.billNumber || "-"}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-end text-muted">كود الدفع</div>
                <div className="col-6 text-start">
                  {billDetails.paymentCode || "-"}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <div
                    className="bg-primary text-white text-center rounded py-2 fw-bold"
                    style={{ fontSize: "1.2rem" }}
                  >
                    المبلغ المستحق <br />
                    <span style={{ fontSize: "1.5rem" }}>
                      {billDetails.amount || "-"} جنيه
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* نموذج الدفع */}
          <div className="p-3 border rounded bg-white mb-2">
            <div
              className="mb-3 fw-bold text-end"
              style={{ color: customStyles.secondaryColor }}
            >
              بيانات البطاقة الائتمانية
            </div>
            <Form onSubmit={handlePayment} autoComplete="off">
              {/* رقم البطاقة */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  تفاصيل البطاقة <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  maxLength={19}
                  value={paymentData.cardNumber}
                  onChange={(e) =>
                    handlePaymentDataChange(
                      "cardNumber",
                      formatCardNumber(e.target.value)
                    )
                  }
                  placeholder="رقم البطاقة"
                  required
                  autoComplete="off"
                />
              </Form.Group>
              {/* تاريخ الانتهاء و CVC */}
              <div className="row mb-3">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="fw-bold">سنة / شهر</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength={5}
                      value={paymentData.expiryDate}
                      onChange={(e) =>
                        handlePaymentDataChange(
                          "expiryDate",
                          formatExpiryDate(e.target.value)
                        )
                      }
                      placeholder="MM/YY"
                      required
                      autoComplete="off"
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="fw-bold">CVC</Form.Label>
                    <Form.Control
                      type="password"
                      maxLength={4}
                      value={paymentData.cvv}
                      onChange={(e) =>
                        handlePaymentDataChange("cvv", e.target.value)
                      }
                      placeholder="CVC"
                      required
                      autoComplete="off"
                    />
                  </Form.Group>
                </div>
              </div>
              {/* Hidden PaymentIntentId */}
              <input
                type="hidden"
                value={billDetails?.PaymentIntentId || ""}
                readOnly
              />
              {paymentError && <Alert variant="danger">{paymentError}</Alert>}
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-bold fs-5"
                disabled={paymentLoading}
                style={{
                  background:
                    "linear-gradient(90deg, #3377A9 0%, #2d485c 100%)",
                  border: "none",
                }}
              >
                {paymentLoading ? "جاري الدفع..." : "ادفع الآن"}
              </Button>
              <div
                className="text-muted text-center mt-2"
                style={{ fontSize: "0.95rem" }}
              >
                معاملاتك محمية بتشفير SSL ويتم معالجتها بأمان تام
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
            className="px-4"
          >
            إلغاء والعودة
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal إدخال كود الدفع يدويًا */}
      <Modal
        show={showPaymentCodeModal}
        onHide={() => setShowPaymentCodeModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title style={{ color: customStyles.primaryColor }}>
            إدخال كود الدفع
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleManualPaymentCode}>
            <Form.Group className="mb-3">
              <Form.Label>يرجى إدخال كود الدفع الخاص بك</Form.Label>
              <Form.Control
                type="text"
                value={paymentCodeInput}
                onChange={(e) => setPaymentCodeInput(e.target.value)}
                placeholder="مثال: PAY-20250712-1D6CF294"
                required
              />
              {paymentCodeInputError && (
                <div className="text-danger mt-2">{paymentCodeInputError}</div>
              )}
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              عرض الفاتورة
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Orders;
