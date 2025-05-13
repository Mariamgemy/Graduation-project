import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./TrafficServices.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import PaymentMethods from "../PaymentMethod";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { FaUser, FaFileAlt, FaCheck } from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";

const TrafficServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentBill, setPaymentBill] = useState("");
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
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [medicalResult, setMedicalResult] = useState(null);
  const [theoryResult, setTheoryResult] = useState(null);
  const [practicalResult, setPracticalResult] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [renewalPeriod, setRenewalPeriod] = useState("");
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
    fullName: "",
    NID: "",
    licenseNumber: "",
    carNumber: "",
    phoneNumber: "",
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-25]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidEmail = (Email) => {
    const emailRegex = /^[\w]+@([\w]+\.)+[\w]+$/;
    return emailRegex.test(Email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return nameRegex.test(name);
  };

  const isValidId = (id) => {
    const idRegex = /^\d{14}$/;
    return idRegex.test(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم مطلوب";
    }

    if (!formData.NID || formData.NID.length !== 14) {
      newErrors.NID = "الرقم القومي يجب أن يكون 14 رقم";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "رقم الرخصة مطلوب";
    }

    if (!formData.carNumber.trim()) {
      newErrors.carNumber = "رقم السيارة مطلوب";
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "رقم الهاتف يجب أن يكون 11 رقم";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
      return;
    }

    setAuthError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // هنا يتم إرسال البيانات للباك إند
      console.log("تم إرسال البيانات:", formData);
      // بعد نجاح الإرسال
      alert("تم تقديم الطلب بنجاح");
    } catch (error) {
      console.error("خطأ في إرسال البيانات:", error);
      alert("حدث خطأ أثناء إرسال البيانات");
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
        if (!fullName) {
          newErrors.fullName = "هذا الحقل مطلوب";
        } else if (!isValidName(fullName)) {
          newErrors.fullName = "الاسم غير صالح";
        }
        if (!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
        if (!medicalExamination)
          newErrors.medicalExamination = "هذا الحقل مطلوب";
        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!birthDate) {
          newErrors.birthDate = "هذا الحقل مطلوب";
        }
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
    }
    setErrors(newErrors);

    // Only proceed to next step if there are no errors
    if (Object.keys(newErrors).length === 0) {
      if (activeStep < 4) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            {card.title === "مخالفات المرور ودفعها" && (
              <>
                <div className="mb-3 ">
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="mb-3">
                        <label className="form-label">رقم المخالفة </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
                            errors.violationNumber ? "is-invalid" : ""
                          }`}
                          value={violationNumber}
                          onChange={(e) => setViolationNumber(e.target.value)}
                        />
                        {errors.violationNumber && (
                          <div className="text-danger">
                            {errors.violationNumber}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">رقم اللوحة </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
                            errors.plateNumber ? "is-invalid" : ""
                          }`}
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
                        <label className="form-label">نوع المخالفة</label>
                        <select
                          className={`form-select custom-select-style custom-input ${
                            errors.violationType ? "is-invalid" : ""
                          }`}
                          value={violationType}
                          onChange={(e) => setViolationType(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="1">إشارة حمراء</option>
                          <option value="2">سرعة زائدة</option>
                          <option value="3">وقوف غير قانوني</option>
                        </select>
                        {errors.violationType && (
                          <div className="text-danger">
                            {errors.violationType}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label mt-3">
                          تاريخ المخالفة{" "}
                        </label>
                        <input
                          type="date"
                          className={`form-control custom-input  ${
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
                        <label className="form-label">مبلغ الغرامة </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
                            errors.fineAmount ? "is-invalid" : ""
                          }`}
                          value={fineAmount}
                          onChange={(e) => setFineAmount(e.target.value)}
                        />
                        {errors.fineAmount && (
                          <div className="text-danger">{errors.fineAmount}</div>
                        )}
                      </div>

                      <label className="form-label mt-3">حالة الدفع ؟</label>

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
                          <label className="form-check-label">غير مدفوع</label>
                        </div>
                      </div>
                      {errors.isSelf && (
                        <div className="text-danger">{errors.isSelf}</div>
                      )}
                      {isSelf === false && <PaymentMethods />}
                      {isSelf === true && (
                        <div className="mb-3">
                          <label className="form-label mt-4">
                            إيصال الدفع{" "}
                          </label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              id="paymentBill"
                              accept="image/*"
                              onChange={(e) => {
                                setPaymentBill(e.target.files[0]);
                              }}
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
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
                    <label htmlFor="personalPhoto" className="file-input-label">
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
                      id="medicalExamination"
                      accept="image/*"
                      onChange={(e) => {
                        setMedicalExamination(e.target.files[0]);
                      }}
                    />
                    <label
                      htmlFor="medicalExamination"
                      className="file-input-label"
                    >
                      <span className="file-name">
                        {medicalExamination
                          ? medicalExamination.name
                          : "لم يتم اختيار ملف"}
                      </span>
                      <span className="browse-button">اختر ملف</span>
                    </label>
                  </div>
                  {errors.medicalExamination && (
                    <div className="text-danger">
                      {errors.medicalExamination}
                    </div>
                  )}
                </div>
              </>
            )}
            {card.title === "تجديد رخصة سيارة" && (
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
              </>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            {card.title === "تجديد رخصة قيادة" && (
              <div className="mt-3 p-3">
                <h3 className="text-color mb-3">بيانات الرخصة </h3>
                <div className="mb-3 ">
                  <div className=" mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            رقم الرخصة الحالية{" "}
                          </label>
                          <input
                            type="text"
                            className={`form-control custom-input  ${
                              errors.currentLicenseNumber ? "is-invalid" : ""
                            }`}
                            value={currentLicenseNumber}
                            onChange={(e) =>
                              setCurrentLicenseNumber(e.target.value)
                            }
                          />
                          {errors.currentLicenseNumber && (
                            <div className="text-danger">
                              {errors.currentLicenseNumber}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            تاريخ الانتهاء الحالي{" "}
                          </label>
                          <input
                            type="date"
                            className={`form-control custom-input  ${
                              errors.currentLicenseExpiryDate
                                ? "is-invalid"
                                : ""
                            }`}
                            value={currentLicenseExpiryDate}
                            onChange={(e) =>
                              setCurrentLicenseExpiryDate(e.target.value)
                            }
                          />
                          {errors.currentLicenseExpiryDate && (
                            <div className="text-danger">
                              {errors.currentLicenseExpiryDate}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <PaymentMethods />
                          {errors.paymentMethod && (
                            <div className="text-danger">
                              {errors.paymentMethod}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">تاريخ التجديد </label>
                          <input
                            type="date"
                            className={`form-control custom-input  ${
                              errors.issueDate ? "is-invalid" : ""
                            }`}
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                          />
                          {errors.issueDate && (
                            <div className="text-danger">
                              {errors.issueDate}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            تاريخ الانتهاء الجديد{" "}
                          </label>
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
                        <div className="mb-3">
                          <label className="form-label">
                            هل يلزم إجراء فحص طبي ؟
                          </label>

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
                              <label className="form-check-label">نعم</label>
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
                              <label className="form-check-label">لا</label>
                            </div>
                          </div>
                          {errors.isSelf && (
                            <div className="text-danger ">{errors.isSelf}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">بيانات الاستلام </h3>
            {/* Add delivery information form fields here */}
          </div>
        );
      case 4:
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
            fullName,
            id,
            birthDate,
          }}
        />
        <NavigationButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          formData={{
            card,
            fullName,
            id,
            birthDate,
          }}
          stepLabels={currentStepLabels}
        />
      </div>

      {renderStepContent()}

      {activeStep < 3 && <Button handleNext={handleNext} />}

      {/* {authError && (
        <Alert variant="warning" className="mb-3">
          <p className="mb-0">{authError}</p>
        </Alert>
      )} */}

      {activeStep === 3 && (
        <div className="text-start">
          <button
            className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "جاري المعالجة..."
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
