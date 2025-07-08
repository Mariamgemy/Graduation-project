import React from "react";
import { Accordion, Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";

import { SiContactlesspayment } from "react-icons/si";
import "../Css/Sidebar.css";

import { useLocation } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdOutlinePayments, MdWatchLater } from "react-icons/md";
import { IoOptionsSharp, IoPeople } from "react-icons/io5";
import { FaCcVisa } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const card = location.state;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sidebarItems = [
    {
      icon: <TbFileDescription size={24} />,
      title: "الوصف",
      content: <p className="fs-6 text-color">{card.description}</p>,
      eventKey: "0",
    },
    {
      icon: <MdOutlinePayments size={24} />,
      title: "رسوم الخدمة",
      content: <p className="fs-6 text-color">سيتم عرض الرسوم هنا</p>,
      eventKey: "1",
    },
    {
      icon: <IoOptionsSharp size={24} />,
      title: "خيارات الدفع المتوفرة",
      content: (
        <div className="d-flex align-items-center justify-content-center gap-3">
          <FaCcVisa size={30} color="#1A1F71" />
          <GiMoneyStack size={30} color="#2E7D32" />
          <span className="fs-6 text-color">نقداً أو بطاقة الخصم</span>
        </div>
      ),
      eventKey: "2",
    },
    {
      icon: <IoPeople size={24} />,
      title: "المستفيدون",
      content: <p className="fs-6 text-color">محتوى القسم الثاني...</p>,
      eventKey: "3",
    },
    {
      icon: <MdWatchLater size={24} />,
      title: "ساعات العمل",
      content: <p className="fs-6 text-color">Available 24/7</p>,
      eventKey: "4",
    },
    {
      icon: <TbFileDescription size={24} />,
      title: "الشروط والاحكام",
      content: <p className="fs-6 text-color">محتوى القسم الثاني...</p>,
      eventKey: "5",
    },
    {
      icon: <BsFillPersonVcardFill size={24} />,
      title: "تواصل معنا",
      content: <p className="fs-6 text-color">محتوى القسم الثاني...</p>,
      eventKey: "6",
    },
  ];

  return (
    <>
      {/* أيقونة القائمة تظهر فقط على الموبايل */}
      <div className="d-block d-md-none text-end mb-2">
        <Button
          variant="outline-primary"
          onClick={handleShow}
          style={{ border: "none", background: "none" }}
        >
          <FaBars size={28} />
        </Button>
      </div>
      {/* السايد بار العادي على الديسكتوب */}
      <div className="sidebar-container d-none d-md-block">
        <div className="sidebar-header">
          <SiContactlesspayment size={40} color="#3373a3" />
          <h5 className="sidebar-title">{card.title}</h5>
        </div>
        <Accordion className="sidebar-accordion">
          {sidebarItems.map((item) => (
            <Accordion.Item
              key={item.eventKey}
              eventKey={item.eventKey}
              className="sidebar-item"
            >
              <Accordion.Header className="sidebar-header-item">
                <div className="d-flex align-items-center gap-2">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body className="sidebar-body">
                {item.content}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      {/* Offcanvas للعرض على الموبايل */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <SiContactlesspayment size={32} color="#3373a3" className="me-2" />
            {card.title}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion className="sidebar-accordion">
            {sidebarItems.map((item) => (
              <Accordion.Item
                key={item.eventKey}
                eventKey={item.eventKey}
                className="sidebar-item"
              >
                <Accordion.Header className="sidebar-header-item">
                  <div className="d-flex align-items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="sidebar-body">
                  {item.content}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
