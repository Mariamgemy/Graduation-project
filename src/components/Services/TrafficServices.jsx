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
import Line from "../Line";
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
  const [notes, setNotes] = useState("لا توجد ملاحظات");
  const [mainDocument, setMainDocument] = useState(null);

  // بيانات الاستلام (فقط للخدمات التي تحتاج توصيل)
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  // Extra Fields للخدمات المختلفة
  const [extraFields, setExtraFields] = useState({});
  const [errors, setErrors] = useState({});

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
          name: "renewalPeriod",
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
        {
          name: "policeReportUrl",
          label: "محضر الشرطة (في حالة الفقد)",
          type: "file",
          required: false,
        },
        {
          name: "damagedLicenseUrl",
          label: "صورة الرخصة التالفة",
          type: "file",
          required: false,
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في إرسال الطلب");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting traffic service request:", error);
      throw error;
    }
  };

  const uploadDocument = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // تغيير من "document" إلى "file"

      const response = await fetch(`${API_CONFIG.BASE_URL}/fileupload/single`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في رفع الملف");
      }

      const result = await response.json();
      return result.fileUrl || result.documentUrl; // التعامل مع الاستجابات المختلفة
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

    // للخدمات التي تحتاج mainDocument
    if (currentService?.needsDelivery && !mainDocument) {
      newErrors.mainDocument = "يرجى رفع الوثيقة الأساسية";
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

    // التحقق من بيانات الاستلام للخدمات التي تحتاج توصيل
    if (currentService?.needsDelivery) {
      if (!governorate) newErrors.governorate = "المحافظة مطلوبة";
      if (!city) newErrors.city = "المدينة مطلوبة";
      if (!district) newErrors.district = "الحي / المركز مطلوب";
      if (!detailedAddress) newErrors.detailedAddress = "العنوان التفصيلي مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { licenseType, serviceCode } = getTrafficServiceInfo(selectedService);

      let requestData = {
        licenseType,
        serviceCode,
        applicantNID: user.nationalId,
        Notes: notes,
        extraFields,
      };

      // إضافة بيانات الاستلام للخدمات التي تحتاج توصيل
      if (currentService?.needsDelivery) {
        requestData = {
          ...requestData,
          governorate,
          city,
          district,
          detailedAddress,
        };
      }

      // رفع الوثيقة الأساسية للخدمات التي تحتاج توصيل
      if (currentService?.needsDelivery && mainDocument) {
        const uploadedDocumentUrl = await uploadDocument(mainDocument);
        requestData.uploadedDocumentUrl = uploadedDocumentUrl;
      }

      // للرخصة الإلكترونية، الملف موجود بالفعل في extraFields
      if (selectedService === "LICENSE_DIGITAL") {
        requestData.uploadedDocumentUrl = extraFields.paperLicenseImage;
      }

      const response = await submitTrafficServiceRequest(requestData);
      
      // حفظ بيانات الطلب في localStorage
      const orderData = {
        serviceType: "خدمات المرور",
        documentType: currentService.name,
        requestId: response.requestId || response.id,
        responseData: response,
      };
      
      localStorage.setItem("lastTrafficOrder", JSON.stringify(orderData));
      
      navigate("/trafficDone", { state: orderData });
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({
        submit: error.message || "حدث خطأ أثناء تقديم الطلب",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => ({
      selectedService,
      mainDocument,
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
              className={`form-control custom-input ${error ? "is-invalid" : ""}`}
              value={value}
              onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder || `أدخل ${field.label}`}
            />
            {field.description && (
              <small className="form-text text-muted">{field.description}</small>
            )}
            {error && <div className="text-danger">{error}</div>}
          </div>
        );

      case "select":
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <select
              className={`form-select custom-select-style custom-input ${error ? "is-invalid" : ""}`}
              value={value}
              onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
            >
              <option value="">اختر {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {field.description && (
              <small className="form-text text-muted">{field.description}</small>
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
              className={`form-control custom-input ${error ? "is-invalid" : ""}`}
              value={value}
              onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
            />
            {field.description && (
              <small className="form-text text-muted">{field.description}</small>
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
                onChange={(e) => handleFileUpload(field.name, e.target.files[0])}
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
              <small className="form-text text-muted">{field.description}</small>
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
      <div className="p-3">
        {/* رفع الوثيقة الأساسية - للخدمات التي تحتاج توصيل فقط */}
        {currentService?.needsDelivery && (
          <div className="mb-4">
            <label className="form-label">الوثيقة الأساسية</label>
            <div className="file-input-container">
              <input
                type="file"
                id="mainDocument"
                accept="image/*,.pdf"
                onChange={(e) => setMainDocument(e.target.files[0])}
              />
              <label htmlFor="mainDocument" className="file-input-label">
                <span className="file-name">
                  {mainDocument ? mainDocument.name : "لم يتم اختيار ملف"}
                </span>
                <span className="browse-button">اختر ملف</span>
              </label>
            </div>
            {errors.mainDocument && (
              <div className="text-danger">{errors.mainDocument}</div>
            )}
          </div>
        )}

        {/* حقول الخدمة المختارة */}
        {currentService && (
          <div className="">
<Line/>
            {/* <h4 className="text-color mb-3"> بيانات {currentService.name}</h4> */}
            <div className="row">
              {currentService.fields.map((field) => (
                <div key={field.name} className="col-md-6">
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* بيانات الاستلام - للخدمات التي تحتاج توصيل فقط */}
        {currentService?.needsDelivery && (
          <div className="mt-4">
            <h4 className="text-color mb-3">بيانات الاستلام</h4>
            <Alert variant="secondary" className="mb-4">
              <p className="mb-0">
                💡 يرجى إدخال بيانات الاستلام بشكل صحيح لتسهيل عملية توصيل الوثيقة
              </p>
            </Alert>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">المحافظة</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${errors.governorate ? "is-invalid" : ""}`}
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    placeholder="أدخل المحافظة"
                  />
                  {errors.governorate && (
                    <div className="text-danger">{errors.governorate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">المدينة</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${errors.city ? "is-invalid" : ""}`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="أدخل المدينة"
                  />
                  {errors.city && (
                    <div className="text-danger">{errors.city}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">الحي / المركز</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${errors.district ? "is-invalid" : ""}`}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="أدخل الحي أو المركز"
                  />
                  {errors.district && (
                    <div className="text-danger">{errors.district}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">العنوان بالتفصيل</label>
                  <textarea
                    className={`form-control custom-input ${errors.detailedAddress ? "is-invalid" : ""}`}
                    rows="3"
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                    placeholder="أدخل العنوان بالتفصيل..."
                  />
                  {errors.detailedAddress && (
                    <div className="text-danger">{errors.detailedAddress}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* معلومات إضافية عن الخدمة */}
        {currentService && (
          <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
            <h4 className="mb-3">⚠️ معلومات هامة عن {currentService.name}:</h4>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start">
                <span className="me-2 text-warning">💡</span>
                <span>يرجى التأكد من صحة جميع البيانات المدخلة قبل التقديم.</span>
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
        )}
      </div>

      {/* زر تقديم الطلب */}
      <div className="text-start p-3">
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

      {errors.submit && (
        <Alert variant="danger" className="mt-3">
          {errors.submit}
        </Alert>
      )}
    </div>
  );
});

export default TrafficServices;