
import Suggest from "../components/images/Suggest.svg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Footer from "../components/Footer";
import "../Css/Suggestions.css";
import { Container } from "react-bootstrap";

const ComplaintDone = () => {
  

  return (
    <>
      <div className="container-fluid mb-5 px-5">
        <div className="">
          <div className="row h-100 flex-row-reverse">
            <div className="col-md-5 d-none d-md-flex justify-content-center mt-5">
              <img
                src={Suggest}
                alt="صورة الويب سايت"
                className="img-fluid w-100"
              />
            </div>

            <div className="col-md-7 d-flex align-items-center justify-content-center">
              <div className="w-100 ">
              <Container className="py-5 text-center ">
             <h2><IoMdCheckmarkCircleOutline className="text-color" size={100} /></h2>
             <h2>شكرا لقد تم تسجيل الشكوي  </h2>
            </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default ComplaintDone;
