import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "../Css/captcha.css";

const CaptchaComponent = forwardRef((props, ref) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const captchaCanvas = useRef(null);

  const generateCaptcha = (length = 6) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < length; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  };

  const drawCaptcha = (text) => {
    const canvas = captchaCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 4;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
    ctx.fillStyle = "#495057";
    ctx.font = "bold 20px sans-serif";
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (width - textWidth) / 2, height / 1.5);
  };

  const generateNewCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
    drawCaptcha(newCaptcha);
    setUserInput("");
    setErrorMessage("");
    setIsVerified(false);
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setErrorMessage("");
    setIsVerified(false);
  };

  const handleVerify = () => {
    if (userInput.trim() === "") {
      setErrorMessage("رمز التحقق مطلوب");
      setIsVerified(false);
    } else if (userInput !== captchaText) {
      setErrorMessage("رمز التحقق غير صحيح");
      setIsVerified(false);
      generateNewCaptcha();
    } else {
      setErrorMessage("");
      setIsVerified(true);
    }
  };

  useImperativeHandle(ref, () => ({
    validateCaptcha: () => isVerified,
    validateCaptchaField: () => {
      if (userInput.trim() === "") {
        setErrorMessage("رمز التحقق مطلوب");
        setIsVerified(false);
        return false;
      }
      if (!isVerified) {
        setErrorMessage("من فضلك اضغطي على زر تحقق أولاً");
        return false;
      }
      return true;
    }
  }));
  

  return (
    <div className="mb-3">
      <label htmlFor="captchaInput" className="form-label">
        رمز التحقق*
      </label>
      <canvas
        ref={captchaCanvas}
        width="300"
        height="50"
        className="rounded mb-2"
        style={{ border: "1px solid #ced4da", display: "block" }}
      />
      {/* <input
        type="text"
        className="form-control mb-2"
        id="captchaInput"
        value={userInput}
        onChange={handleInputChange}
        placeholder="أدخل رمز التحقق"
      />
      {errorMessage && <div className="text-danger">{errorMessage}</div>} */}
<div className="position-relative">
  <input
    type="text"
    className={`form-control mb-2 pe-5 ${errorMessage ? "is-invalid" : isVerified ? "is-valid" : ""}`}
    id="captchaInput"
    value={userInput}
    onChange={handleInputChange}
    placeholder="أدخل رمز التحقق"
  />
  {isVerified && (
    <i
      className="bi bi-check-circle-fill text-success position-absolute"
      style={{ left: "10px", top: "50%", transform: "translateY(-50%)" }}
    ></i>
  )}
  {errorMessage && (
  <>  <i
      className="bi bi-x-circle-fill text-danger position-absolute"
      style={{ left: "10px", top: "30%", transform: "translateY(-50%)" }}
    ></i><div className="text-danger">{errorMessage}</div></>
  )}
</div>

      <div className="d-flex gap-2 align-items-center">
        <button
          type="button"
          className="btn nav-btn btn-outline-succes px-4 py-2 fs-5 mb-2"
          onClick={handleVerify}
        >
          تحقق
        </button>
      

        <button
          type="button"
          className="btn nav-btn btn-outline-secondari px-4 py-2 fs-5 mb-2"
          onClick={generateNewCaptcha}
        >
          <i className="bi bi-arrow-clockwise"></i> تغيير
        </button>
      </div>
    </div>
  );
});

export default CaptchaComponent;
