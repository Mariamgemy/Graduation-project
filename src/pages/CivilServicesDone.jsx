import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Badge, Card, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  Copy,
  Download,
  ArrowRight,
  Sparkles,
  Share2,
  Calendar,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import SuccessAnimation from "../components/SuccessAnimation";
import Toast from "../components/Toast";
import "../Css/CivilServicesDone.css";

function CivilServicesDone() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // استقبال البيانات من الصفحة السابقة
  const { serviceType, documentType, requestId, responseData } =
    location.state || {};

  // للتأكد من وصول البيانات
  console.log("Location state:", location.state);
  console.log("Received data:", {
    serviceType,
    documentType,
    requestId,
    responseData,
  });

  // بيانات الطلب
  const orderData = {
    serviceType: serviceType || "الخدمات المدنية",
    documentType: documentType || "شهادة ميلاد",
    requestId:
      requestId ||
      responseData?.requestId ||
      responseData?.id ||
      "undefined",
    submissionDate: new Date().toLocaleDateString("ar-EG"),
    submissionTime: new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    estimatedCompletion: "3-5 أيام عمل",
    status: "قيد المراجعة",
    priority: "عادي",
    department: "الأحوال المدنية",
  };

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);

    // تحديث الوقت كل ثانية
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setShowToast(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(orderData.requestId);
      setCopied(true);
      showToastMessage("تم نسخ رقم الطلب بنجاح!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToastMessage("فشل في نسخ رقم الطلب", "error");
    }
  };

  const downloadReceipt = () => {
    const receiptContent = `
إيصال تقديم الطلب
==================

رقم الطلب: ${orderData.requestId}
نوع الخدمة: ${orderData.serviceType}
نوع الوثيقة: ${orderData.documentType}
تاريخ التقديم: ${orderData.submissionDate}
وقت التقديم: ${orderData.submissionTime}
المدة المتوقعة: ${orderData.estimatedCompletion}
حالة الطلب: ${orderData.status}
الأولوية: ${orderData.priority}
الإدارة المختصة: ${orderData.department}

تم إنشاء هذا الإيصال في: ${currentTime.toLocaleString("ar-EG")}

شكراً لاستخدام خدماتنا
    `;

    const element = document.createElement("a");
    const file = new Blob([receiptContent], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = `receipt-${orderData.requestId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showToastMessage("تم تحميل الإيصال بنجاح!");
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
          `${shareData.text}\nرقم الطلب: ${orderData.requestId}`
        );
        showToastMessage("تم نسخ تفاصيل الطلب للمشاركة!");
      }
    } catch (err) {
      showToastMessage("فشل في مشاركة الطلب", "error");
    }
  };

  const trackOrder = () => {
    showToastMessage("سيتم توجيهك لصفحة متابعة الطلب...", "info");
    // محاكاة التوجيه لصفحة المتابعة
    setTimeout(() => {
      window.open("#/track-order", "_blank");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Toast للإشعارات */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* خلفية متحركة محسنة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-6000"></div>
      </div>

      {/* كونفيتي متحرك محسن */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${
                  ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][i % 5]
                }, ${
                  ["#1D4ED8", "#059669", "#D97706", "#DC2626", "#7C3AED"][i % 5]
                })`,
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 720,
                scale: [0, 1, 0.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <Container className="relative z-10 py-8 min-h-screen d-flex align-items-center justify-content-center">
        <motion.div
          className="w-100"
          style={{ maxWidth: "1200px" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* أيقونة النجاح المحسنة */}
          <motion.div
            className="text-center mb-5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              type: "spring",
              bounce: 0.4,
            }}
          >
            <SuccessAnimation />
          </motion.div>

          {/* العنوان الرئيسي */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="display-4 fw-bold text-color mb-4 d-flex align-items-center justify-content-center gap-3 flex-wrap">
              تم تقديم الطلب بنجاح
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              >
                <Sparkles className="w-8 h-8 text-warning" />
              </motion.div>
            </h1>
            <p
              className="lead text-muted mx-auto text-clor"
              style={{ maxWidth: "600px" }}
            >
              شكراً لك! تم استلام طلبك وسيتم مراجعته في أقرب وقت ممكن. ستصلك
              تحديثات دورية حول حالة طلبك.
            </p>
          </motion.div>

          {/* معلومات سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Row className="mb-5 g-4">
              <Col md={4}>
                <Card className="text-center bg-white bg-opacity-80 border-0 shadow-lg h-100">
                  <Card.Body className="p-4">
                    <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-muted small">تاريخ التقديم</p>
                    <p className="fw-bold text-dark">
                      {orderData.submissionDate}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center bg-white bg-opacity-80 border-0 shadow-lg h-100">
                  <Card.Body className="p-4">
                    <Clock className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-muted small">وقت التقديم</p>
                    <p className="fw-bold text-dark">
                      {orderData.submissionTime}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center bg-white bg-opacity-80 border-0 shadow-lg h-100">
                  <Card.Body className="p-4">
                    <Sparkles className="w-8 h-8 text-purple mx-auto mb-2" />
                    <p className="text-muted small">الأولوية</p>
                    <Badge bg="purple" className="px-3 py-1">
                      {orderData.priority}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>

          {/* بطاقة تفاصيل الطلب المحسنة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Card className="mb-4 shadow-lg border-0 bg-white bg-opacity-90">
              <Card.Header className="bg-gradient text-white text-center">
                <h5 className="mb-0 d-flex align-items-center justify-content-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  تفاصيل الطلب
                  <Sparkles className="w-5 h-5" />
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-4">
                  <Col md={6} lg={4}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-medium">
                        نوع الخدمة
                      </label>
                      <Badge bg="primary" className="px-3 py-1">
                        {orderData.serviceType}
                      </Badge>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-medium">
                        نوع الوثيقة
                      </label>
                      <Badge bg="success" className="px-3 py-1">
                        {orderData.documentType}
                      </Badge>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-medium">
                        الإدارة المختصة
                      </label>
                      <p className="text-dark fw-medium mb-0">
                        {orderData.department}
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-medium">
                        المدة المتوقعة
                      </label>
                      <p className="text-dark fw-medium mb-0">
                        {orderData.estimatedCompletion}
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-medium">
                        حالة الطلب
                      </label>
                      <Badge bg="warning" text="dark" className="px-3 py-1">
                        {orderData.status}
                      </Badge>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-medium">
                        الوقت الحالي
                      </label>
                      <p className="text-dark fw-medium mb-0 font-monospace">
                        {currentTime.toLocaleTimeString("ar-EG")}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>

          {/* بطاقة رقم الطلب المحسنة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Card className="mb-4 shadow-lg border-0 bg-white bg-opacity-90">
              <Card.Header>
                <h6 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                  <Copy className="w-4 h-4" />
                  رقم الطلب للمتابعة
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="bg-light rounded p-3 border border-2 border-dashed">
                  <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                    <code className="fs-6 fw-bold text-dark flex-grow-1 text-break">
                      {orderData.requestId}
                    </code>
                    <div className="d-flex gap-2 flex-shrink-0">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline-primary"
                        size="sm"
                        className="d-flex align-items-center gap-2"
                      >
                        <Copy className="w-3 h-3" />
                        {copied ? "تم النسخ!" : "نسخ"}
                      </Button>
                      <Button
                        onClick={shareOrder}
                        variant="outline-success"
                        size="sm"
                        className="d-flex align-items-center gap-2"
                      >
                        <Share2 className="w-3 h-3" />
                        مشاركة
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-muted small mt-3 mb-0">
                  احتفظ برقم الطلب هذا لمتابعة حالة طلبك أو تواصل مع خدمة
                  العملاء
                </p>
              </Card.Body>
            </Card>
          </motion.div>

          {/* أزرار الإجراءات المحسنة */}
          <motion.div
            className="d-flex flex-column flex-sm-row gap-3 justify-content-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Button
              onClick={downloadReceipt}
              variant="primary"
              size="lg"
              className="d-flex align-items-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              تحميل الإيصال
            </Button>
            <Button
              onClick={trackOrder}
              variant="outline-success"
              size="lg"
              className="d-flex align-items-center gap-2 shadow"
            >
              متابعة الطلب
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* رسالة إضافية محسنة */}
          <motion.div
            className="text-center mt-5 bg-white bg-opacity-60 rounded p-4 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <p className="text-dark fs-5 mb-2">
              سيتم إرسال تحديثات حول حالة طلبك عبر:
            </p>
            <div className="d-flex justify-content-center gap-4 text-muted small">
              <span>📧 البريد الإلكتروني</span>
              <span>📱 الرسائل النصية</span>
              <span>🔔 الإشعارات</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export default CivilServicesDone;
