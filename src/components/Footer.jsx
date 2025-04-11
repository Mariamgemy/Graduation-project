
import "../Css/Footer.css"
import ToolTip from "./tooltip/ToolTip";
import logo from "../logo/Group 34198.svg"
import { Link } from "react-router-dom";
function Footer() {
  return (
   <div >
<footer className="mt-auto nav-bgc ">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-3">
      <Link className=" d-flex align-items-center footer-logo" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="Logo" />
        </Link>
        <div className="custom-link" >كل الخدمات الحكومية بطريقة فورية وسهلة وانت فى مكانك.</div>
      </div>
      <div className="col-md-4 mb-3">
        <h5 className="text-center fw-bold">أشهر الخدمات </h5>
        <ul className="list-unstyled text-center">
          <li><a href="#" className="text-decoration-none custom-link ">الأحوال المدنية</a></li>
          <li><a href="#" className="text-decoration-none custom-link ">خدمات المرور</a></li>
          <li><a href="#" className="text-decoration-none custom-link ">خدمات الكهرباء والمرافق والفواتير
          </a></li>
        </ul>
      </div>
      <div className="col-md-4 mb-3">
        <h5 className="text-center mb-3 fw-bold"> تـابـعـنـا :</h5>
<ToolTip/>
      </div>
    </div>
    <hr className="mb-4" />
    <div className="row">
      <div className="col-md-12 text-center">
        <p className="fw-bold"> SmartGov. جميع حقوق النشر محفوظة© 2025.</p>
      </div>
    </div>
  </div>
</footer>


   </div>
  )
}

export default Footer