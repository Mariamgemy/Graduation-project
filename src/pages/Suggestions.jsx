import Line from "../components/Line";
import Suggest from '../components/images/Suggest.png'
import { Container } from "react-bootstrap";
import CaptchaComponent from '../components/captcha';
import Footer from "../components/Footer";
function Suggestions() {
  return (
    <div>
        <div className="container-fluid">
            <h2 className=" text-color fw-bold mt-5 text-center mb-4">الشكاوي والمقترحات </h2>
            <Line/>
            <div className=" vh-100">
        <div className="row h-100 flex-row-reverse">
          <div className="col-md-5 d-none d-md-flex justify-content-center ">
            <img
              src={Suggest}
              alt="صورة الويب سايت"
              className="img-fluid w-100"
            />
          </div>

          <div className="col-md-7 d-flex  justify-content-center">
            <div className="w-100 ">
              {/* <Container className="py-5"> */}
             <form className="d-flex flex-column  ">
<label className="form-label" htmlFor="name">الاسم</label>
<input className="form-control" type="text" id="name" name="name" placeholder="الاسم"/>
<label className="form-label" htmlFor="email">البريد الإلكتروني</label>
<input className="form-control" type="email" id="email" name="email" placeholder="البريد الإلكتروني"/>
<label className="form-label" htmlFor="phone">رقم الموبايل </label>
<input className="form-control" type="text" id="phone" name="phone" placeholder="رقم الموبايل"/>
<label className="form-label" htmlFor="type">نوع الشكوى</label>
<select className="form-select" name="type" id="type">
    <option value="اختر"></option>
    <option value="شكوى عامة "> شكوى عامة </option>
    <option value="شكوى لخدمة "> شكوى لخدمة  </option>
    <option value="شكوى لطلب "> شكوى لطلب </option>

</select>

<label className="form-label">محتوى الشكوى </label>
            <textarea
              className="form-control"
              rows="4"
            //   value={complaintDescription}
            //   onChange={(e) => setComplaintDescription(e.target.value)}
            ></textarea>
            <CaptchaComponent/>
            <button className="btn nav-btn btn-outline-secondry">ارسال</button>

             </form>
              
              {/* </Container> */}
            </div>
          </div>
        </div>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Suggestions