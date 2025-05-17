import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css/orders.css";

const Orders = () => {
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
    </Container>
  );
};

export default Orders;
