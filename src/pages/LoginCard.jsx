import "../Css/IdValidation.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import CustomModal from "./IdValidation";
import { useState } from "react";
import PhoneInput from '../components/PhoneInput';
import PasswordInput from '../components/PasswordInput';

function LoginCard({ show, handleClose }) {
    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

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
        <h3 className="mb-3 text-center text-color">سجل دخولك </h3>
        <p className="text-center">
          ليس لديك حساب ؟
          <Link className=" text-color" onClick={() => setShowModal(true)} >إنشاء حساب .</Link>
          <CustomModal
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
        </p>

        <form>
          <label className="fw-bold"> الموبايل </label>
          <PhoneInput 
  value={phoneNumber}
 
  onChange={(e) => setPhoneNumber(e.target.value)}
  placeholder="ادخل رقم الهاتف"
/>
          <Link to={"#"}>
            <p className="text-color">*هل نسيت رقم الموبايل ؟</p>
          </Link>
          <label className="fw-bold"> كلمة المرور </label>
       
          <PasswordInput 
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="ادخل كلمة السر"
/>
          {/* <input className="form-control  mb-2" placeholder=" ********** " /> */}
          <Link to={"#"}>
            <p className="text-color">*هل نسيت كلمة السر ؟</p>
          </Link>

          <Link className="w-100 btn btn-outline-secondry border-0" to={"/"}>
            بحث{" "}
          </Link>
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
