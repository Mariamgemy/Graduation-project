// import "../Css/IdValidation.css";
// import { useNavigate } from "react-router-dom";
// import { Modal, Button } from "react-bootstrap";
// import {
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
//   useRef,
// } from "react";
// import CaptchaComponent from "../components/captcha";
// import EmailInput from "../components/EmailInput";

// const CustomModal = forwardRef(({ show, handleClose }, ref) => {
//   const [id, setId] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [step, setStep] = useState(1); // 1: ID, 2: Email, 3: OTP
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [countdown, setCountdown] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const captchaRef = useRef();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!show) {
//       resetForm();
//       setStep(1);
//     }
//   }, [show]);

//   useEffect(() => {
//     let timer;
//     if (step === 3 && countdown > 0) {
//       timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     } else if (countdown === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(timer);
//   }, [step, countdown]);

//   const resetForm = () => {
//     setId("");
//     setEmail("");
//     setOtp(["", "", "", "", "", ""]);
//     setErrors({});
//     setApiError("");
//     setIsLoading(false);
//     setCountdown(60);
//     setCanResend(false);
//   };

//   const isValidId = (id) => /^\d{14}$/.test(id);
//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateForm = () => {
//     const newErrors = {};
//     const isCaptchaValid = captchaRef.current?.validateCaptchaField();
//     setApiError("");

//     if (step === 1) {
//       if (!id) newErrors.id = "الرقم القومي مطلوب";
//       else if (!isValidId(id)) newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
//       if (!isCaptchaValid) newErrors.captcha = "رمز التحقق غير صحيح";
//     } else if (step === 2) {
//       if (!email) newErrors.email = "البريد الإلكتروني مطلوب";
//       else if (!isValidEmail(email))
//         newErrors.email = "البريد الإلكتروني غير صحيح";
//     } else if (step === 3) {
//       if (otp.some((digit) => !digit))
//         newErrors.otp = "يرجى إدخال الرمز كاملاً";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.querySelector(
//           `input[name=otp-${index + 1}]`
//         );
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const handleResendCode = async () => {
//     if (!canResend) return;

//     setIsLoading(true);
//     setApiError("");

//     // محاكاة إعادة إرسال الرمز
//     setTimeout(() => {
//       setCountdown(60);
//       setCanResend(false);
//       setIsLoading(false);
//       setApiError("");
//     }, 1000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setApiError("");

//     // محاكاة خطوات التحقق بدون Backend
//     setTimeout(() => {
//       if (step === 1) {
//         setStep(2);
//       } else if (step === 2) {
//         setStep(3);
//       } else if (step === 3) {
//         handleClose();
//         navigate("/phone");
//       }
//       setIsLoading(false);
//     }, 1000); // وقت وهمي لعرض التحميل
//   };

//   const renderContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <>
//             <h3 className="mb-3">التحقق من الرقم القومي</h3>
//             <div className="mb-3">
//               <label className="fw-bold form-label">الرقم القومي</label>
//               <input
//                 className="form-control mb-2"
//                 type="text"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//                 placeholder="ادخل الرقم القومي"
//                 disabled={isLoading}
//               />
//               {errors.id && <div className="text-danger">{errors.id}</div>}
//             </div>
//             <div className="mt-3">
//               <CaptchaComponent ref={captchaRef} />
//               {errors.captcha && (
//                 <div className="text-danger mt-2">{errors.captcha}</div>
//               )}
//             </div>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <h3 className="mb-3">إدخال البريد الإلكتروني</h3>
//             <div className="mb-3">
//               <label className="fw-bold form-label">البريد الإلكتروني</label>
//               <EmailInput
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="ادخل البريد الالكتروني"
//                 disabled={isLoading}
//               />
//               {errors.email && (
//                 <div className="text-danger">{errors.email}</div>
//               )}
//             </div>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <h3 className="mb-3">التحقق من البريد الإلكتروني</h3>
//             <p className="text-center mb-4">
//               تم إرسال رمز التحقق إلى بريدك الإلكتروني
//             </p>
//             <div className="mb-4">
//               <div className="d-flex justify-content-center gap-2">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     name={`otp-${index}`}
//                     className="form-control text-center"
//                     style={{ width: "50px", height: "50px" }}
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(index, e)}
//                     maxLength={1}
//                     disabled={isLoading}
//                   />
//                 ))}
//               </div>
//               {errors.otp && (
//                 <div className="text-danger text-center mt-2">{errors.otp}</div>
//               )}
//             </div>
//             <div className="text-center mb-3">
//               {!canResend ? (
//                 <p className="text-muted">
//                   يمكنك طلب رمز جديد بعد {countdown} ثانية
//                 </p>
//               ) : (
//                 <button
//                   type="button"
//                   className="btn btn-link text-color"
//                   onClick={handleResendCode}
//                   disabled={isLoading}
//                 >
//                   إعادة إرسال الرمز
//                 </button>
//               )}
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     validateForm,
//     getFormData: () => ({ id, email, otp: otp.join("") }),
//   }));

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       centered
//       className="blur-background-modal"
//       backdropClassName="custom-backdrop"
//     >
//       <Modal.Body className="p-4 rounded-4">
//         {apiError && (
//           <div className="alert alert-danger text-center">{apiError}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderContent()}

//           <button
//             type="submit"
//             className="w-100 btn btn-outline-secondry border-0 mt-2 mb-3"
//             disabled={isLoading}
//           >
//             {isLoading
//               ? "جاري التحقق..."
//               : step === 1
//               ? "تحقق"
//               : step === 2
//               ? "إرسال رمز التحقق"
//               : "تأكيد"}
//           </button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// });

// export default CustomModal;