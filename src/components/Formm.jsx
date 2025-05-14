import React, { useRef, useState } from "react";
import UtilityServices from "./Services/UtilityServices";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/UniqueCard.css";
import "../Css/Form.css";
import CivilServices from "./Services/CivilServices";
import TrafficServices from "./Services/TrafficServices";
import EnergyServices from "./Services/EnergyServices";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";

const stripePromise = loadStripe(
  "pk_test_51QTN1AK1FEwOxerZfCn4zCfYZPLxgw3WwLdL2kaTBfEmexHfeoyiP2BoAWQMVkFM5w5xTrk7OPWUMelS4ktPgXqK00TW5tdcvp"
); // استبدل بمفتاحك

function Formm() {
  const location = useLocation();
  const card = location.state;
  const utilityRef = useRef();
  const civilRef = useRef();
  const trafficRef = useRef();
  const energyRef = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [authError, setAuthError] = useState(null);

  const isUtilityCard =
    card.title === "سداد فاتورة الكهرباء" ||
    card.title === "سداد فاتورة المياه" ||
    card.title === "سداد فاتورة الغاز";

  const isCivilCard =
    card.title === "شهادة ميلاد" ||
    card.title === "شهادة وفاة" ||
    card.title === "قسيمة زواج" ||
    card.title === "قسيمة طلاق" ||
    card.title === "شهادة ميلاد مميكنة لأول مرة";

  const isTrafficCard =
    card.title === "تجديد رخصة قيادة" ||
    card.title === "تجديد رخصة مركبة" ||
    card.title === "بدل فاقد / تالف للرخص" ||
    card.title === "مخالفات المرور ودفعها";

  const isEnergyCard =
    card.title === "شهادة كفاءة الطاقة " ||
    card.title === "متابعة استهلاك المياه والكهرباء بشكل لحظي" ||
    card.title === "التقديم على عداد كهرباء / مياه" ||
    card.title === "نقل ملكية عداد" ||
    card.title === "تقديم شكوى مرافق";

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
    if (isEnergyCard) {
      const isValidEnergy = energyRef.current?.validateForm();
      if (!isValidEnergy) isFormValid = false;
      else formData = energyRef.current?.getFormData();
    }

    if (!isFormValid) return;

    try {
      setFormSubmitted(true);

      const response = await fetch(
        "https://government-c8bqb5c6gwfnf2h8.canadacentral-01.azurewebsites.net/api/bills/register-meter/api/bills/generate-and-pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      <h2 className="mb-5 text-color">{card.title}</h2>
      {isUtilityCard ? (
        // Render UtilityServices outside of Formm.jsx's form to prevent nesting
        <UtilityServices ref={utilityRef} />
      ) : (
        // For other services, use the form as before
        <form onSubmit={handleSubmit}>
          {authError && (
            <Alert variant="warning" className="mb-3">
              <p className="mb-0">{authError}</p>
            </Alert>
          )}
          {isCivilCard && <CivilServices ref={civilRef} />}
          {isTrafficCard && <TrafficServices ref={trafficRef} />}
          {isEnergyCard && <EnergyServices ref={energyRef} />}
        </form>
      )}
    </div>
  );
}

export default Formm;
