import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Badge } from "react-bootstrap";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css/orders.css";
import { useAuth } from "../context/AuthContext";
import { civilService } from "../services/civilService";

const Orders = () => {
  const { user } = useAuth();
  const [civilRequests, setCivilRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCivilRequests();
    }
  }, [user]);

  const fetchCivilRequests = async () => {
    try {
      setLoading(true);
      const requests = await civilService.getUserCivilRequests();
      setCivilRequests(requests);
    } catch (error) {
      console.error("Error fetching civil requests:", error);
      setError("حدث خطأ في جلب الطلبات");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", text: "قيد الانتظار" },
      approved: { variant: "success", text: "تمت الموافقة" },
      rejected: { variant: "danger", text: "مرفوض" },
      completed: { variant: "info", text: "مكتمل" },
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
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <Container className="mt-5 pt-5">
      <h2 className="text-center mb-4">طلباتي</h2>
      <Row className="justify-content-center g-4">
        {/* كارت الطلبات */}
        <Col xs={12} md={6} lg={4}>
          <Link to="/my-orders" className="text-decoration-none">
            <Card className="h-100 order-card">
              <Card.Body className="text-center">
                <FaClipboardList size={50} className="mb-3 text-success" />
                <Card.Title>طلباتي</Card.Title>
                <Card.Text>عرض جميع الطلبات السابقة والحالية</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        {/* كارت متابعة الطلبات */}
        <Col xs={12} md={6} lg={4}>
          <Link to="/track-orders" className="text-decoration-none">
            <Card className="h-100 order-card">
              <Card.Body className="text-center">
                <FaSearch size={50} className="mb-3 text-success" />
                <Card.Title>متابعة الطلبات</Card.Title>
                <Card.Text>تتبع حالة طلباتك الحالية</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

      <div className="container mt-4">
        <h2 className="mb-4">طلبات الخدمات المدنية</h2>

        {civilRequests.length === 0 ? (
          <Alert variant="info">لا توجد طلبات للخدمات المدنية</Alert>
        ) : (
          <div className="row">
            {civilRequests.map((request, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-3">
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
                    <p>
                      <strong>اسم صاحب الوثيقة:</strong> {request.ownerName}
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
                        {request.extraFields.gender === "male" ? "ذكر" : "أنثى"}
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
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Orders;
