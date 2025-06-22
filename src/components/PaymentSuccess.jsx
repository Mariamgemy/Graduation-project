import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaFileInvoice, 
  FaHome, 
  FaHeadset, 
  FaClock, 
  FaHashtag,
  FaLightbulb,
  FaEnvelope,
  FaShieldAlt,
  FaDownload
} from 'react-icons/fa';
import '../Css/PaymentSuccess.css';

function EnhancedSuccessMessage({ 
  paymentResult, 
  paymentData, 
  formData, 
  card,
  onDownloadReceipt,
  onContactSupport 
}) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // إخفاء الكونفيتي بعد 3 ثوان
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getUtilityType = (title) => {
    if (title?.includes("كهرباء")) return "كهرباء";
    if (title?.includes("مياه")) return "مياه";
    if (title?.includes("غاز")) return "غاز";
    return "خدمة أخرى";
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('ar-EG'),
      time: now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date, time } = getCurrentDateTime();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleDownloadReceipt = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else {
      // منطق افتراضي لتحميل الإيصال
      console.log('تحميل الإيصال...');
    }
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      // منطق افتراضي للتواصل مع الدعم
      console.log('التواصل مع الدعم...');
    }
  };

  return (
    <div className="success-page-container">
      {/* قسم الاحتفال بالنجاح */}
      <div className="success-celebration">
        <div className="success-icon-large bounce-in">
          <FaCheckCircle />
        </div>
        <h1 className="success-title-large">
           تم الدفع بنجاح!
        </h1>
        <p className="success-subtitle">
          شكراً لك على استخدام خدماتنا
        </p>
      </div>

      {/* بطاقة ملخص الدفع */}
      <div className="payment-summary-card fade-in-up">
        <div className="payment-summary-header">
          <div className="payment-summary-icon">
            <FaFileInvoice />
          </div>
          <h2 className="payment-summary-title">ملخص عملية الدفع</h2>
        </div>

        <div className="payment-details-grid">
          <div className="payment-detail-item">
            <span className="payment-detail-label">نوع الخدمة</span>
            <span className="payment-detail-value">
              {getUtilityType(card?.title)}
            </span>
          </div>

          <div className="payment-detail-item">
            <span className="payment-detail-label">الرقم القومي</span>
            <span className="payment-detail-value">
              {formData?.NID || 'غير محدد'}
            </span>
          </div>

          <div className="payment-detail-item">
            <span className="payment-detail-label">قراءة العداد</span>
            <span className="payment-detail-value">
              {formData?.currentReading || 'غير محدد'}
            </span>
          </div>

          {(paymentData?.billNumber || paymentResult?.billNumber) && (
            <div className="payment-detail-item">
              <span className="payment-detail-label">رقم الفاتورة</span>
              <span className="payment-detail-value">
                #{paymentData?.billNumber || paymentResult?.billNumber}
              </span>
            </div>
          )}
        </div>

        {(paymentData?.amount || paymentResult?.amount) && (
          <div className="payment-amount-highlight">
            <div className="payment-amount-label">المبلغ المدفوع</div>
            <h3 className="payment-amount-value">
              {paymentData?.amount || paymentResult?.amount} جنيه
            </h3>
          </div>
        )}
      </div>

      {/* تفاصيل العملية */}
      <div className="transaction-details fade-in-up">
        <div className="transaction-header">
          <div className="transaction-icon">
            <FaHashtag />
          </div>
          <h3 className="transaction-title">تفاصيل العملية</h3>
        </div>

        <div className="transaction-info">
          {(paymentResult?.transactionId || paymentResult?.paymentIntentId || paymentData?.paymentIntentId) && (
            <div className="transaction-item">
              <span className="transaction-label">رقم المرجع</span>
              <span className="transaction-value">
                {paymentResult?.transactionId || paymentResult?.paymentIntentId || paymentData?.paymentIntentId}
              </span>
            </div>
          )}

          <div className="transaction-item">
            <span className="transaction-label">تاريخ العملية</span>
            <span className="transaction-value">{paymentResult?.date || date}</span>
          </div>

          <div className="transaction-item">
            <span className="transaction-label">وقت العملية</span>
            <span className="transaction-value">{time}</span>
          </div>

          <div className="transaction-item">
            <span className="transaction-label">حالة العملية</span>
            <span className="transaction-value" style={{ color: '#10b981' }}>
              ✅ مكتملة
            </span>
          </div>
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="success-actions fade-in-up">
        <button 
          className="action-button-primary"
          onClick={handleDownloadReceipt}
        >
          <FaDownload />
          تحميل الإيصال
        </button>

        <button 
          className="action-button-secondary"
          onClick={handleGoHome}
        >
          <FaHome />
          العودة للرئيسية
        </button>

        <button 
          className="action-button-support"
          onClick={handleContactSupport}
        >
          <FaHeadset />
          الدعم الفني
        </button>
      </div>

      {/* نصائح ومعلومات مفيدة */}
      <div className="success-tips fade-in-up">
        <div className="tips-header">
          <div className="tips-icon">
            <FaLightbulb />
          </div>
          <h4 className="tips-title">معلومات مهمة</h4>
        </div>

        <ul className="tips-list">
          <li className="tips-item">
            <span className="tips-item-icon">💡</span>
            احتفظ برقم المرجع للمتابعة المستقبلية
          </li>
          <li className="tips-item">
            <span className="tips-item-icon">📧</span>
            تحقق من بريدك الإلكتروني للحصول على الإيصال
          </li>
          <li className="tips-item">
            <span className="tips-item-icon">🔒</span>
            جميع معاملاتك محمية ومشفرة بأعلى معايير الأمان
          </li>
          <li className="tips-item">
            <span className="tips-item-icon">⏰</span>
            سيتم تحديث حسابك خلال دقائق قليلة
          </li>
        </ul>
      </div>
    </div>
  );
}

// المكون الرئيسي المُحدّث
function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // استخراج البيانات من state
  const { state } = location;
  
  // البيانات يمكن أن تأتي من مصادر مختلفة حسب طريقة التمرير
  const paymentResult = state?.paymentResult || state?.paymentDetails || {};
  const paymentData = state?.paymentData || state?.paymentDetails || {};
  const formData = state?.formData || {};
  const card = state?.card || {};

  console.log('PaymentSuccess - Received state:', state);
  console.log('PaymentSuccess - PaymentResult:', paymentResult);
  console.log('PaymentSuccess - PaymentData:', paymentData);
  console.log('PaymentSuccess - FormData:', formData);
  console.log('PaymentSuccess - Card:', card);

  // في حالة عدم وجود بيانات، إعادة توجيه للصفحة الرئيسية
  useEffect(() => {
    if (!state || (!paymentResult && !paymentData)) {
      console.warn('PaymentSuccess - No payment data found, redirecting to home');
      navigate('/');
    }
  }, [state, paymentResult, paymentData, navigate]);

  return (
    <EnhancedSuccessMessage
      paymentResult={paymentResult}
      paymentData={paymentData}
      formData={formData}
      card={card}
      onDownloadReceipt={() => {
        // يمكن تخصيص هذه الوظيفة حسب الحاجة
        alert('سيتم تحميل الإيصال قريباً');
      }}
      onContactSupport={() => {
        // يمكن تخصيص هذه الوظيفة حسب الحاجة
        alert('سيتم توجيهك لصفحة الدعم الفني');
      }}
    />
  );
}

export default PaymentSuccess;
export { EnhancedSuccessMessage };