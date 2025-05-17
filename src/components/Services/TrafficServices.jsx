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

const TrafficServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentBill, setPaymentBill] = useState("");

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

  const [isSelf, setIsSelf] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [currentLicenseNumber, setCurrentLicenseNumber] = useState("");
  const [currentLicenseExpiryDate, setCurrentLicenseExpiryDate] = useState("");

  const [modelName, setModelName] = useState("");
  const [id, setId] = useState("");
  const [medicalExamination, setMedicalExamination] = useState(null);
  const [violationNumber, setViolationNumber] = useState("");
  const [violationType, setViolationType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const [violationDate, setViolationDate] = useState("");
  const [fineAmount, setFineAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
    useState("");
  const [errors, setErrors] = useState({});
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [theoryResult, setTheoryResult] = useState(null);
  const [practicalResult, setPracticalResult] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");

  const [chassisNumber, setChassisNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  const navigationSteps = {
    "مخالفات المرور ودفعها": [
      { label: "بيانات الرخصة", icon: <BsFillPersonVcardFill /> },
      { label: "بيانات المخالفة", icon: <FaFileAlt /> },
      { label: "دفع المخالفة", icon: <FaCheck /> },
    ],
  };

  const currentStepLabels = navigationSteps[card?.title] || [
    { label: "بيانات الرخصة", icon: <BsFillPersonVcardFill /> },
    { label: "بيانات الاستلام", icon: <FaFileAlt /> },
    { label: "تأكيد الطلب", icon: <FaCheck /> },
  ];
  const [formData, setFormData] = useState({
    licenseNumber: "",
    carNumber: "",
  });

  useEffect(() => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    } else {
      setAuthError(null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const isValidGovernorate = (governorate) => {
    const governorateRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return governorateRegex.test(governorate);
  };

  const isValidCity = (city) => {
    const cityRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return cityRegex.test(city);
  };

  const isValidDistrict = (district) => {
    const districtRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return districtRegex.test(district);
  };

  const isValidDetailedAddress = (address) => {
    return address.length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.licenseNumber.trim()) {
    //   newErrors.licenseNumber = "رقم الرخصة مطلوب";
    // }

    // if (!formData.carNumber.trim()) {
    //   newErrors.carNumber = "رقم السيارة مطلوب";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // هنا يتم إرسال البيانات للباك إند
      console.log("تم إرسال البيانات:", formData);
      // بعد نجاح الإرسال
    } catch (error) {
      console.error("خطأ في إرسال البيانات:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => formData,
  }));

  const handleNext = () => {
    const newErrors = {};

    if (activeStep === 1) {
      if (card.title === "تجديد رخصة قيادة") {
        if (!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
        if (!medicalResult) newErrors.medicalResult = "هذا الحقل مطلوب";
        if (!licenseNumber) newErrors.licenseNumber = "هذا الحقل مطلوب";
        if (!licenseType) newErrors.licenseType = "هذا الحقل مطلوب";
        if (!renewalPeriod) newErrors.renewalPeriod = "هذا الحقل مطلوب";
      }

      if (card.title === "تجديد رخصة سيارة") {
        if (!plateNumber) {
          newErrors.plateNumber = "هذا الحقل مطلوب";
        }
        if (!vehicleRegistrationNumber) {
          newErrors.vehicleRegistrationNumber = "هذا الحقل مطلوب";
        }
      }

      if (card.title === "بدل فاقد / تالف للرخص") {
        if (!licenseType) newErrors.licenseType = "هذا الحقل مطلوب";
        if (!currentLicenseNumber)
          newErrors.currentLicenseNumber = "هذا الحقل مطلوب";
        if (!isSelf) newErrors.isSelf = "هذا الحقل مطلوب";
        if (!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
        if (!paymentMethod) {
          newErrors.paymentMethod = "برجاء اختيار طريقة الدفع.";
        }
      }

      if (card.title === "مخالفات المرور ودفعها") {
        if (!violationNumber) newErrors.violationNumber = "هذا الحقل مطلوب";
        if (!paymentBill) newErrors.paymentBill = "هذا الحقل مطلوب";
        if (!violationType) newErrors.violationType = "هذا الحقل مطلوب";
        if (!plateNumber) newErrors.plateNumber = "هذا الحقل مطلوب";
        if (!fineAmount) newErrors.fineAmount = "هذا الحقل مطلوب";
        if (!violationDate) newErrors.violationDate = "هذا الحقل مطلوب";
        if (!isSelf) newErrors.isSelf = "هذا الحقل مطلوب";
        if (!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setActiveStep(2);
      }
    }
    if (activeStep === 2) {
      if (!governorate) {
        newErrors.governorate = "المحافظة مطلوبة";
      } else if (!isValidGovernorate(governorate)) {
        newErrors.governorate = "يرجى إدخال اسم المحافظة بشكل صحيح";
      }
      if (!city) {
        newErrors.city = "المدينة مطلوبة";
      } else if (!isValidCity(city)) {
        newErrors.city = "يرجى إدخال اسم المدينة بشكل صحيح";
      }
      if (!district) {
        newErrors.district = "الحي / المركز مطلوب";
      } else if (!isValidDistrict(district)) {
        newErrors.district = "يرجى إدخال اسم الحي / المركز بشكل صحيح";
      }
      if (!detailedAddress) {
        newErrors.detailedAddress = "العنوان التفصيلي مطلوب";
      } else if (!isValidDetailedAddress(detailedAddress)) {
        newErrors.detailedAddress =
          "يرجى إدخال العنوان التفصيلي بشكل كامل (10 أحرف على الأقل)";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // Update formData with the address information
        setFormData((prev) => ({
          ...prev,
          governorate,
          city,
          district,
          detailedAddress,
        }));
        setActiveStep(3);
      }
    }
  };

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
                          <option value="1">تجاوز السرعة المحددة</option>
                          <option value="2">
                            عدم التوقف عند الإشارة الحمراء
                          </option>
                          <option value="3">الوقوف في مكان ممنوع</option>
                          <option value="4">عدم ربط حزام الأمان</option>
                          <option value="5">
                            استخدام الهاتف أثناء القيادة
                          </option>
                          <option value="6">عدم حمل رخصة القيادة</option>
                          <option value="7">عدم حمل وثيقة التأمين</option>
                          <option value="8">عدم حمل رخصة السيارة</option>
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
                        <label className="form-label">حالة الدفع</label>
                        <div className="payment-status">
                          <div className="form-check">
                            <input
                              type="radio"
                              name="isSelf"
                              className="form-check-input"
                              value="yes"
                              checked={isSelf === true}
                              onChange={(e) => setIsSelf(true)}
                            />
                            <label className="form-check-label">مدفوع</label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="isSelf"
                              className="form-check-input"
                              value="no"
                              checked={isSelf === false}
                              onChange={(e) => setIsSelf(false)}
                            />
                            <label className="form-check-label">
                              غير مدفوع
                            </label>
                          </div>
                        </div>
                        {errors.isSelf && (
                          <div className="text-danger">{errors.isSelf}</div>
                        )}
                      </div>

                      {isSelf === false && (
                        <div className="payment-methods-section">
                          <h5 className="mb-3">اختر طريقة الدفع</h5>
                          <PaymentMethods />
                        </div>
                      )}

                      {isSelf === true && (
                        <div className="mb-3">
                          <label className="form-label">إيصال الدفع</label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              id="paymentBill"
                              accept="image/*,.pdf"
                              onChange={(e) =>
                                setPaymentBill(e.target.files[0])
                              }
                            />
                            <label
                              htmlFor="paymentBill"
                              className={`file-input-label ${
                                errors.paymentBill ? "is-invalid" : ""
                              }`}
                            >
                              <span className="file-name">
                                {paymentBill
                                  ? paymentBill.name
                                  : "لم يتم اختيار ملف"}
                              </span>
                              <span className="browse-button">اختر ملف</span>
                            </label>
                          </div>
                          {errors.paymentBill && (
                            <div className="text-danger">
                              {errors.paymentBill}
                            </div>
                          )}
                          <small className="text-muted">
                            يمكنك رفع صورة أو ملف PDF للإيصال
                          </small>
                        </div>
                      )}
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
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>احتفظ بإيصال الدفع لمدة 6 أشهر على الأقل.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {card.title === "بدل فاقد / تالف للرخص" && (
              <>
                <div className="mb-3">
                  <label className="form-label">نوع الرخصة </label>
                  <select
                    className={`form-select custom-select-style custom-input ${
                      errors.licenseType ? "is-invalid" : ""
                    }`}
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="1">رخصة قيادة </option>
                    <option value="2">رخصة سيارة </option>
                  </select>

                  {errors.licenseType && (
                    <div className="text-danger">{errors.licenseType}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الرخصة الأصلية </label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.currentLicenseNumber ? "is-invalid" : ""
                    }`}
                    value={currentLicenseNumber}
                    onChange={(e) => setCurrentLicenseNumber(e.target.value)}
                  />
                  {errors.currentLicenseNumber && (
                    <div className="text-danger">
                      {errors.currentLicenseNumber}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label mt-3">السبب ؟</label>

                  <div className="d-flex gap-5">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="isSelf"
                        className="form-check-input"
                        value="yes"
                        checked={isSelf === true}
                        onChange={(e) => setIsSelf(true)}
                      />
                      <label className="form-check-label">تلف </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="isSelf"
                        className="form-check-input"
                        value="no"
                        checked={isSelf === false}
                        onChange={(e) => setIsSelf(false)}
                      />
                      <label className="form-check-label">فقدان </label>
                    </div>
                  </div>
                  {errors.isSelf && (
                    <div className="text-danger">{errors.isSelf}</div>
                  )}
                  {isSelf === true && (
                    <div className="mb-3">
                      <label className="form-label mt-4">
                        صورة الرخصة التالفة (إن وجدت )
                      </label>
                      <div className="file-input-container">
                        <input
                          type="file"
                          id="personalPhoto"
                          accept="image/*"
                          onChange={(e) => {
                            setPersonalPhoto(e.target.files[0]);
                          }}
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
                    </div>
                  )}
                  {isSelf === false && (
                    <div className="mb-3">
                      <label className="form-label mt-4">
                        محضر الشرطة (في حالة الفقد )
                      </label>
                      <div className="file-input-container">
                        <input
                          type="file"
                          id="personalPhoto"
                          accept="image/*"
                          onChange={(e) => {
                            setPersonalPhoto(e.target.files[0]);
                          }}
                        />
                        <label
                          htmlFor="personalPhoto"
                          className={`file-input-label${
                            errors.personalPhoto ? "is-invalid" : ""
                          }`}
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
                        <div className="text-danger">
                          {errors.personalPhoto}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <PaymentMethods />
                </div>
              </>
            )}

            {card.title === "تجديد رخصة قيادة" && (
              <>
                <div className="mt-3 p-3">
                  <h3 className="text-color mb-3">بيانات الرخصة </h3>
                  <div className="mb-3">
                    <label className="form-label">نوع الرخصة</label>
                    <select
                      className={`form-select custom-select-style custom-input  ${
                        errors.licenseType ? "is-invalid" : ""
                      }`}
                      name="licenseType"
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="private">رخصة خاصة</option>
                      <option value="motorcycle">رخصة دراجة نارية</option>
                    </select>
                    {errors.licenseType && (
                      <div className="text-danger">{errors.licenseType}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">مدة التجديد المطلوبة</label>
                    <select
                      className={`form-select custom-select-style custom-input  ${
                        errors.renewalPeriod ? "is-invalid" : ""
                      }`}
                      name="renewalPeriod"
                      value={renewalPeriod}
                      onChange={(e) => setRenewalPeriod(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="private">3 سنوات</option>
                      <option value="motorcycle">10 سنوات</option>
                    </select>
                    {errors.renewalPeriod && (
                      <div className="text-danger">{errors.renewalPeriod}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">رقم الرخصة الحالي</label>
                    <input
                      type="text"
                      className={`form-control custom-input  ${
                        errors.licenseNumber ? "is-invalid" : ""
                      }`}
                      name="licenseNumber"
                      autoComplete="on"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                    />
                    {errors.licenseNumber && (
                      <div className="text-danger">{errors.licenseNumber}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">صورة شخصية جديدة</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="personalPhoto"
                        accept="image/*"
                        onChange={(e) => {
                          setPersonalPhoto(e.target.files[0]);
                        }}
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
                    <label className="form-label">صورة الفحص الطبي</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="medicalResult"
                        accept="image/*"
                        onChange={(e) => {
                          setMedicalResult(e.target.files[0]);
                        }}
                      />
                      <label
                        className={` file-input-label ${
                          errors.medicalResult ? "is-invalid" : ""
                        }`}
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
                        تجديد الرخصة يجب أن يتم خلال 30 يومًا من تاريخ انتهائها،
                        وفي حالة التأخير، سوف يتم فرض غرامات مالية.
                      </span>
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
            {card.title === "تجديد رخصة مركبة" && (
              <>
                <div className="mb-3 ">
                  <div className=" mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3 ">
                          <label className="form-label"> رقم اللوحة </label>
                          <input
                            type="text"
                            className={`form-control custom-input  ${
                              errors.plateNumber ? "is-invalid" : ""
                            }`}
                            name="plateNumber"
                            autoComplete="off"
                            value={plateNumber}
                            onChange={(e) => setPlateNumber(e.target.value)}
                          />
                          {errors.plateNumber && (
                            <div className="text-danger">
                              {errors.plateNumber}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            رقم تسجيل السيارة{" "}
                          </label>
                          <input
                            type="text"
                            className={`form-control custom-input  ${
                              errors.vehicleRegistrationNumber
                                ? "is-invalid"
                                : ""
                            }`}
                            name="vehicleRegistrationNumber"
                            autoComplete="off"
                            value={vehicleRegistrationNumber}
                            onChange={(e) =>
                              setVehicleRegistrationNumber(e.target.value)
                            }
                          />
                          {errors.vehicleRegistrationNumber && (
                            <div className="text-danger">
                              {errors.vehicleRegistrationNumber}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            {" "}
                            تقرير الفحص الفني
                          </label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              id="personalPhoto"
                              accept="image/*"
                              onChange={(e) => {
                                setPersonalPhoto(e.target.files[0]);
                              }}
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
                            <div className="text-danger">
                              {errors.personalPhoto}
                            </div>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <label className="form-label">هل يوجد غرامات ؟</label>
                          <div className="d-flex gap-5">
                            <div className="form-check">
                              <input
                                type="radio"
                                name="isSelf"
                                className="form-check-input"
                                value="yes"
                                checked={isSelf === true}
                                onChange={(e) => setIsSelf(true)}
                              />
                              <label className="form-check-label">
                                يوجد غرامات
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                name="isSelf"
                                className="form-check-input"
                                value="no"
                                checked={isSelf === false}
                                onChange={(e) => setIsSelf(false)}
                              />
                              <label className="form-check-label">بدون</label>
                            </div>
                          </div>
                          {errors.isSelf && (
                            <div className="text-danger">{errors.isSelf}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label"> وثيقة التأمين</label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              id="personalPhoto"
                              accept="image/*"
                              onChange={(e) => {
                                setPersonalPhoto(e.target.files[0]);
                              }}
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
                            <div className="text-danger">
                              {errors.personalPhoto}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">تاريخ التجديد </label>
                          <input
                            type="date"
                            className={`form-control custom-input  ${
                              errors.expiryDate ? "is-invalid" : ""
                            }`}
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                          {errors.expiryDate && (
                            <div className="text-danger">
                              {errors.expiryDate}
                            </div>
                          )}
                        </div>
                        <PaymentMethods />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 p-4 bg-light rounded-3 border border-2 border-color">
                  <h4 className="mb-3">⚠️ ضوابط تجديد رخصة المركبة:</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب أن تكون المركبة من نوع ملاكي أو دراجة نارية.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>يجب أن تكون سعة المحرك أقل من 2030 CC.</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب سداد جميع الرسوم والمخالفات والتأمين الإجباري قبل
                        إجراء عملية التجديد.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        لا يجوز توصيل الرخصة في حالة وجود فحص فني مطلوب أو حظر
                        بيع على المركبة.
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
                    name="governorate"
                    autoComplete="address-level1"
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
                    name="city"
                    autoComplete="address-level2"
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
                    name="district"
                    autoComplete="address-level3"
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
                    name="detailedAddress"
                    autoComplete="street-address"
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
            {/* Add request result information here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-3">
        <Steppar
          active={activeStep}
          setActive={setActiveStep}
          formData={{
            card,
            licenseNumber,
            licenseType,
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
            licenseNumber,
            licenseType,
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
    </>
  );
});

export default TrafficServices;
