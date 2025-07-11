import { useLocation } from "react-router-dom";

import React from "react";
import Sidebar from "../components/SideBar";
import Formm from "../components/Formm";
import "../Css/UniqueCard.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function CardDetails() {
  const location = useLocation();
  const card = location.state;

  if (!card) {
    return <p>لم يتم العثور على الخدمة.</p>;
  }

  return (
    <>
      <NavBar />
      <div
        className="container-fluid"
        style={{ backgroundColor: "#fff", minHeight: "100vh" }}
      >
        <div className="row">
          <div className="col-md-3" style={{ backgroundColor: "#fff" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 p-4" style={{ backgroundColor: "#fff" }}>
            <div className="container py-5" style={{ backgroundColor: "#fff" }}>
              {/* حذف الكارت والخلفية الرمادية حول العنوان */}
              {/* <div className="bg-light p-3 mb-3 rounded-top"> */}
              {/* ... */}
              {/* </div> */}

              {/* إزالة الكارت الأبيض حول الفورم */}
              {/* <div className="card p-4 shadow rounded-4"> */}
              <Formm />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDetails;
