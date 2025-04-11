import { useLocation } from "react-router-dom";
import React from 'react';
import Sidebar from "../components/SideBar";
import Formm from "../components/Formm";
import "../Css/UniqueCard.css"
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function CardDetails() {
  const location = useLocation();
  const card = location.state;

  if (!card) {
    return <h2 className="text-center mt-5"> ستأتيكم قريباً </h2>;
  }


  return (
<>
<NavBar/>
<div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-light">
          <Sidebar />
        </div>
        <div className="col-md-9 p-4">
    <div className="container py-5">
 
      <div className="bg-light p-3 mb-3 rounded-top">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item "><Link className="text-color" to="/"> الرئيسية / </Link></li>
            <li className="breadcrumb-item me-2"><Link className="text-color" to="/services">خدامــاتـــنــا</Link></li>
            <li className="breadcrumb-item active" aria-current="page">الاستعلام ودفع المخالفات المرورية</li>
          </ol>
        </nav>
      </div>
    <div className="card p-4 shadow rounded-4">
      {/* <h2 className="mb-3 text-primary text-color text-center">{card.title}</h2> */}
     
 <Formm/>

    </div>
  </div>
</div>
</div>
</div>
</>
  
  );
}

export default CardDetails;