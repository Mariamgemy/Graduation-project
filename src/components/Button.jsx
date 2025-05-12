import { FaArrowLeftLong } from "react-icons/fa6";


function Button({ handleNext }) {
 

  return (
    <>
      <div className="text-start">
        <button
          type="button"
          className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2 mt-3"
          onClick={
            handleNext
          }
          
          >
          متابعة &nbsp; <FaArrowLeftLong size={20} />
        </button>
      </div>
        
    </>
  );
}

export default Button;
