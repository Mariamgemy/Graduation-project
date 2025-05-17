import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import "../Css/profile.css";

const Profile = () => {


  return (
    <Container className="mt-5 pt-5">
      <h2 className="text-center mb-4">حسابي</h2>
      {message.text && (
        <Alert variant={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="profile-card">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="profile-avatar">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="user-info">
                <div className="info-item">
                  <span className="label">البريد الإلكتروني:</span>
                  <span className="value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">الرقم القومي:</span>
                  <span className="value">
                    {user?.nationalId || "غير متوفر"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">العنوان:</span>
                  <span className="value">{user?.address || "غير متوفر"}</span>
                </div>
              </div>

      

             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
