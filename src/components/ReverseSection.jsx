import { Container } from "react-bootstrap";
import Line from "./Line";
import Cards from "./Cards";
import "../Css/MainComponent.css"
function ReverseSection({ title, image, cardsData }) {
  return (
    <>
     <div className="container-fluid vh-100">
        <div className="row h-100 ">
          <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center ">
            <img
              src={image}
              alt="صورة الويب سايت"
              className="img-fluid img-services mt-5"
            />
          </div>

          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <div className="w-100 ">
              <Container className="py-5 text-center mt-5">
                <h2 className="mb-4 text-color">{title}</h2>
                <Line/>
               <Cards cardsData={cardsData} />
              
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReverseSection