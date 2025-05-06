import React from 'react';
import { Accordion } from 'react-bootstrap';

import { SiContactlesspayment } from "react-icons/si";
import "../Css/Sidebar.css"


import { useLocation } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdOutlinePayments ,MdWatchLater  } from "react-icons/md";
import { IoOptionsSharp , IoPeople } from "react-icons/io5";
import { FaCcVisa } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

function Sidebar() {
  const location = useLocation();
  const card = location.state;
  return (
    <div className="bg-light p-5">
    {/* هيدر السايدبار */}
    <div className="d-flex align-items-center mb-3">
    <SiContactlesspayment size={40} color='#3373a3' />

      <h5 className="mb-0 me-2 fw-bold text-color">{card.title}</h5>

    </div>
      <Accordion >
        <Accordion.Item eventKey="0">
          <Accordion.Header><TbFileDescription size={30} />الوصف </Accordion.Header>
          <Accordion.Body>
          <p className="fs-5 text-color text-center">{card.description}</p>.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><MdOutlinePayments size={30}/>رسوم الخدمة  </Accordion.Header>
          <Accordion.Body>
       
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header><IoOptionsSharp size={30}/>خيارات الدفع المتوفرة  </Accordion.Header>
          <Accordion.Body>
          <p className="fs-5 text-color text-center">نقداً أو بطاقة الخصم
<span><FaCcVisa size={30} color='blue'/><GiMoneyStack size={30} color='green'/></span>

</p>.
 
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header><IoPeople size={30}/>المستفيدون </Accordion.Header>
          <Accordion.Body>
            محتوى القسم الثاني...
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header><MdWatchLater size={30}/>ساعات العمل  </Accordion.Header>
          <Accordion.Body>
          <p className="fs-5 text-color text-center">Available 24/7</p>.
         
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header><TbFileDescription  size={30}/>الشروط والاحكام  </Accordion.Header>
          <Accordion.Body>
            محتوى القسم الثاني...
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header> <BsFillPersonVcardFill size={30}/>تواصل معنا  </Accordion.Header>
          <Accordion.Body>
            محتوى القسم الثاني...
          </Accordion.Body>
        </Accordion.Item>
    
      </Accordion>
    </div>
  );
}

export default Sidebar;