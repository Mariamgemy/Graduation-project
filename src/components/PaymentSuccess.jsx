import React from "react";
import { useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const { state } = location;
  
  return (
    <div className="container text-center py-5">
      <div className="alert alert-success">
        <h4 className="alert-heading">تم الدفع بنجاح!</h4>
        <p>شكراً لك على استخدامك خدماتنا</p>
      </div>
      
      {state?.paymentDetails && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">تفاصيل الفاتورة</h5>
            <p className="card-text">
              <strong>رقم الفاتورة:</strong> {state.paymentDetails.billNumber}
            </p>
            <p className="card-text">
              <strong>المبلغ:</strong> {state.paymentDetails.amount} جنيه
            </p>
            <p className="card-text">
              <strong>رقم المرجع:</strong> {state.paymentDetails.paymentIntentId}
            </p>
          </div>
        </div>
      )}
      
      <button 
        className="btn btn-primary mt-4"
        onClick={() => window.location.href = "/"}
      >
        العودة للصفحة الرئيسية
      </button>
    </div>
  );
}

export default PaymentSuccess;