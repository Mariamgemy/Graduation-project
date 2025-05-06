import CaptchaComponent from "../components/captcha";
import "../Css/IdValidation.css"
import factory from "../components/images/1505410_0.png"
import { Link } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";


function CustomModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="blur-background-modal"
      backdropClassName="custom-backdrop"

    >
      <Modal.Body className=" p-4 rounded-4">
        <h3 className="mb-3">التحقق من الرقم القومي</h3>
 
        <form>
          <label className="fw-bold"> الرقم القومي</label>
          <input className="form-control mb-2" placeholder="ادخل الرقم القومي" />
          <label className="fw-bold"> رقم المصنع </label>
          <input className="form-control  mb-2" placeholder="ادخل رقم المصنع" />
          <img src={factory}
          alt="صورة رقم المصنع"
          className="w-25"/>
        
          <CaptchaComponent/>
          <Link className="w-100 btn btn-outline-secondry border-0" to={"/signUp"}>بحث </Link>

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

export default CustomModal;
