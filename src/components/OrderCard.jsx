import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaEye, FaReceipt } from "react-icons/fa";

const OrderCard = ({
  order,
  onDetailsClick,
  onTrackClick,
  onInquireDetails,
  trackingLoading,
  billLoading,
}) => {
  // تحديد ما إذا كان الطلب يحتاج دفع
  const shouldShowPaymentButton = (status) => {
    const paymentRequiredStatuses = ["approved", "processing", "قيد التنفيذ"];
    return paymentRequiredStatuses.includes(status?.toLowerCase());
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { variant: "warning", text: "قيد المراجعة", icon: "⏳" },
      pending: { variant: "warning", text: "قيد الانتظار", icon: "⏳" },
      approved: { variant: "primary", text: "قيد التنفيذ", icon: "⚙️" },
      rejected: { variant: "danger", text: "مرفوض", icon: "❌" },
      completed: { variant: "success", text: "مكتمل", icon: "✅" },
      processing: { variant: "primary", text: "قيد المعالجة", icon: "⚙️" },
      ready: { variant: "success", text: "جاهز للاستلام", icon: "📦" },
    };

    const normalizedStatus = status?.toLowerCase();
    const config = statusConfig[normalizedStatus] || {
      variant: "secondary",
      text: status,
      icon: "📄",
    };
    return (
      <Badge bg={config.variant} className="d-flex align-items-center gap-1">
        <span>{config.icon}</span>
        {config.text}
      </Badge>
    );
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Header className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ color: "#2d485c" }}>
            {order.title || order.documentType || order.serviceCode}
          </h6>
          {getStatusBadge(order.status)}
        </div>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          {order.id && (
            <div className="d-flex align-items-center gap-2 mb-2">
              <small>
                <strong>رقم الطلب:</strong> {order.id}
              </small>
            </div>
          )}
          <div className="d-flex align-items-center gap-2 mb-2">
            <small>
              <strong>الاسم:</strong> {order.ownerName || order.applicantName}
            </small>
          </div>
          {order.createdAt && (
            <div className="d-flex align-items-center gap-2 mb-2">
              <small>
                <strong>تاريخ الطلب:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString("ar-EG")}
              </small>
            </div>
          )}
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onTrackClick && onTrackClick(order.id)}
            disabled={trackingLoading}
            className="flex-grow-1"
          >
            <FaEye className="me-1" />
            {trackingLoading ? "جاري التتبع..." : "تتبع الطلب"}
          </Button>
          {shouldShowPaymentButton(order.status) && onInquireDetails && (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => onInquireDetails(order)}
              disabled={billLoading}
              className="flex-grow-1"
            >
              <FaReceipt className="me-1" />
              {billLoading ? "جاري التحميل..." : "استعلام عن التفاصيل"}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
