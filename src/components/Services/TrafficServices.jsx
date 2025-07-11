import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TrafficServices.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { API_CONFIG } from "../../api/config";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import DeliveryData from "../DeliveryData";
import UserInfoDisplay from "../UserInfoDisplay";
// import { CheckCircle, Clock, Copy } from "react-feather";
const getTrafficServiceInfo = (serviceId) => {
  switch (serviceId) {
    case "DRIVING_RENEW":
      return {
        licenseType: "Driving License Renewal",
        serviceCode: "DRIVING_RENEW",
      };
    case "DRIVING_REPLACE_LOST":
      return {
        licenseType: "Lost License Replacement",
        serviceCode: "DRIVING_REPLACE_LOST",
      };
    case "TRAFFIC_FINE_PAY":
      return {
        licenseType: "Traffic Fine Payment",
        serviceCode: "TRAFFIC_FINE_PAY",
      };
    case "LICENSE_DIGITAL":
      return {
        licenseType: "Digital License Issuance",
        serviceCode: "LICENSE_DIGITAL",
      };
    default:
      return { licenseType: "", serviceCode: "" };
  }
};

const TrafficServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  // البيانات المشتركة
  const [selectedService, setSelectedService] = useState("");
  const [notes, setNotes] = useState("");
  const [mainDocument, setMainDocument] = useState(null);

  // بيانات الاستلام (فقط للخدمات التي تحتاج توصيل)
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [deliveryData, setDeliveryData] = useState({});

  // Extra Fields للخدمات المختلفة
  const [extraFields, setExtraFields] = useState({});
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);

  const showNavigationAndStepper =
    selectedService === "DRIVING_RENEW" ||
    selectedService === "DRIVING_REPLACE_LOST";
  // قائمة الخدمات المتاحة
  const serviceOptions = [
    {
      id: "DRIVING_RENEW",
      name: "تجديد رخصة قيادة",
      type: "Driving License Renewal",
      needsDelivery: true,
      fields: [
        {
          name: "previousLicenseNumber",
          label: "رقم الرخصة الحالي",
          type: "text",
          required: true,
        },
        {
          name: "licenseCategory",
          label: "نوع الرخصة",
          type: "select",
          options: ["خصوصي", "دراجة نارية"],
          required: true,
        },
        {
          name: "eyeTestResult",
          label: "نتيجة فحص العين",
          type: "select",
          options: ["سليم", "ضعيف", "يرتدي نظارة"],
          required: true,
        },
        {
          name: "medicalCertificateUrl",
          label: "شهادة الفحص الطبي",
          type: "file",
          required: true,
        },
        {
          name: "notes",
          label: "فترة التجديد",
          type: "select",
          options: ["سنة واحدة", "سنتين", "ثلاث سنوات"],
          required: false,
        },
      ],
    },
    {
      id: "DRIVING_REPLACE_LOST",
      name: "بدل فاقد / تالف للرخص",
      type: "Lost License Replacement",
      needsDelivery: true,
      fields: [
        {
          name: "lostLicenseType",
          label: "نوع الرخصة",
          type: "select",
          options: ["رخصة قيادة", "رخصة سيارة"],
          required: true,
        },
        {
          name: "licenseNumber",
          label: "رقم الرخصة الأصلية",
          type: "text",
          required: true,
        },
        {
          name: "lossType",
          label: "السبب",
          type: "select",
          options: ["فقدان", "تلف"],
          required: true,
        },
      ],
    },
    {
      id: "TRAFFIC_FINE_PAY",
      name: "مخالفات المرور ودفعها",
      type: "Traffic Fine Payment",
      needsDelivery: false,
      fields: [
        {
          name: "fineNumber",
          label: "رقم المخالفة",
          type: "text",
          required: true,
        },
        {
          name: "violationType",
          label: "نوع المخالفة",
          type: "select",
          options: [
            "تجاوز السرعة",
            "عدم التوقف عند الإشارة الحمراء",
            "الوقوف في مكان ممنوع",
            "عدم ربط حزام الأمان",
            "استخدام الهاتف أثناء القيادة",
          ],
          required: true,
        },
        {
          name: "violationDate",
          label: "تاريخ المخالفة",
          type: "date",
          required: true,
        },
        {
          name: "vehiclePlateNumber",
          label: "رقم اللوحة",
          type: "text",
          required: true,
        },
        {
          name: "amount",
          label: "مبلغ الغرامة",
          type: "number",
          required: true,
        },
      ],
    },
    {
      id: "LICENSE_DIGITAL",
      name: "طلب رخصة إلكترونية",
      type: "Digital License Issuance",
      needsDelivery: false,
      fields: [
        {
          name: "originalLicenseNumber",
          label: "رقم الرخصة الأصلية",
          type: "text",
          required: true,
        },
        {
          name: "licenseType",
          label: "نوع الرخصة",
          type: "select",
          options: ["قيادة خصوصي", "قيادة دراجة نارية", "قيادة تجاري"],
          required: true,
        },
        {
          name: "issueDate",
          label: "تاريخ الإصدار",
          type: "date",
          required: true,
        },
        {
          name: "expiryDate",
          label: "تاريخ الانتهاء",
          type: "date",
          required: true,
        },
        {
          name: "paperLicenseImage",
          label: "صورة الرخصة الورقية",
          type: "file",
          required: true,
          accept: "image/*,.pdf",
          description: "يرجى رفع صورة واضحة للرخصة الورقية",
        },
      ],
    },
  ];

  const currentService = serviceOptions.find(
    (service) => service.id === selectedService
  );

  useEffect(() => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    } else {
      setAuthError(null);
    }
  }, [user]);

  useEffect(() => {
    if (card?.title) {
      const matchedService = serviceOptions.find(
        (service) => service.name === card.title
      );
      if (matchedService) {
        setSelectedService(matchedService.id);
      }
    }
  }, [card]);

  // تعيين القيم الافتراضية للرخصة الإلكترونية
  useEffect(() => {
    if (selectedService === "LICENSE_DIGITAL") {
      setExtraFields((prev) => ({
        ...prev,
        generateQRCode: "true",
      }));
    }
  }, [selectedService]);

  const handleExpiredLicenseUpload = async (file) => {
    if (!file) return;

    try {
      setErrors((prev) => ({
        ...prev,
        expiredLicenseImage: null,
      }));

      const documentUrl = await uploadDocument(file);
      setExtraFields((prev) => ({
        ...prev,
        expiredLicenseImage: documentUrl,
      }));
    } catch (error) {
      console.error("Error uploading expired license:", error);
      setErrors((prev) => ({
        ...prev,
        expiredLicenseImage: error.message || "فشل في رفع صورة الرخصة المنتهية",
      }));
    }
  };

  // API functions
  const submitTrafficServiceRequest = async (requestData) => {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/License/submit-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      if (!response.ok) {
        if (isJson) {
          try {
            const errorData = await response.json();
            throw new Error(errorData.message || "فشل في إرسال الطلب");
          } catch (jsonError) {
            throw new Error(
              `خطأ في الخادم: ${response.status} ${response.statusText}`
            );
          }
        } else {
          const errorText = await response.text();
          throw new Error(
            errorText ||
              `خطأ في الخادم: ${response.status} ${response.statusText}`
          );
        }
      }
      // التحقق من وجود محتوى في الاستجابة
      const responseText = await response.text();

      if (!responseText || responseText.trim() === "") {
        // إذا كانت الاستجابة فارغة، نعيد كائن افتراضي
        return {
          success: true,
          message: "تم تقديم الطلب بنجاح",
          requestId: Date.now().toString(),
        };
      }

      // محاولة تحليل JSON
      try {
        return JSON.parse(responseText);
      } catch (jsonError) {
        console.warn(
          "Failed to parse JSON response, returning text response:",
          responseText
        );
        return {
          success: true,
          message: responseText,
          requestId: Date.now().toString(),
        };
      }
    } catch (error) {
      console.error("Error submitting traffic service request:", error);
      throw error;
    }
  };

  const uploadDocument = async (file) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token غير موجود. يرجى تسجيل الدخول مرة أخرى.");
      }

      const formData = new FormData();
      formData.append("file", file); // تغيير من "document" إلى "file"

      const response = await fetch(`${API_CONFIG.BASE_URL}/fileupload/single`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      if (!response.ok) {
        if (isJson) {
          try {
            const errorData = await response.json();
            throw new Error(errorData.message || "فشل في رفع الملف");
          } catch (jsonError) {
            throw new Error(
              `خطأ في الخادم: ${response.status} ${response.statusText}`
            );
          }
        } else {
          const errorText = await response.text();
          throw new Error(
            errorText ||
              `خطأ في الخادم: ${response.status} ${response.statusText}`
          );
        }
      }

      // التحقق من وجود محتوى في الاستجابة
      const responseText = await response.text();

      if (!responseText || responseText.trim() === "") {
        throw new Error("استجابة فارغة من الخادم");
      }

      // محاولة تحليل JSON
      try {
        const result = JSON.parse(responseText);
        return result.fileUrl || result.documentUrl || result.url; // التعامل مع الاستجابات المختلفة
      } catch (jsonError) {
        console.warn(
          "Failed to parse JSON response for file upload:",
          responseText
        );
        throw new Error("استجابة غير صحيحة من الخادم");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };

  const handleExtraFieldChange = (fieldName, value) => {
    setExtraFields((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // إذا كان الحقل هو notes (فترة التجديد)، حدث state notes أيضًا
    if (fieldName === "notes") {
      setNotes(value);
    }
  };

  const handleFileUpload = async (fieldName, file) => {
    if (!file) return;

    try {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));

      const documentUrl = await uploadDocument(file);
      setExtraFields((prev) => ({
        ...prev,
        [fieldName]: documentUrl,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error.message || "فشل في رفع الملف",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // للخدمات التي تحتاج صورة الرخصة المنتهية (فقط الخدمات التي تحتاج توصيل)
    if (currentService?.needsDelivery && !extraFields.expiredLicenseImage) {
      newErrors.expiredLicenseImage = "يرجى رفع صورة الرخصة المنتهية";
    }

    // التحقق من الحقول المطلوبة للخدمة المختارة
    if (currentService) {
      currentService.fields.forEach((field) => {
        if (field.required && !extraFields[field.name]) {
          newErrors[field.name] = `${field.label} مطلوب`;
        }
      });
    }

    // التحقق من صحة التواريخ للرخصة الإلكترونية
    if (selectedService === "LICENSE_DIGITAL") {
      const issueDate = new Date(extraFields.issueDate);
      const expiryDate = new Date(extraFields.expiryDate);

      if (issueDate && expiryDate && issueDate >= expiryDate) {
        newErrors.expiryDate = "تاريخ الانتهاء يجب أن يكون بعد تاريخ الإصدار";
      }
    }

    // التحقق من فترة التجديد لخدمة تجديد رخصة قيادة
    if (selectedService === "DRIVING_RENEW" && !extraFields.notes) {
      newErrors.notes = "فترة التجديد مطلوبة";
    }

    // التحقق من بيانات الاستلام للخدمات التي تحتاج توصيل فقط
    if (currentService?.needsDelivery) {
      if (!deliveryData.governorate) newErrors.governorate = "المحافظة مطلوبة";
      if (!deliveryData.city) newErrors.city = "المدينة مطلوبة";
      if (!deliveryData.district) newErrors.district = "الحي / المركز مطلوب";
      if (!deliveryData.detailedAddress)
        newErrors.detailedAddress = "العنوان التفصيلي مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // الانتقال للخطوة الثانية مع validation
  const handleNextToStep2 = () => {
    const newErrors = {};

    // التحقق من الحقول المطلوبة للخطوة الأولى
    if (currentService) {
      currentService.fields.forEach((field) => {
        if (field.required && !extraFields[field.name]) {
          newErrors[field.name] = `${field.label} مطلوب`;
        }
      });
    }

    // التحقق من رفع صورة الرخصة المنتهية للخدمات التي تحتاج توصيل
    if (currentService?.needsDelivery && !extraFields.expiredLicenseImage) {
      newErrors.expiredLicenseImage = "صورة الرخصة المنتهية مطلوبة";
    }

    // التحقق من فترة التجديد إذا كانت مطلوبة
    if (selectedService === "DRIVING_RENEW" && !extraFields.notes) {
      newErrors.notes = "فترة التجديد مطلوبة";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setActiveStep(2);
    }
  };

  const handleDeliveryData = (data) => {
    setDeliveryData(data);
    // تحديث البيانات المحلية أيضاً
    setGovernorate(data.governorate || "");
    setCity(data.city || "");
    setDistrict(data.district || "");
    setDetailedAddress(data.detailedAddress || "");
  };

  const handleNextToStep3 = () => {
    const newErrors = {};

    // التحقق من بيانات الاستلام
    if (!deliveryData.governorate) newErrors.governorate = "المحافظة مطلوبة";
    if (!deliveryData.city) newErrors.city = "المدينة مطلوبة";
    if (!deliveryData.district) newErrors.district = "الحي / المركز مطلوب";
    if (!deliveryData.detailedAddress)
      newErrors.detailedAddress = "العنوان التفصيلي مطلوب";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setActiveStep(3);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // فحص إضافي للتأكد من وجود البيانات المطلوبة
    if (!user?.nationalId) {
      setErrors({
        submit: "بيانات المستخدم غير مكتملة. يرجى تسجيل الدخول مرة أخرى.",
      });
      return;
    }

    if (!selectedService) {
      setErrors({
        submit: "يرجى اختيار نوع الخدمة.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { licenseType, serviceCode } =
        getTrafficServiceInfo(selectedService);

      // تجهيز الـ notes مع فترة التجديد
      let requestData = {
        licenseType,
        serviceCode,
        applicantNID: user.nationalId,
        Notes: extraFields.notes,
        extraFields: {
          ...extraFields,
          // إزالة فترة التجديد من extraFields لأنها ستكون في notes
          renewalPeriod: undefined,
        },
      };

      // إضافة بيانات الاستلام للخدمات التي تحتاج توصيل
      if (currentService?.needsDelivery) {
        requestData = {
          ...requestData,
          governorate: deliveryData.governorate,
          city: deliveryData.city,
          district: deliveryData.district,
          detailedAddress: deliveryData.detailedAddress,
        };
      }

      // رفع الوثيقة الأساسية للخدمات التي تحتاج توصيل
      if (currentService?.needsDelivery && extraFields.expiredLicenseImage) {
        requestData.uploadedDocumentUrl = extraFields.expiredLicenseImage;
      }

      // للرخصة الإلكترونية، الملف موجود بالفعل في extraFields
      if (selectedService === "LICENSE_DIGITAL") {
        requestData.uploadedDocumentUrl = extraFields.paperLicenseImage;
      }

      // لدفع المخالفات، لا نحتاج رفع ملفات
      if (selectedService === "TRAFFIC_FINE_PAY") {
        // إزالة أي حقول ملفات من extraFields لدفع المخالفات
        const { paperLicenseImage, expiredLicenseImage, ...cleanExtraFields } =
          extraFields;
        requestData.extraFields = cleanExtraFields;
      }

      console.log("Sending request to backend:", requestData);
      const response = await submitTrafficServiceRequest(requestData);
      console.log("Backend response:", response);

      // حفظ بيانات الطلب في localStorage
      const orderData = {
        serviceType: "خدمات المرور",
        documentType: currentService.name,
        requestId: response.requestId || response.id || `traffic_${Date.now()}`,
        responseData: response,
      };

      localStorage.setItem("lastTrafficOrder", JSON.stringify(orderData));

      navigate("/trafficDone", { state: orderData });
    } catch (error) {
      console.error("Error submitting request:", error);

      // تحسين رسالة الخطأ
      let errorMessage = "حدث خطأ أثناء تقديم الطلب";

      if (error.message) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "فشل في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.";
        } else if (error.message.includes("401")) {
          errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
        } else if (error.message.includes("403")) {
          errorMessage = "ليس لديك صلاحية لتنفيذ هذه العملية.";
        } else if (error.message.includes("500")) {
          errorMessage = "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.";
        } else {
          errorMessage = error.message;
        }
      }

      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => ({
      selectedService,
      extraFields,
      governorate,
      city,
      district,
      detailedAddress,
      notes,
    }),
  }));

  const renderField = (field) => {
    const value = extraFields[field.name] || "";
    const error = errors[field.name];

    switch (field.type) {
      case "text":
      case "number":
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              className={`form-control custom-input ${
                error ? "is-invalid" : ""
              }`}
              value={value}
              onChange={(e) =>
                handleExtraFieldChange(field.name, e.target.value)
              }
              placeholder={field.placeholder || `أدخل ${field.label}`}
              autoComplete="on"
            />
            {field.description && (
              <small className="form-text text-muted">
                {field.description}
              </small>
            )}
            {error && <div className="text-danger">{error}</div>}
          </div>
        );

      case "select":
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <select
              className={`form-select custom-select-style custom-input ${
                error ? "is-invalid" : ""
              }`}
              value={value}
              onChange={(e) =>
                handleExtraFieldChange(field.name, e.target.value)
              }
            >
              <option value="">اختر {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {field.description && (
              <small className="form-text text-muted">
                {field.description}
              </small>
            )}
            {error && <div className="text-danger">{error}</div>}
          </div>
        );

      case "date":
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type="date"
              className={`form-control custom-input ${
                error ? "is-invalid" : ""
              }`}
              value={value}
              onChange={(e) =>
                handleExtraFieldChange(field.name, e.target.value)
              }
            />
            {field.description && (
              <small className="form-text text-muted">
                {field.description}
              </small>
            )}
            {error && <div className="text-danger">{error}</div>}
          </div>
        );

      case "file":
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <div className="file-input-container">
              <input
                type="file"
                id={field.name}
                accept={field.accept || "image/*,.pdf"}
                onChange={(e) =>
                  handleFileUpload(field.name, e.target.files[0])
                }
              />
              <label htmlFor={field.name} className="file-input-label">
                <span className="file-name">
                  {extraFields[field.name]
                    ? typeof extraFields[field.name] === "string"
                      ? "تم رفع الملف"
                      : extraFields[field.name].name || "تم رفع الملف"
                    : "لم يتم اختيار ملف"}
                </span>
                <span className="browse-button">اختر ملف</span>
              </label>
            </div>
            {field.description && (
              <small className="form-text text-muted">
                {field.description}
              </small>
            )}
            {error && <div className="text-danger">{error}</div>}
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="mt-3 p-3">
        <Alert variant="warning" className="mb-3">
          <p className="mb-0">{authError}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-3">
        {showNavigationAndStepper && (
          <>
            <Steppar
              active={activeStep}
              setActive={setActiveStep}
              formData={{
                ...extraFields,
                ...deliveryData,
                card,
              }}
            />
            <NavigationButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              formData={{
                ...extraFields,
                ...deliveryData,
                card,
              }}
            />
          </>
        )}
      </div>

      <div className="p-3">
        {currentService && activeStep === 1 && (
          <div>
            <div className="mt-1">
              <div className="row">
                {currentService.fields.map((field) => (
                  <div key={field.name} className="col-md-6">
                    {renderField(field)}
                  </div>
                ))}
              </div>

              {/* رفع صورة الرخصة المنتهية - فقط لخدمة تجديد الرخصة */}
              {selectedService === "DRIVING_RENEW" && (
                <div className="mt-4">
                  <h5 className="text-color mb-3">صورة الرخصة المنتهية</h5>
                  <div className="file-input-container">
                    <input
                      type="file"
                      id="expiredLicenseImage"
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        handleExpiredLicenseUpload(e.target.files[0])
                      }
                    />
                    <label
                      htmlFor="expiredLicenseImage"
                      className="file-input-label"
                    >
                      <span className="file-name">
                        {extraFields.expiredLicenseImage
                          ? "تم رفع صورة الرخصة المنتهية"
                          : "لم يتم اختيار ملف"}
                      </span>
                      <span className="browse-button">اختر ملف</span>
                    </label>
                  </div>
                  <small className="form-text text-muted">
                    يرجى رفع صورة واضحة للرخصة المنتهية الصلاحية
                  </small>
                  {errors.expiredLicenseImage && (
                    <div className="text-danger mt-2">
                      {errors.expiredLicenseImage}
                    </div>
                  )}
                </div>
              )}

              {/* رفع الملفات حسب السبب في بدل فاقد/تالف للرخص */}
              {selectedService === "DRIVING_REPLACE_LOST" && (
                <div className="mt-4">
                  {extraFields.lossType === "تلف" && (
                    <div>
                      <h5 className="text-color mb-3">صورة الرخصة التالفة</h5>
                      <div className="file-input-container">
                        <input
                          type="file"
                          id="damagedLicenseUrl"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            handleFileUpload(
                              "damagedLicenseUrl",
                              e.target.files[0]
                            )
                          }
                        />
                        <label
                          htmlFor="damagedLicenseUrl"
                          className="file-input-label"
                        >
                          <span className="file-name">
                            {extraFields.damagedLicenseUrl
                              ? "تم رفع صورة الرخصة التالفة"
                              : "لم يتم اختيار ملف"}
                          </span>
                          <span className="browse-button">اختر ملف</span>
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        يرجى رفع صورة الرخصة التالفة فقط في حالة التلف
                      </small>
                      {errors.damagedLicenseUrl && (
                        <div className="text-danger mt-2">
                          {errors.damagedLicenseUrl}
                        </div>
                      )}
                    </div>
                  )}
                  {extraFields.lossType === "فقدان" && (
                    <div>
                      <h5 className="text-color mb-3">محضر الشرطة</h5>
                      <div className="file-input-container">
                        <input
                          type="file"
                          id="policeReportUrl"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            handleFileUpload(
                              "policeReportUrl",
                              e.target.files[0]
                            )
                          }
                        />
                        <label
                          htmlFor="policeReportUrl"
                          className="file-input-label"
                        >
                          <span className="file-name">
                            {extraFields.policeReportUrl
                              ? "تم رفع محضر الشرطة"
                              : "لم يتم اختيار ملف"}
                          </span>
                          <span className="browse-button">اختر ملف</span>
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        يرجى رفع محضر الشرطة فقط في حالة الفقدان
                      </small>
                      {errors.policeReportUrl && (
                        <div className="text-danger mt-2">
                          {errors.policeReportUrl}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
              <h4 className="mb-3">
                ⚠️ معلومات هامة عن {currentService.name}:
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-start">
                  <span className="me-2 text-warning">💡</span>
                  <span>
                    يرجى التأكد من صحة جميع البيانات المدخلة قبل التقديم.
                  </span>
                </li>
                <li className="mb-2 d-flex align-items-start">
                  <span className="me-2 text-warning">💡</span>
                  <span>يجب أن تكون جميع الوثائق المرفوعة واضحة ومقروءة.</span>
                </li>
                <li className="mb-2 d-flex align-items-start">
                  <span className="me-2 text-warning">💡</span>
                  <span>ستتم مراجعة الطلب خلال 3-5 أيام عمل.</span>
                </li>
                {selectedService === "LICENSE_DIGITAL" && (
                  <li className="mb-2 d-flex align-items-start">
                    <span className="me-2 text-warning">💡</span>
                    <span>سيتم إنشاء رمز QR للرخصة الإلكترونية تلقائياً.</span>
                  </li>
                )}
              </ul>
            </div>

            {/* زر تقديم الطلب للخدمات التي لا تحتاج stepper */}
            {!showNavigationAndStepper && (
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "جاري تقديم الطلب..."
                  ) : (
                    <>
                      تقديم الطلب &nbsp; <FaArrowLeftLong size={20} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* بيانات الاستلام - للخدمات التي تحتاج توصيل فقط */}
        {currentService?.needsDelivery && activeStep === 2 && (
          <div className="mt-3 p-3">
            <DeliveryData onDataChange={handleDeliveryData} errors={errors} />
          </div>
        )}

        {/* الخطوة الثالثة - مراجعة وتأكيد */}
        {currentService && activeStep === 3 && (
          <>
            <div className="mt-3 p-3">
              <h3 className="text-color mb-4">تأكيد الطلب</h3>
              <div className="card mb-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0 text-color">بيانات الطلب</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <UserInfoDisplay />
                    <div className="col-md-6">
                      <h5>البيانات الأساسية:</h5>
                      {currentService.fields.map((field) => (
                        <div key={field.name} className="mb-2">
                          <strong>{field.label}:</strong>{" "}
                          {extraFields[field.name] || "غير محدد"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {currentService.needsDelivery && (
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0 text-color">بيانات الاستلام</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>المحافظة:</strong> {deliveryData.governorate}
                        </p>
                        <p>
                          <strong>المدينة:</strong> {deliveryData.city}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>الحي/المركز:</strong> {deliveryData.district}
                        </p>
                        <p>
                          <strong>العنوان التفصيلي:</strong>{" "}
                          {deliveryData.detailedAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* أزرار التنقل */}
        {showNavigationAndStepper && activeStep < 3 && (
          <div className="d-flex justify-content-end">
            <button
              className="btn nav-btn btn-outline-secondry mt-3 p2-4 py-2 fs-5"
              onClick={activeStep === 1 ? handleNextToStep2 : handleNextToStep3}
            >
              التالي &nbsp; <FaArrowLeftLong size={20} />
            </button>
          </div>
        )}

        {activeStep === 3 && (
          <div className="d-flex justify-content-end">
            <button
              className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "جاري تقديم الطلب..."
              ) : (
                <>
                  تقديم الطلب &nbsp; <FaArrowLeftLong size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {errors.submit && (
        <Alert variant="danger" className="mt-3">
          {errors.submit}
        </Alert>
      )}

      {/* رسالة خطأ للخدمات التي لا تحتاج stepper */}
      {!showNavigationAndStepper && errors.submit && (
        <div className="p-3">
          <Alert variant="danger" className="mt-3">
            {errors.submit}
          </Alert>
        </div>
      )}
    </div>
  );
});

export default TrafficServices;
