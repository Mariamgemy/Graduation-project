import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { paymentService } from "../services/paymentService";
import "../Css/PaymentMethods.css";

const StripePaymentForm = ({ clientSecret, paymentIntentId, onPaymentSuccess, onPaymentError, billDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  console.log("[StripePaymentForm] Component rendering/re-rendering.");
  console.log("[StripePaymentForm] Props - clientSecret:", clientSecret, "paymentIntentId:", paymentIntentId);
  console.log("[StripePaymentForm] Hook value - useStripe():", stripe);
  console.log("[StripePaymentForm] Hook value - useElements():", elements);

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true); // Initial state is disabled
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [pollingActive, setPollingActive] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        color: "red",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "18px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  useEffect(() => {
    console.log("[StripePaymentForm] useEffect for polling cleanup mounted/updated.");
    return () => {
      console.log("[StripePaymentForm] Cleanup: Polling stopped due to component unmount or re-render.");
      setPollingActive(false);
    };
  }, []);

  useEffect(() => {
    console.log("[StripePaymentForm] useEffect for stripe/clientSecret check. Stripe loaded in hook:", !!stripe, "Client Secret present:", !!clientSecret);
    if (!stripe) {
      console.warn("[StripePaymentForm] Stripe.js (from useStripe) is not available yet in useEffect.");
    }
    if (!clientSecret) {
      console.error("[StripePaymentForm] CRITICAL: Missing client secret in useEffect. Payment cannot proceed.");
      setError("بيانات الدفع الأساسية مفقودة. لا يمكن إكمال العملية.");
    }
    // Initialize disabled state based on stripe and elements availability
    if (!stripe || !elements) {
        setDisabled(true);
    }
  }, [stripe, elements, clientSecret]);

  // Add effect to update UI when payment status changes to "Paid"
  useEffect(() => {
    if (paymentStatus === "Paid") {
      console.log("[StripePaymentForm] Payment status is 'Paid'. Setting succeeded state to true.");
      setSucceeded(true);
      
      // Navigate to success page after a short delay
      const timer = setTimeout(() => {
        handleNavigateToSuccess();
      }, 1500); // Give user a moment to see the success message before redirecting
      
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  // Function to navigate to success page
  const handleNavigateToSuccess = () => {
    console.log("[StripePaymentForm] Navigating to success page with payment details");
    
    // Prepare payment details to pass to the success page
    const paymentDetails = {
      billNumber: billDetails?.billNumber || "N/A",
      amount: billDetails?.amount || "50", // Default or from props
      paymentIntentId: paymentIntentId || "N/A",
      date: new Date().toLocaleDateString('ar-EG')
    };
    
    navigate('/payment-success', { 
      state: { 
        paymentDetails 
      } 
    });
  };

  const pollPaymentStatus = async (currentPaymentIntentId) => {
    console.log("[StripePaymentForm] pollPaymentStatus initiated for ID:", currentPaymentIntentId);
    try {
      if (!currentPaymentIntentId) {
        console.error("[StripePaymentForm] pollPaymentStatus: No payment intent ID provided.");
        setError("خطأ في معرف الدفع عند التحقق.");
        return;
      }
      
      setPollingActive(true);
      let attempts = 0;
      const maxAttempts = 10;
      console.log("[StripePaymentForm] pollPaymentStatus: Starting polling loop, max attempts:", maxAttempts);
      
      const checkStatus = async () => {
        console.log(`[StripePaymentForm] pollPaymentStatus: checkStatus attempt ${attempts + 1}/${maxAttempts}. Polling active: ${pollingActive}`);
        if (!pollingActive || attempts >= maxAttempts) {
          console.log("[StripePaymentForm] pollPaymentStatus: Polling stopped - Active:", pollingActive, "Attempts:", attempts);
          if (attempts >= maxAttempts && pollingActive) {
            setError("فشل في التحقق من حالة الدفع بعد عدة محاولات.");
            if (typeof onPaymentError === 'function') onPaymentError("Polling timed out after max attempts");
          }
          setPollingActive(false);
          return;
        }
        
        attempts++;
        try {
          console.log("[StripePaymentForm] pollPaymentStatus: Calling paymentService.checkPaymentStatus with ID:", currentPaymentIntentId);
          const result = await paymentService.checkPaymentStatus(currentPaymentIntentId);
          console.log(`[StripePaymentForm] pollPaymentStatus: paymentService.checkPaymentStatus result (${attempts}/${maxAttempts}):`, result);
          
          if (result && typeof result.status === 'string') {
            setPaymentStatus(result.status);
            
            if (result.status === "Paid") {
              console.log("[StripePaymentForm] pollPaymentStatus: Payment status is 'Paid'. Setting succeeded.");
              setSucceeded(true);
              setPollingActive(false);
              if (typeof onPaymentSuccess === 'function') {
                console.log("[StripePaymentSuccess: Calling onPaymentSuccess with result:", result);
                onPaymentSuccess(result);
              } else {
                console.warn("[StripePaymentForm] pollPaymentStatus: onPaymentSuccess is not a function or undefined!");
              }
              return;
            } else if (result.status === "Canceled") {
              console.log("[StripePaymentForm] pollPaymentStatus: Payment status is 'Canceled'.");
              setError("الدفع تم إلغاؤه من جهة المستخدم أو البنك.");
              setPollingActive(false);
              if (typeof onPaymentError === 'function') {
                console.log("[StripePaymentForm] pollPaymentStatus: Calling onPaymentError for 'Canceled'.");
                onPaymentError("Payment was canceled");
              }
              return;
            } else {
              console.log("[StripePaymentForm] pollPaymentStatus: Payment status is:", result.status, ". Continuing poll.");
            }
          } else {
            console.warn("[StripePaymentForm] pollPaymentStatus: Invalid or unexpected status response from paymentService.checkPaymentStatus:", result);
          }
          
          if (pollingActive) {
            console.log("[StripePaymentForm] pollPaymentStatus: Scheduling next checkStatus call.");
            setTimeout(checkStatus, 2000);
          }
        } catch (error) {
          console.error("[StripePaymentForm] pollPaymentStatus: Error during paymentService.checkPaymentStatus call:", error);
          if (attempts >= maxAttempts) {
            setError("فشل في التحقق من حالة الدفع بعد عدة محاولات. يرجى مراجعة كشف حسابك أو المحاولة لاحقاً.");
            setPollingActive(false);
            if (typeof onPaymentError === 'function') {
              onPaymentError("Failed to verify payment status after multiple polling attempts");
            }
          } else if (pollingActive) {
            console.log("[StripePaymentForm] pollPaymentStatus: Scheduling next checkStatus call after encountering an error.");
            setTimeout(checkStatus, 3000);
          }
        }
      };
      
      console.log("[StripePaymentForm] pollPaymentStatus: Initiating first checkStatus call.");
      checkStatus();
    } catch (error) {
      console.error("[StripePaymentForm] pollPaymentStatus: Error setting up polling infrastructure:", error);
      setError("خطأ في إعداد نظام التحقق من حالة الدفع.");
    }
  };

  const handleChange = async (event) => {
    console.log("[StripePaymentForm] CardElement handleChange triggered. Event:", event);
    // Button is disabled if CardElement is empty or there's an error, or if stripe/elements are not ready.
    setDisabled(event.empty || !!event.error || !stripe || !elements);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    console.log("[StripePaymentForm] handleSubmit FUNCTION ENTERED. Event:", event);
    event.preventDefault();
    
    if (!stripe || !elements) {
      console.error("[StripePaymentForm] handleSubmit PREVENTED: Stripe.js (from useStripe) or elements (from useElements) not loaded. Stripe:", stripe, "Elements:", elements);
      setError("Stripe.js لم يتم تحميله بشكل صحيح بعد. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.");
      return;
    }

    if (!clientSecret) {
      console.error("[StripePaymentForm] handleSubmit PREVENTED: Missing client secret. Cannot proceed.");
      setError("بيانات الدفع الأساسية (client secret) مفقودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.");
      return;
    }

    setProcessing(true);
    setError(null);
    console.log("[StripePaymentForm] handleSubmit: Processing state set to true.");

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("[StripePaymentForm] handleSubmit: CardElement not found using elements.getElement(CardElement).");
        throw new Error("مكون إدخال البطاقة غير موجود. خطأ داخلي."); 
      }
      console.log("[StripePaymentForm] handleSubmit: CardElement retrieved successfully.");

      console.log("[StripePaymentForm] handleSubmit: Calling stripe.confirmCardPayment with clientSecret:", clientSecret);
      const { error: stripeError, paymentIntent: intent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          }
        }
      );

      if (stripeError) {
        console.error('[StripePaymentForm] handleSubmit: stripe.confirmCardPayment returned an error:', stripeError);
        setError(`فشل الدفع: ${stripeError.message}`);
        if (typeof onPaymentError === 'function') {
          console.log("[StripePaymentForm] handleSubmit: Calling onPaymentError due to confirmCardPayment error.");
          onPaymentError(stripeError.message);
        }
      } else if (intent) {
        console.log('[StripePaymentForm] handleSubmit: stripe.confirmCardPayment successful. PaymentIntent details:', intent);
        
        if (intent.id) {
          console.log("[StripePaymentForm] handleSubmit: PaymentIntent ID from confirmCardPayment is:", intent.id, "Proceeding to pollPaymentStatus.");
          pollPaymentStatus(intent.id);
        } else {
          console.error("[StripePaymentForm] handleSubmit: PaymentIntent ID is missing after successful confirmCardPayment. This is unexpected.");
          setError("لم يتم الحصول على معرف الدفع من Stripe بعد تأكيد البطاقة.");
        }
        
        switch (intent.status) {
          case 'succeeded':
            console.log('[StripePaymentForm] handleSubmit: PaymentIntent status from confirmCardPayment is \'succeeded\'.');
            // Immediately set success states when Stripe confirms payment has succeeded
            setPaymentStatus("Paid");
            setSucceeded(true);
            break;
          case 'processing':
           console.log("[StripePaymentForm] handleSubmit: PaymentIntent status from confirmCardPayment is \'processing\'. Polling will continue to check.");
            break;
          case 'requires_action':
            console.log("[StripePaymentForm] handleSubmit: PaymentIntent status from confirmCardPayment is \'requires_action\'. Attempting to handle action.");
            setPaymentStatus("RequiresAction");
            try {
              console.log("[StripePaymentForm] handleSubmit (requires_action): Calling stripe.handleCardAction with clientSecret:", clientSecret);
              const { error: actionError, paymentIntent: confirmedIntent } = 
                await stripe.handleCardAction(clientSecret);
                
              if (actionError) {
                console.error('[StripePaymentForm] handleSubmit (requires_action): stripe.handleCardAction returned an error:', actionError);
                setError(`فشل المصادقة الإضافية: ${actionError.message}`);
                if (typeof onPaymentError === 'function') onPaymentError(actionError.message);
              } else if (confirmedIntent) {
                console.log('[StripePaymentForm] handleSubmit (requires_action): stripe.handleCardAction successful. ConfirmedIntent details:', confirmedIntent);
                
                // Check if the confirmed intent is already successful
                if (confirmedIntent.status === 'succeeded') {
                  console.log('[StripePaymentForm] handleSubmit: ConfirmedIntent status is \'succeeded\'. Setting success states.');
                  setPaymentStatus("Paid");
                  setSucceeded(true);
                  if (typeof onPaymentSuccess === 'function') {
                    onPaymentSuccess(confirmedIntent);
                  }
                }
                
                if (confirmedIntent.id) {
                   console.log("[StripePaymentForm] handleSubmit (requires_action): ConfirmedIntent ID is:", confirmedIntent.id, "Proceeding to pollPaymentStatus for confirmed intent.");
                   pollPaymentStatus(confirmedIntent.id);
                } else {
                    console.error("[StripePaymentForm] handleSubmit (requires_action): ConfirmedIntent ID is missing after handleCardAction. This is unexpected.");
                    setError("لم يتم الحصول على معرف الدفع بعد إكمال الخطوة الإضافية.");
                }
              }
            } catch (err) {
              console.error('[StripePaymentForm] handleSubmit (requires_action): Unexpected error during stripe.handleCardAction:', err);
              setError(`خطأ في معالجة المصادقة الإضافية: ${err.message || "خطأ غير معروف"}`);
              if (typeof onPaymentError === 'function') onPaymentError(err.message || "Authentication handling error");
            }
            break;
          default:
            console.log(`[StripePaymentForm] handleSubmit: Unexpected PaymentIntent status from confirmCardPayment: ${intent.status}`);
            setError(`حالة دفع غير متوقعة: ${intent.status}`);
        }
      } else {
        console.error("[StripePaymentForm] handleSubmit: Invalid response from stripe.confirmCardPayment - no error and no paymentIntent. This is highly unusual.");
        setError("استجابة غير متوقعة من Stripe بعد تأكيد البطاقة.");
      }
    } catch (err) {
      console.error('[StripePaymentForm] handleSubmit: Unexpected error in the main try-catch block:', err);
      setError(err.message || "حدث خطأ فادح وغير متوقع أثناء محاولة معالجة الدفع.");
      if (typeof onPaymentError === 'function') {
        onPaymentError(err.message || "Critical unexpected error during payment processing.");
      }
    } finally {
      console.log("[StripePaymentForm] handleSubmit: Processing state set to false (finally block).");
      setProcessing(false);
    }
  };

  if (!stripe || !elements) {
    console.warn("[StripePaymentForm] Rendering: Stripe or Elements (from hooks) not available yet. Displaying loader. Stripe:", stripe, "Elements:", elements);
    return (
      <div className="text-center p-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">جاري تحميل بوابة الدفع...</p>
      </div>
    );
  }
  console.log("[StripePaymentForm] Rendering: Stripe and Elements are available. Proceeding to render payment form. Button disabled state:", disabled);
  console.log("[StripePaymentForm] Current state values - succeeded:", succeeded, "paymentStatus:", paymentStatus);

  return (
    <Form onSubmit={handleSubmit} className="stripe-payment-form">
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      
      {paymentStatus === "Paid" && (
        <Alert variant="success" className="mb-3">
          تم الدفع بنجاح!
        </Alert>
      )}
      
      {paymentStatus === "Processing" && (
        <Alert variant="info" className="mb-3">
          جاري معالجة الدفع... يرجى الانتظار.
        </Alert>
      )}
      
      {paymentStatus === "RequiresAction" && (
        <Alert variant="warning" className="mb-3">
          تتطلب عملية الدفع خطوات إضافية. يرجى اتباع التعليمات.
        </Alert>
      )}
      
      <Form.Group className="mb-3">
        <Form.Label>تفاصيل البطاقة</Form.Label>
        <div className="card-element-container mt-2">
          <CardElement 
            options={cardElementOptions} 
            onChange={handleChange}
          />
        </div>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={disabled || processing || succeeded}
        className="w-100 btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
      >
        {processing ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
            جاري المعالجة...
          </>
        ) : (
          "ادفع الآن"
        )}
      </Button>
      
      {/* Debug information (can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-3 p-2 bg-light">
          <small>Debug - Payment Status: {paymentStatus || 'None'}, Succeeded: {succeeded ? 'Yes' : 'No'}</small>
        </div>
      )}
      
      {/* Success message still appears in the form before redirect */}
      {succeeded && (
        <Alert variant="success" className="mt-3">
          تم الدفع بنجاح! سيتم تحديث حالة الفاتورة قريباً.
        </Alert>
      )}
    </Form>
  );
};

export default StripePaymentForm;