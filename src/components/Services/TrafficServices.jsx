import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TrafficServices.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import PaymentMethods from "../PaymentMethod";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { FaFileAlt, FaCheck } from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import Sidebar from "../SideBar";

const TrafficServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentBill, setPaymentBill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  //بيانات الاستلام
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  // تجديد رخصة قيادة
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [renewalPeriod, setRenewalPeriod] = useState("");
  const [medicalResult, setMedicalResult] = useState(null);
  const [eyeTestResult, setEyeTestResult] = useState("");

  // بدل فاقد/تالف
  const [isSelf, setIsSelf] = useState("");
  const [currentLicenseNumber, setCurrentLicenseNumber] = useState("");
  const [policeReport, setPoliceReport] = useState(null);
  const [damagedLicensePhoto, setDamagedLicensePhoto] = useState(null);

  // دفع المخالفات المرورية
  const [violationNumber, setViolationNumber] = useState("");
  const [violationType, setViolationType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [violationDate, setViolationDate] = useState("");
  const [fineAmount, setFineAmount] = useState("");
  const [paymentReceipt, setPaymentReceipt] = useState(null);

  // الرخصة الإلكترونية
  const [originalLicenseNumber, setOriginalLicenseNumber] = useState("");
  const [digitalLicenseType, setDigitalLicenseType] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [paperLicensePhoto, setPaperLicensePhoto] = useState(null);

  const [errors, setErrors] = useState({});

  const navigationSteps = {
    "مخالفات المرور ودفعها": [
      { label: "بيانات المخالفة", icon: <BsFillPersonVcardFill /> },
      { label: "دفع المخالفة", icon: <FaFileAlt /> },
      { label: "تأكيد الطلب", icon: <FaCheck /> },
    ],
    "الرخصة الإلكترونية بالباركود": [
      { label: "بيانات الرخصة", icon: <BsFillPersonVcardFill /> },
      { label: "رفع الوثائق", icon: <FaFileAlt /> },
      { label: "تأكيد الطلب", icon: <FaCheck /> },
    ],
  };

  const currentStepLabels = navigationSteps[card?.title] || [
    { label: "بيانات الطلب", icon: <BsFillPersonVcardFill /> },
    { label: "بيانات الاستلام", icon: <FaFileAlt /> },
    { label: "تأكيد الطلب", icon: <FaCheck /> },
  ];

  useEffect(() => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    } else {
      setAuthError(null);
    }
  }, [user]);

  // API functions
  const submitTrafficServiceRequest = async (requestData) => {
    try {
      const response = await fetch("/api/traffic-services/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("فشل في إرسال الطلب");
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
      formData.append("document", file);

      const response = await fetch("/api/upload-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("فشل في رفع الملف");
      }

      const result = await response.json();
      return result.documentUrl;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeStep === 1) {
      if (card.title === "تجديد رخصة قيادة") {
        if (!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
        if (!medicalResult) newErrors.medicalResult = "هذا الحقل مطلوب";
        if (!licenseNumber) newErrors.licenseNumber = "هذا الحقل مطلوب";
        if (!licenseType) newErrors.licenseType = "هذا الحقل مطلوب";
        if (!renewalPeriod) newErrors.renewalPeriod = "هذا الحقل مطلوب";
        if (!eyeTestResult) newErrors.eyeTestResult = "هذا الحقل مطلوب";
      }

      if (card.title === "بدل فاقد / تالف للرخص") {
        if (!licenseType) newErrors.licenseType = "هذا الحقل مطلوب";
        if (!currentLicenseNumber)
          newErrors.currentLicenseNumber = "هذا الحقل مطلوب";
        if (!isSelf) newErrors.isSelf = "هذا الحقل مطلوب";
        if (isSelf === false && !policeReport)
          newErrors.policeReport = "هذا الحقل مطلوب";
        if (isSelf === true && !damagedLicensePhoto)
          newErrors.damagedLicensePhoto = "هذا الحقل مطلوب";
      }

      if (card.title === "مخالفات المرور ودفعها") {
        if (!violationNumber) newErrors.violationNumber = "هذا الحقل مطلوب";
        if (!violationType) newErrors.violationType = "هذا الحقل مطلوب";
        if (!plateNumber) newErrors.plateNumber = "هذا الحقل مطلوب";
        if (!fineAmount) newErrors.fineAmount = "هذا الحقل مطلوب";
        if (!violationDate) newErrors.violationDate = "هذا الحقل مطلوب";
        if (!paymentReceipt) newErrors.paymentReceipt = "هذا الحقل مطلوب";
      }

      if (card.title === "رخصة إلكترونية") {
        if (!originalLicenseNumber)
          newErrors.originalLicenseNumber = "هذا الحقل مطلوب";
        if (!digitalLicenseType)
          newErrors.digitalLicenseType = "هذا الحقل مطلوب";
        if (!issueDate) newErrors.issueDate = "هذا الحقل مطلوب";
        if (!expiryDate) newErrors.expiryDate = "هذا الحقل مطلوب";
        if (!paperLicensePhoto) newErrors.paperLicensePhoto = "هذا الحقل مطلوب";
      }
    }

    if (activeStep === 2) {
      if (!governorate) newErrors.governorate = "المحافظة مطلوبة";
      if (!city) newErrors.city = "المدينة مطلوبة";
      if (!district) newErrors.district = "الحي / المركز مطلوب";
      if (!detailedAddress)
        newErrors.detailedAddress = "العنوان التفصيلي مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let requestData = {
        applicantNID: user.nationalId,
        governorate,
        city,
        district,
        detailedAddress,
      };

      // تجديد رخصة قيادة
      if (card.title === "تجديد رخصة قيادة") {
        const personalPhotoUrl = await uploadDocument(personalPhoto);
        const medicalResultUrl = await uploadDocument(medicalResult);

        requestData = {
          ...requestData,
          licenseType: "Driving License Renewal",
          serviceCode: "DRIVING_RENEW",
          uploadedDocumentUrl: personalPhotoUrl,
          Notes: "No notes",
          extraFields: {
            previousLicenseNumber: licenseNumber,
            licenseCategory:
              licenseType === "private" ? "خصوصي" : "دراجة نارية",
            eyeTestResult: eyeTestResult,
            medicalCertificateUrl: medicalResultUrl,
          },
        };
      }

      // بدل فاقد/تالف
      if (card.title === "بدل فاقد / تالف للرخص") {
        let documentUrl = "";
        if (isSelf === false) {
          documentUrl = await uploadDocument(policeReport);
        } else {
          documentUrl = await uploadDocument(damagedLicensePhoto);
        }

        requestData = {
          ...requestData,
          licenseType: "Lost License Replacement",
          serviceCode: "DRIVING_REPLACE_LOST",
          uploadedDocumentUrl: documentUrl,
          extraFields: {
            lostLicenseType: licenseType === "1" ? "رخصة قيادة" : "رخصة سيارة",
            licenseNumber: currentLicenseNumber,
            lossReportNumber: `LR-${new Date()
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "")}-${Math.floor(Math.random() * 1000)}`,
            policeReportUrl: isSelf === false ? documentUrl : "",
          },
        };
      }

      // دفع المخالفات المرورية
      if (card.title === "مخالفات المرور ودفعها") {
        const receiptUrl = await uploadDocument(paymentReceipt);

        requestData = {
          ...requestData,
          licenseType: "Traffic Fine Payment",
          serviceCode: "TRAFFIC_FINE_PAY",
          uploadedDocumentUrl: receiptUrl,
          extraFields: {
            fineNumber: violationNumber,
            violationType: violationType,
            violationDate: violationDate,
            vehiclePlateNumber: plateNumber,
            amount: fineAmount,
          },
        };
      }

      // الرخصة الإلكترونية
      if (card.title === "الرخصة الإلكترونية بالباركود") {
        const licensePhotoUrl = await uploadDocument(paperLicensePhoto);

        requestData = {
          ...requestData,
          licenseType: "Digital License Issuance",
          serviceCode: "LICENSE_DIGITAL",
          uploadedDocumentUrl: licensePhotoUrl,
          extraFields: {
            originalLicenseNumber: originalLicenseNumber,
            licenseType: digitalLicenseType,
            issueDate: issueDate,
            expiryDate: expiryDate,
            generateQRCode: "true",
          },
        };
      }

      console.log("Sending request to backend:", requestData);
      const response = await submitTrafficServiceRequest(requestData);
      console.log("Backend response:", response);

      // حفظ بيانات الطلب في localStorage
      localStorage.setItem(
        "lastTrafficOrder",
        JSON.stringify({
          serviceType: "خدمات المرور",
          documentType: card.title,
          requestId: response.requestId || response.id,
          responseData: response,
        })
      );

      // Navigate to success page
      navigate("/trafficDone", {
        state: {
          serviceType: "خدمات المرور",
          documentType: card.title,
          requestId: response.requestId || response.id,
          responseData: response,
        },
      });
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
      card,
      licenseType,
      licenseNumber,
      personalPhoto,
      medicalResult,
      renewalPeriod,
      governorate,
      city,
      district,
      detailedAddress,
    }),
  }));

  const renderStepContent = () => {
    if (!user) {
      return (
        <div className="mt-3 p-3">
          <Alert variant="warning" className="mb-3">
            <p className="mb-0">{authError}</p>
          </Alert>
        </div>
      );
    }

    switch (activeStep) {
      case 1:
        return (
          <div>
            {/* تجديد رخصة قيادة */}
            {card.title === "تجديد رخصة قيادة" && (
              <>
                <div className="mt-3 p-3">
                  <h3 className="text-color mb-3">بيانات الرخصة</h3>
                  <div className="mb-3">
                    <label className="form-label">نوع الرخصة</label>
                    <select
                      className={`form-select custom-select-style custom-input ${
                        errors.licenseType ? "is-invalid" : ""
                      }`}
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                    >
                      <option value="">اختر نوع الرخصة</option>
                      <option value="private">رخصة خاصة</option>
                      <option value="motorcycle">رخصة دراجة نارية</option>
                    </select>
                    {errors.licenseType && (
                      <div className="text-danger">{errors.licenseType}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">رقم الرخصة الحالي</label>
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.licenseNumber ? "is-invalid" : ""
                      }`}
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="أدخل رقم الرخصة الحالي"
                    />
                    {errors.licenseNumber && (
                      <div className="text-danger">{errors.licenseNumber}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">نتيجة فحص العين</label>
                    <select
                      className={`form-select custom-select-style custom-input ${
                        errors.eyeTestResult ? "is-invalid" : ""
                      }`}
                      value={eyeTestResult}
                      onChange={(e) => setEyeTestResult(e.target.value)}
                    >
                      <option value="">اختر نتيجة فحص العين</option>
                      <option value="سليم">سليم</option>
                      <option value="ضعيف">ضعيف</option>
                      <option value="يرتدي نظارة">يرتدي نظارة</option>
                    </select>
                    {errors.eyeTestResult && (
                      <div className="text-danger">{errors.eyeTestResult}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">صورة شخصية جديدة</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="personalPhoto"
                        accept="image/*"
                        onChange={(e) => setPersonalPhoto(e.target.files[0])}
                      />
                      <label
                        htmlFor="personalPhoto"
                        className="file-input-label"
                      >
                        <span className="file-name">
                          {personalPhoto
                            ? personalPhoto.name
                            : "لم يتم اختيار ملف"}
                        </span>
                        <span className="browse-button">اختر ملف</span>
                      </label>
                    </div>
                    {errors.personalPhoto && (
                      <div className="text-danger">{errors.personalPhoto}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">شهادة الفحص الطبي</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="medicalResult"
                        accept="image/*,.pdf"
                        onChange={(e) => setMedicalResult(e.target.files[0])}
                      />
                      <label
                        htmlFor="medicalResult"
                        className="file-input-label"
                      >
                        <span className="file-name">
                          {medicalResult
                            ? medicalResult.name
                            : "لم يتم اختيار ملف"}
                        </span>
                        <span className="browse-button">اختر ملف</span>
                      </label>
                    </div>
                    {errors.medicalResult && (
                      <div className="text-danger">{errors.medicalResult}</div>
                    )}
                  </div>
                </div>

                <div className="mt-2 p-4 bg-light rounded-3 border border-2 border-color">
                  <h4 className="mb-3">⚠️ ضوابط تجديد رخصة القيادة:</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>يجب أن تكون بطاقة الرقم القومي سارية.</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب تقديم شهادة فحص طبي تثبت اللياقة البدنية والعقلية.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>يجب سداد جميع المخالفات المرورية قبل التجديد.</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {/* بدل فاقد/تالف */}
            {card.title === "بدل فاقد / تالف للرخص" && (
              <>
                <div className="mb-3">
                  <label className="form-label">نوع الرخصة</label>
                  <select
                    className={`form-select custom-select-style custom-input ${
                      errors.licenseType ? "is-invalid" : ""
                    }`}
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value)}
                  >
                    <option value="">اختر نوع الرخصة</option>
                    <option value="1">رخصة قيادة</option>
                    <option value="2">رخصة سيارة</option>
                  </select>
                  {errors.licenseType && (
                    <div className="text-danger">{errors.licenseType}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">رقم الرخصة الأصلية</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.currentLicenseNumber ? "is-invalid" : ""
                    }`}
                    value={currentLicenseNumber}
                    onChange={(e) => setCurrentLicenseNumber(e.target.value)}
                    placeholder="أدخل رقم الرخصة الأصلية"
                  />
                  {errors.currentLicenseNumber && (
                    <div className="text-danger">
                      {errors.currentLicenseNumber}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">السبب</label>
                  <div className="d-flex gap-5">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="isSelf"
                        className="form-check-input"
                        checked={isSelf === true}
                        onChange={() => setIsSelf(true)}
                      />
                      <label className="form-check-label">تلف</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="isSelf"
                        className="form-check-input"
                        checked={isSelf === false}
                        onChange={() => setIsSelf(false)}
                      />
                      <label className="form-check-label">فقدان</label>
                    </div>
                  </div>
                  {errors.isSelf && (
                    <div className="text-danger">{errors.isSelf}</div>
                  )}
                </div>

                {isSelf === true && (
                  <div className="mb-3">
                    <label className="form-label">
                      صورة الرخصة التالفة (إن وجدت)
                    </label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="damagedLicensePhoto"
                        accept="image/*"
                        onChange={(e) =>
                          setDamagedLicensePhoto(e.target.files[0])
                        }
                      />
                      <label
                        htmlFor="damagedLicensePhoto"
                        className="file-input-label"
                      >
                        <span className="file-name">
                          {damagedLicensePhoto
                            ? damagedLicensePhoto.name
                            : "لم يتم اختيار ملف"}
                        </span>
                        <span className="browse-button">اختر ملف</span>
                      </label>
                    </div>
                    {errors.damagedLicensePhoto && (
                      <div className="text-danger">
                        {errors.damagedLicensePhoto}
                      </div>
                    )}
                  </div>
                )}

                {isSelf === false && (
                  <div className="mb-3">
                    <label className="form-label">
                      محضر الشرطة (في حالة الفقد)
                    </label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="policeReport"
                        accept="image/*,.pdf"
                        onChange={(e) => setPoliceReport(e.target.files[0])}
                      />
                      <label
                        htmlFor="policeReport"
                        className="file-input-label"
                      >
                        <span className="file-name">
                          {policeReport
                            ? policeReport.name
                            : "لم يتم اختيار ملف"}
                        </span>
                        <span className="browse-button">اختر ملف</span>
                      </label>
                    </div>
                    {errors.policeReport && (
                      <div className="text-danger">{errors.policeReport}</div>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <PaymentMethods />
                </div>
              </>
            )}

            {/* دفع المخالفات المرورية */}
            {card.title === "مخالفات المرور ودفعها" && (
              <div className="violation-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-section">
                      <h4 className="section-title mb-3">بيانات المخالفة</h4>

                      <div className="mb-3">
                        <label className="form-label">رقم المخالفة</label>
                        <input
                          type="text"
                          className={`form-control custom-input ${
                            errors.violationNumber ? "is-invalid" : ""
                          }`}
                          value={violationNumber}
                          onChange={(e) => setViolationNumber(e.target.value)}
                          placeholder="أدخل رقم المخالفة"
                        />
                        {errors.violationNumber && (
                          <div className="text-danger">
                            {errors.violationNumber}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">رقم اللوحة</label>
                        <input
                          type="text"
                          className={`form-control custom-input ${
                            errors.plateNumber ? "is-invalid" : ""
                          }`}
                          value={plateNumber}
                          onChange={(e) => setPlateNumber(e.target.value)}
                          placeholder="أدخل رقم اللوحة"
                        />
                        {errors.plateNumber && (
                          <div className="text-danger">
                            {errors.plateNumber}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">نوع المخالفة</label>
                        <select
                          className={`form-select custom-select-style custom-input ${
                            errors.violationType ? "is-invalid" : ""
                          }`}
                          value={violationType}
                          onChange={(e) => setViolationType(e.target.value)}
                        >
                          <option value="">اختر نوع المخالفة</option>
                          <option value="تجاوز السرعة">تجاوز السرعة</option>
                          <option value="عدم التوقف عند الإشارة الحمراء">
                            عدم التوقف عند الإشارة الحمراء
                          </option>
                          <option value="الوقوف في مكان ممنوع">
                            الوقوف في مكان ممنوع
                          </option>
                          <option value="عدم ربط حزام الأمان">
                            عدم ربط حزام الأمان
                          </option>
                          <option value="استخدام الهاتف أثناء القيادة">
                            استخدام الهاتف أثناء القيادة
                          </option>
                        </select>
                        {errors.violationType && (
                          <div className="text-danger">
                            {errors.violationType}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-section">
                      <h4 className="section-title mb-3">تفاصيل الدفع</h4>

                      <div className="mb-3">
                        <label className="form-label">تاريخ المخالفة</label>
                        <input
                          type="date"
                          className={`form-control custom-input ${
                            errors.violationDate ? "is-invalid" : ""
                          }`}
                          value={violationDate}
                          onChange={(e) => setViolationDate(e.target.value)}
                        />
                        {errors.violationDate && (
                          <div className="text-danger">
                            {errors.violationDate}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">مبلغ الغرامة</label>
                        <div className="input-group">
                          <input
                            type="number"
                            className={`form-control custom-input ${
                              errors.fineAmount ? "is-invalid" : ""
                            }`}
                            value={fineAmount}
                            onChange={(e) => setFineAmount(e.target.value)}
                            placeholder="أدخل مبلغ الغرامة"
                          />
                          <span className="input-group-text">جنيه</span>
                        </div>
                        {errors.fineAmount && (
                          <div className="text-danger">{errors.fineAmount}</div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">إيصال الدفع</label>
                        <div className="file-input-container">
                          <input
                            type="file"
                            id="paymentReceipt"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              setPaymentReceipt(e.target.files[0])
                            }
                          />
                          <label
                            htmlFor="paymentReceipt"
                            className="file-input-label"
                          >
                            <span className="file-name">
                              {paymentReceipt
                                ? paymentReceipt.name
                                : "لم يتم اختيار ملف"}
                            </span>
                            <span className="browse-button">اختر ملف</span>
                          </label>
                        </div>
                        {errors.paymentReceipt && (
                          <div className="text-danger">
                            {errors.paymentReceipt}
                          </div>
                        )}
                        <small className="text-muted">
                          يمكنك رفع صورة أو ملف PDF لإيصال الدفع
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
                  <h4 className="mb-3">⚠️ ملاحظات هامة:</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب دفع المخالفة خلال 30 يوم من تاريخ صدورها لتجنب
                        الغرامات الإضافية.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        في حالة عدم الدفع خلال المدة المحددة، سيتم إضافة 50% من
                        قيمة المخالفة كغرامة تأخير.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يمكنك الاعتراض على المخالفة خلال 15 يوم من تاريخ صدورها.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* الرخصة الإلكترونية */}
            {card.title === "الرخصة الإلكترونية بالباركود" && (
              <>
                <div className="mt-3 p-3">
                  <h3 className="text-color mb-3">بيانات الرخصة</h3>

                  <div className="mb-3">
                    <label className="form-label">رقم الرخصة الأصلية</label>
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.originalLicenseNumber ? "is-invalid" : ""
                      }`}
                      value={originalLicenseNumber}
                      onChange={(e) => setOriginalLicenseNumber(e.target.value)}
                      placeholder="أدخل رقم الرخصة الأصلية"
                    />
                    {errors.originalLicenseNumber && (
                      <div className="text-danger">
                        {errors.originalLicenseNumber}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">نوع الرخصة</label>
                    <select
                      className={`form-select custom-select-style custom-input ${
                        errors.digitalLicenseType ? "is-invalid" : ""
                      }`}
                      value={digitalLicenseType}
                      onChange={(e) => setDigitalLicenseType(e.target.value)}
                    >
                      <option value="">اختر نوع الرخصة</option>
                      <option value="قيادة خصوصي">قيادة خصوصي</option>
                      <option value="قيادة دراجة نارية">
                        قيادة دراجة نارية
                      </option>
                      <option value="قيادة تجاري">قيادة تجاري</option>
                    </select>
                    {errors.digitalLicenseType && (
                      <div className="text-danger">
                        {errors.digitalLicenseType}
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">تاريخ الإصدار</label>
                        <input
                          type="date"
                          className={`form-control custom-input ${
                            errors.issueDate ? "is-invalid" : ""
                          }`}
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                        />
                        {errors.issueDate && (
                          <div className="text-danger">{errors.issueDate}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">تاريخ الانتهاء</label>
                        <input
                          type="date"
                          className={`form-control custom-input ${
                            errors.expiryDate ? "is-invalid" : ""
                          }`}
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && (
                          <div className="text-danger">{errors.expiryDate}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">صورة الرخصة الورقية</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="paperLicensePhoto"
                        accept="image/*"
                        onChange={(e) =>
                          setPaperLicensePhoto(e.target.files[0])
                        }
                      />
                      <label
                        htmlFor="paperLicensePhoto"
                        className="file-input-label"
                      >
                        <span className="file-name">
                          {paperLicensePhoto
                            ? paperLicensePhoto.name
                            : "لم يتم اختيار ملف"}
                        </span>
                        <span className="browse-button">اختر ملف</span>
                      </label>
                    </div>
                    {errors.paperLicensePhoto && (
                      <div className="text-danger">
                        {errors.paperLicensePhoto}
                      </div>
                    )}
                    <small className="text-muted">
                      يرجى رفع صورة واضحة للرخصة الورقية لإنشاء النسخة
                      الإلكترونية
                    </small>
                  </div>
                </div>

                <div className="mt-2 p-4 bg-light rounded-3 border border-2 border-color">
                  <h4 className="mb-3">⚠️ معلومات الرخصة الإلكترونية:</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        الرخصة الإلكترونية تحتوي على باركود يمكن مسحه للتحقق من
                        صحة الرخصة.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يمكن استخدام الرخصة الإلكترونية بدلاً من النسخة الورقية.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب أن تكون الرخصة الأصلية سارية وغير منتهية الصلاحية.
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">بيانات الاستلام</h3>
            <Alert variant="secondary" className="mb-4">
              <p className="mb-0">
                💡 يرجى إدخال بيانات الاستلام بشكل صحيح لتسهيل عملية توصيل
                الوثيقة
              </p>
            </Alert>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">المحافظة</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.governorate ? "is-invalid" : ""
                    }`}
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                  />
                  {errors.governorate && (
                    <div className="text-danger">{errors.governorate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">المدينة</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    className={`form-control custom-input ${
                      errors.district ? "is-invalid" : ""
                    }`}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  {errors.district && (
                    <div className="text-danger">{errors.district}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">العنوان بالتفصيل</label>
                  <textarea
                    className={`form-control custom-input ${
                      errors.detailedAddress ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                  />
                  {errors.detailedAddress && (
                    <div className="text-danger">{errors.detailedAddress}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">تأكيد الطلب</h3>
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-color">بيانات الطلب</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>نوع الخدمة:</strong> {card.title}
                    </p>
                    <p>
                      <strong>اسم مقدم الطلب:</strong> {user?.name}
                    </p>
                    <p>
                      <strong>الرقم القومي:</strong> {user?.nationalId}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>المحافظة:</strong> {governorate}
                    </p>
                    <p>
                      <strong>المدينة:</strong> {city}
                    </p>
                    <p>
                      <strong>الحي/المركز:</strong> {district}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-color">ملخص التكلفة</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>تكلفة الخدمة:</span>
                  <span>50 جنيه</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>تكلفة التوصيل:</span>
                  <span>20 جنيه</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>الإجمالي:</strong>
                  <strong>70 جنيه</strong>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 col-lg-3 mb-3">
        <Sidebar />
      </div>
      <div className="col-md-8 col-lg-9">
        <div className="mb-3">
          <Steppar
            active={activeStep}
            setActive={setActiveStep}
            formData={{
              card,
              licenseType,
              licenseNumber,
              personalPhoto,
              medicalResult,
              renewalPeriod,
              governorate,
              city,
              district,
              detailedAddress,
            }}
            disabled={!user}
          />
          <NavigationButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            formData={{
              card,
              licenseType,
              licenseNumber,
              personalPhoto,
              medicalResult,
              renewalPeriod,
              governorate,
              city,
              district,
              detailedAddress,
            }}
            stepLabels={currentStepLabels}
            disabled={!user}
          />
        </div>

        {renderStepContent()}

        {activeStep < 3 && user && <Button handleNext={handleNext} />}

        {activeStep === 3 && (
          <div className="text-start">
            <button
              className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "جاري الاستعلام..."
              ) : (
                <>
                  تقديم الطلب &nbsp; <FaArrowLeftLong size={20} />
                </>
              )}
            </button>
          </div>
        )}

        {errors.submit && (
          <Alert variant="danger" className="mt-3">
            {errors.submit}
          </Alert>
        )}
      </div>
    </div>
  );
});

export default TrafficServices;
