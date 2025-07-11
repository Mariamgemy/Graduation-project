import React, { useRef, useState, useEffect } from "react";
import UtilityServices from "./Services/UtilityServices";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/UniqueCard.css";
import "../Css/Form.css";
import CivilServices from "./Services/CivilServices";
import TrafficServices from "./Services/TrafficServices";
import ConsumptionServices from "./Services/ConsumptionServices";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";

const stripePromise = loadStripe(
  "pk_test_51QTN1AK1FEwOxerZfCn4zCfYZPLxgw3WwLdL2kaTBfEmexHfeoyiP2BoAWQMVkFM5w5xTrk7OPWUMelS4ktPgXqK00TW5tdcvp"
); // استبدل بمفتاحك

function Formm() {
  const location = useLocation();
  const card = location.state;
  const utilityRef = useRef();
  const consumptionRef = useRef();
  const civilRef = useRef();
  const trafficRef = useRef();
  const energyRef = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isUtilityCard =
    card.title === "سداد فاتورة الكهرباء" ||
    card.title === "سداد فاتورة المياه" ||
    card.title === "سداد فاتورة الغاز";

  const isConsumptionCard = card.title === "تحليل استهلاك الكهرباء";

  const isCivilCard =
    card.title === "شهادة ميلاد" ||
    card.title === "شهادة وفاة" ||
    card.title === "قسيمة زواج" ||
    card.title === "قسيمة طلاق" ||
    card.title === "شهادة ميلاد مميكنة لأول مرة";

  const isTrafficCard =
    card.title === "تجديد رخصة قيادة" ||
    card.title === "طلب رخصة إلكترونية" ||
    card.title === "بدل فاقد / تالف للرخص" ||
    card.title === "مخالفات المرور ودفعها";

  // This handlePayment function seems to be part of Formm.jsx's own payment flow for non-utility services.
  // It's kept as is for now, as the focus is on fixing UtilityServices nesting.
  const handlePayment = async (paymentIntentId, clientSecret) => {
    setPaymentProcessing(true);

    try {
      const stripe = await stripePromise;

      const { error } = await stripe.confirmPayment({
        clientSecret,
        paymentMethod: {
          card: {
            number: "4242424242424242", // Example card, should be from user input for a real scenario
            exp_month: "12",
            exp_year: "25",
            cvc: "123",
          },
          billing_details: {
            name: "Test User",
          },
        },
      });

      if (error) {
        console.error(error);
        alert("فشل الدفع: " + error.message);
        setPaymentProcessing(false);
      } else {
        alert("تم الدفع بنجاح!");
        setPaymentProcessing(false);
        navigate("/payment-success");
      }
    } catch (err) {
      console.error(err);
      setPaymentProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
      return;
    }

    setAuthError(null);
    let isFormValid = true;
    let formData = {};

    if (isUtilityCard) {
      // Utility services are handled separately
      return;
    }
    if (isConsumptionCard) {
      const isValidConsumption = consumptionRef.current?.validateForm();
      if (!isValidConsumption) isFormValid = false;
      else formData = consumptionRef.current?.getFormData();
    }
    if (isCivilCard) {
      const isValidCivil = civilRef.current?.validateForm();
      if (!isValidCivil) isFormValid = false;
      else formData = civilRef.current?.getFormData();
    }
    if (isTrafficCard) {
      const isValidTraffic = trafficRef.current?.validateForm();
      if (!isValidTraffic) isFormValid = false;
      else formData = trafficRef.current?.getFormData();
    }

    if (!isFormValid) return;

    try {
      setFormSubmitted(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://smartgovernment-fpcxb3cmfef3e6c0.uaenorth-01.azurewebsites.net/api/bills/register-meter/api/bills/generate-and-pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            type: getServiceType(card.title),
            currentReading: formData.meterReading,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في إنشاء فاتورة الدفع");
      }

      const result = await response.json();

      if (result.success) {
        await handlePayment(result.paymentIntentId, result.clientSecret);
      } else {
        throw new Error(result.errorMessage || "حدث خطأ أثناء الدفع");
      }
    } catch (error) {
      console.error("خطأ أثناء الإرسال:", error.message);
      alert(error.message);
      setFormSubmitted(false);
    }
  };

  const getServiceType = (title) => {
    if (title.includes("كهرباء")) return "Electricity";
    if (title.includes("مياه")) return "Water";
    if (title.includes("غاز")) return "Gas";

    // For Civil, Traffic, Housing, this might need adjustment or the backend handles generic types.
    return "Other";
  };

  return (
    <div className="p-4">
      {/* زر الرجوع أعلى الصفحة يظهر فقط على الموبايل */}
      {isMobile && (
        <div className="d-flex justify-content-start mb-5">
          <button
            onClick={() => navigate(-1)}
            className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5"
          >
            <FaArrowRightLong className="ms-2" /> رجوع
          </button>
        </div>
      )}
      <h2 className="mb-5 text-color">{card.title}</h2>
      {isUtilityCard ? (
        <UtilityServices ref={utilityRef} isMobile={isMobile} />
      ) : (
        <div>
          {authError && (
            <Alert variant="warning" className="mb-3">
              <p className="mb-0">{authError}</p>
            </Alert>
          )}
          {isCivilCard && <CivilServices ref={civilRef} isMobile={isMobile} />}
          {isTrafficCard && (
            <TrafficServices ref={trafficRef} isMobile={isMobile} />
          )}
          {isConsumptionCard && (
            <ConsumptionServices ref={consumptionRef} isMobile={isMobile} />
          )}
        </div>
      )}
    </div>
  );
}

export default Formm;
