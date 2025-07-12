import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  FaDownload,
} from "react-icons/fa";
import "../Css/PaymentSuccess.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function EnhancedSuccessMessage({
  paymentResult,
  paymentData,
  formData,
  card,
  onDownloadReceipt,
  onContactSupport,
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
    if (
      title?.includes("مرور") ||
      title?.includes("رخصة") ||
      title?.includes("للرخص") ||
      title === "خدمات المرور"
    )
      return "خدمات المرور";
    if (title?.includes("مخالفات")) return "مخالفات المرور";
    return "خدمة أخرى";
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString("ar-EG"),
      time: now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = getCurrentDateTime();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleDownloadReceipt = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else {
      // منطق افتراضي لتحميل الإيصال
      console.log("تحميل الإيصال...");
    }
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      // منطق افتراضي للتواصل مع الدعم
      console.log("التواصل مع الدعم...");
    }
  };

  return (
    <div className="success-page-container">
      {/* قسم الاحتفال بالنجاح */}
      <div className="success-celebration">
        <div className="success-icon-large bounce-in">
          <FaCheckCircle />
        </div>
        <h1 className="success-title-large">تم الدفع بنجاح!</h1>
        <p className="success-subtitle">شكراً لك على استخدام خدماتنا</p>
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
              {formData?.NID || formData?.userData?.nationalId || "غير محدد"}
            </span>
          </div>

          {/* عرض اسم المستخدم لخدمات المرور */}
          {formData?.userData?.name && (
            <div className="payment-detail-item">
              <span className="payment-detail-label">اسم المستخدم</span>
              <span className="payment-detail-value">
                {formData.userData.name}
              </span>
            </div>
          )}

          {/* عرض قراءة العداد فقط للخدمات التي تحتاجها */}
          {(card?.title?.includes("كهرباء") ||
            card?.title?.includes("مياه") ||
            card?.title?.includes("غاز")) && (
            <div className="payment-detail-item">
              <span className="payment-detail-label">قراءة العداد</span>
              <span className="payment-detail-value">
                {formData?.currentReading || "غير محدد"}
              </span>
            </div>
          )}

          {(paymentData?.billNumber || paymentResult?.billNumber) && (
            <div className="payment-detail-item">
              <span className="payment-detail-label">رقم الفاتورة</span>
              <span className="payment-detail-value">
                #{paymentData?.billNumber || paymentResult?.billNumber}
              </span>
            </div>
          )}

          {/* عرض كود الدفع لخدمات المرور */}
          {paymentData?.paymentCode && (
            <div className="payment-detail-item">
              <span className="payment-detail-label">كود الدفع</span>
              <span className="payment-detail-value">
                {paymentData.paymentCode}
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
          {(paymentResult?.transactionId ||
            paymentResult?.paymentIntentId ||
            paymentData?.paymentIntentId) && (
            <div className="transaction-item">
              <span className="transaction-label">رقم المرجع</span>
              <span className="transaction-value">
                {paymentResult?.transactionId ||
                  paymentResult?.paymentIntentId ||
                  paymentData?.paymentIntentId}
              </span>
            </div>
          )}

          <div className="transaction-item">
            <span className="transaction-label">تاريخ العملية</span>
            <span className="transaction-value">
              {paymentResult?.date || date}
            </span>
          </div>

          <div className="transaction-item">
            <span className="transaction-label">وقت العملية</span>
            <span className="transaction-value">{time}</span>
          </div>

          <div className="transaction-item">
            <span className="transaction-label">حالة العملية</span>
            <span className="transaction-value" style={{ color: "#10b981" }}>
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

        <button className="action-button-secondary" onClick={handleGoHome}>
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

// وظيفة إنشاء PDF بتصميم جميل
function createBeautifulPDF(paymentData, paymentResult, formData, card) {
  const doc = new jsPDF();

  // إعداد الخط للعربية - استخدام خط يدعم العربية
  try {
    doc.setFont("helvetica");
  } catch (error) {
    console.warn("Font setting failed, using default");
  }

  // ألوان جميلة
  const primaryColor = [52, 152, 219]; // أزرق جميل
  const secondaryColor = [155, 89, 182]; // بنفسجي
  const successColor = [46, 204, 113]; // أخضر
  const textColor = [52, 73, 94]; // رمادي داكن
  const lightGray = [236, 240, 241]; // رمادي فاتح

  // إضافة شريط علوي ملون
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 25, "F");

  // إضافة شريط ثانوي
  doc.setFillColor(...secondaryColor);
  doc.rect(0, 25, 210, 5, "F");

  // عنوان الإيصال - باللغة الإنجليزية لتجنب مشاكل العربية
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Receipt", 105, 18, { align: "center" });

  // معلومات الشركة
  doc.setTextColor(...textColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Digital Bills Payment Platform", 105, 40, { align: "center" });

  // خط فاصل
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(1);
  doc.line(20, 50, 190, 50);

  // تفاصيل الفاتورة في صندوق
  doc.setFillColor(...lightGray);
  doc.roundedRect(20, 60, 170, 80, 3, 3, "F");

  // عنوان التفاصيل
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Bill Details", 105, 75, { align: "center" });

  // التفاصيل
  doc.setTextColor(...textColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date:
        now.getDate().toString().padStart(2, "0") +
        "/" +
        (now.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        now.getFullYear(),
      time:
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0"),
    };
  };

  const { date, time } = getCurrentDateTime();

  const details = [
    {
      label: "Service Type",
      value: card?.title ? translateServiceType(card.title) : "Not specified",
    },
    { label: "National ID", value: formData?.NID || "Not specified" },
    {
      label: "Meter Reading",
      value: formData?.currentReading || "Not specified",
    },
    {
      label: "Bill Number",
      value:
        paymentData?.billNumber || paymentResult?.billNumber || "Not available",
    },
    { label: "Transaction Date", value: date }, // استخدم التاريخ الإنجليزي فقط
    { label: "Transaction Time", value: time },
    {
      label: "Reference Number",
      value: (
        paymentResult?.transactionId ||
        paymentResult?.paymentIntentId ||
        paymentData?.paymentIntentId ||
        "Not available"
      ).toString(),
    },
  ];

  let yPosition = 90;
  details.forEach((detail, index) => {
    if (index % 2 === 0) {
      // خلفية متناوبة
      doc.setFillColor(248, 249, 250);
      doc.rect(25, yPosition - 5, 160, 12, "F");
    }

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(detail.label + ":", 30, yPosition);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    // التأكد من أن القيمة نص وليس undefined
    const value = detail.value ? detail.value.toString() : "Not available";
    doc.text(value, 80, yPosition);

    yPosition += 12;
  });

  // المبلغ المدفوع في صندوق مميز
  const amount = paymentData?.amount || paymentResult?.amount || "0";
  doc.setFillColor(...successColor);
  doc.roundedRect(20, yPosition + 10, 170, 25, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Amount Paid", 105, yPosition + 20, { align: "center" });

  doc.setFontSize(18);
  doc.text(amount + " EGP", 105, yPosition + 30, { align: "center" });

  // حالة العملية
  doc.setFillColor(212, 237, 218);
  doc.roundedRect(20, yPosition + 45, 170, 15, 3, 3, "F");

  doc.setTextColor(...successColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("✓ Payment Successful", 95, yPosition + 55, { align: "center" });

  // رسالة شكر
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for using our digital platform", 105, yPosition + 75, {
    align: "center",
  });
  doc.text("Please keep this receipt for your records", 105, yPosition + 85, {
    align: "center",
  });

  // شريط سفلي
  doc.setFillColor(...primaryColor);
  doc.rect(0, 285, 210, 10, "F");

  // رقم الصفحة والتاريخ
  doc.setTextColor(...lightGray);
  doc.setFontSize(8);
  doc.text("Generated on: " + date + " at " + time, 20, 280);
  doc.text("Page 1 of 1", 190, 280, { align: "right" });

  // حفظ الملف
  const fileName = `receipt_${
    paymentData?.billNumber || paymentResult?.billNumber || Date.now()
  }.pdf`;
  doc.save(fileName);
}

// وظيفة مساعدة لترجمة نوع الخدمة
function translateServiceType(serviceType) {
  if (serviceType?.includes("كهرباء")) return "Electricity";
  if (serviceType?.includes("مياه")) return "Water";
  if (serviceType?.includes("غاز")) return "Gas";
  if (serviceType?.includes("مرور") || serviceType?.includes("رخصة"))
    return "Traffic Services";
  if (serviceType?.includes("مخالفات")) return "Traffic Violations";
  return serviceType || "Other Service";
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

  console.log("PaymentSuccess - Received state:", state);
  console.log("PaymentSuccess - PaymentResult:", paymentResult);
  console.log("PaymentSuccess - PaymentData:", paymentData);
  console.log("PaymentSuccess - FormData:", formData);
  console.log("PaymentSuccess - Card:", card);

  // في حالة عدم وجود بيانات، إعادة توجيه للصفحة الرئيسية
  useEffect(() => {
    if (!state || (!paymentResult && !paymentData)) {
      console.warn(
        "PaymentSuccess - No payment data found, redirecting to home"
      );
      navigate("/");
    }
  }, [state, paymentResult, paymentData, navigate]);

  return (
    <EnhancedSuccessMessage
      paymentResult={paymentResult}
      paymentData={paymentData}
      formData={formData}
      card={card}
      onDownloadReceipt={() => {
        // إنشاء PDF بتصميم جميل
        createBeautifulPDF(paymentData, paymentResult, formData, card);
      }}
      onContactSupport={() => {
        // يمكن تخصيص هذه الوظيفة حسب الحاجة
        alert("سيتم توجيهك لصفحة الدعم الفني");
      }}
    />
  );
}

export default PaymentSuccess;
export { EnhancedSuccessMessage };
