
import "../Css/IdValidation.css"
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";


function LoginCard({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="blur-background-modal"
      backdropClassName="custom-backdrop"
      backdrop="static"
      keyboard={false} 
    >
      <Modal.Body className=" p-4 rounded-4">
        <h3 className="mb-3 text-center text-color">سجل دخولك    </h3>
 
        <form>
          <label className="fw-bold"> الموبايل </label>
          <input className="form-control mb-2" placeholder="ادخل رقم الموبايل " />
          <Link to={"#"}><p className="text-color">*هل نسيت رقم الموبايل ؟</p></Link>
          <label className="fw-bold"> كلمة المرور  </label>
          <input className="form-control  mb-2" placeholder=" ********** " />
          <Link to={"#"}><p className="text-color">*هل نسيت كلمة السر ؟</p></Link>
         
          <Link className="w-100 btn btn-outline-secondry border-0" to={"/"}>بحث </Link>

        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginCard;
