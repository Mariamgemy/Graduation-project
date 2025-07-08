import React, { useState, useEffect } from "react";
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
} from "react-bootstrap";
import { FaClipboardList, FaSearch, FaEye, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css/orders.css";
import { useAuth } from "../context/AuthContext";
import { civilService } from "../services/civilService";

const Orders = () => {
  const { user } = useAuth();
  const [civilRequests, setCivilRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // حالات متابعة الطلب
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const [activeView, setActiveView] = useState(null); // null, 'orders', 'track'

  useEffect(() => {
    if (user) {
      fetchCivilRequests();
    }
  }, [user]);

  // جلب جميع الطلبات
  const fetchCivilRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // استخدام الـ API الجديد
      const response = await fetch(
        `https://smartgovernment-fpcxb3cmfef3e6c0.uaenorth-01.azurewebsites.net/api/CivilDocuments/my-requests?userNID=${
          user.nationalId || user.nid
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // إضافة التوكن إذا كان مطلوب
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
      // Sort descending by createdAt
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
        `https://smartgovernment-fpcxb3cmfef3e6c0.uaenorth-01.azurewebsites.net/api/CivilDocuments/request/${requestId}/status`,
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

  // متابعة طلب بالرقم المرجعي
  const handleTrackByReference = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setTrackingError("يرجى إدخال الرقم المرجعي للطلب");
      return;
    }
    await trackRequest(trackingId);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", text: "قيد الانتظار" },
      approved: { variant: "success", text: "تمت الموافقة" },
      rejected: { variant: "danger", text: "مرفوض" },
      completed: { variant: "info", text: "مكتمل" },
      processing: { variant: "primary", text: "قيد المعالجة" },
      ready: { variant: "success", text: "جاهز للاستلام" },
    };

    const config = statusConfig[status] || {
      variant: "secondary",
      text: status,
    };
    return <Badge bg={config.variant}>{config.text}</Badge>;
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

  if (!user) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">يجب تسجيل الدخول لعرض الطلبات</Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

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
      {activeView === null && (
        <Row className="justify-content-center g-4 mb-5">
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 order-card"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveView("orders")}
            >
              <Card.Body className="text-center">
                <FaClipboardList size={50} className="mb-3 text-success" />
                <Card.Title>طلباتي</Card.Title>
                <Card.Text>عرض جميع الطلبات السابقة والحالية</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 order-card"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveView("track")}
            >
              <Card.Body className="text-center">
                <FaSearch size={50} className="mb-3 text-success" />
                <Card.Title>متابعة الطلبات</Card.Title>
                <Card.Text>تتبع حالة طلباتك الحالية</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {activeView === "orders" && (
        <>
          <Button
            variant="outline-secondary"
            className="mb-3"
            onClick={() => setActiveView(null)}
          >
            رجوع
          </Button>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaClipboardList className="me-2" />
                جميع طلبات الأحوال المدنية
              </h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={fetchCivilRequests}
              >
                تحديث
              </Button>
            </Card.Header>
            <Card.Body>
              {civilRequests.length === 0 ? (
                <Alert variant="info">لا توجد طلبات للخدمات المدنية</Alert>
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
                      <Card>
                        <Card.Header>
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">
                              {getDocumentTypeText(request.documentType)}
                            </h6>
                            {getStatusBadge(request.status)}
                          </div>
                        </Card.Header>
                        <Card.Body>
                          {request.referenceNumber && (
                            <p>
                              <strong>الرقم المرجعي:</strong>{" "}
                              {request.referenceNumber}
                            </p>
                          )}
                          <p>
                            <strong>اسم صاحب الوثيقة:</strong>{" "}
                            {request.ownerName}
                          </p>
                          <p>
                            <strong>الرقم القومي:</strong> {request.ownerNID}
                          </p>
                          <p>
                            <strong>اسم الأم:</strong> {request.ownerMotherName}
                          </p>
                          <p>
                            <strong>عدد النسخ:</strong> {request.copiesCount}
                          </p>
                          <p>
                            <strong>المحافظة:</strong> {request.governorate}
                          </p>
                          <p>
                            <strong>المدينة:</strong> {request.city}
                          </p>
                          <p>
                            <strong>الحي:</strong> {request.district}
                          </p>
                          {request.extraFields?.partnerName && (
                            <p>
                              <strong>اسم الزوج/الزوجة:</strong>{" "}
                              {request.extraFields.partnerName}
                            </p>
                          )}
                          {request.extraFields?.gender && (
                            <p>
                              <strong>النوع:</strong>{" "}
                              {request.extraFields.gender === "male"
                                ? "ذكر"
                                : "أنثى"}
                            </p>
                          )}
                          {request.createdAt && (
                            <p>
                              <strong>تاريخ الطلب:</strong>{" "}
                              {new Date(request.createdAt).toLocaleDateString(
                                "ar-EG"
                              )}
                            </p>
                          )}
                          {request.estimatedDeliveryDate && (
                            <p>
                              <strong>تاريخ التسليم المتوقع:</strong>{" "}
                              {new Date(
                                request.estimatedDeliveryDate
                              ).toLocaleDateString("ar-EG")}
                            </p>
                          )}
                          <div className="mt-3">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                trackRequest(
                                  request.id || request.referenceNumber
                                )
                              }
                              disabled={trackingLoading}
                            >
                              <FaEye className="me-1" />
                              تتبع الطلب
                            </Button>
                          </div>
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
      {activeView === "track" && (
        <>
          <Button
            variant="outline-secondary"
            className="mb-3"
            onClick={() => setActiveView(null)}
          >
            رجوع
          </Button>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaSearch className="me-2" />
                متابعة طلب بالرقم المرجعي
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleTrackByReference}>
                <Row>
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>الرقم المرجعي للطلب</Form.Label>
                      <Form.Control
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="أدخل الرقم المرجعي للطلب"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="d-flex align-items-end">
                    <Button
                      type="submit"
                      variant="primary"
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
      >
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل متابعة الطلب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trackingResult && (
            <div>
              <div className="mb-3">
                <strong>حالة الطلب:</strong>{" "}
                {getStatusBadge(trackingResult.status)}
              </div>
              {trackingResult.documentType && (
                <p>
                  <strong>نوع الوثيقة:</strong>{" "}
                  {getDocumentTypeText(trackingResult.documentType)}
                </p>
              )}
              {trackingResult.ownerName && (
                <p>
                  <strong>اسم صاحب الوثيقة:</strong> {trackingResult.ownerName}
                </p>
              )}
              {trackingResult.referenceNumber && (
                <p>
                  <strong>الرقم المرجعي:</strong>{" "}
                  {trackingResult.referenceNumber}
                </p>
              )}
              {trackingResult.createdAt && (
                <p>
                  <strong>تاريخ الطلب:</strong>{" "}
                  {new Date(trackingResult.createdAt).toLocaleDateString(
                    "ar-EG"
                  )}
                </p>
              )}
              {trackingResult.estimatedDeliveryDate && (
                <p>
                  <strong>تاريخ التسليم المتوقع:</strong>{" "}
                  {new Date(
                    trackingResult.estimatedDeliveryDate
                  ).toLocaleDateString("ar-EG")}
                </p>
              )}
              {trackingResult.notes && (
                <div className="mt-3">
                  <strong>ملاحظات:</strong>
                  <div className="bg-light p-3 rounded mt-2">
                    {trackingResult.notes}
                  </div>
                </div>
              )}
              {trackingResult.statusHistory &&
                trackingResult.statusHistory.length > 0 && (
                  <div className="mt-3">
                    <strong>تاريخ الحالات:</strong>
                    <div className="mt-2">
                      {trackingResult.statusHistory.map((history, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center p-2 border-bottom"
                        >
                          <span>{getStatusBadge(history.status)}</span>
                          <small className="text-muted">
                            {new Date(history.timestamp).toLocaleDateString(
                              "ar-EG"
                            )}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTrackingModal(false)}
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Orders;
