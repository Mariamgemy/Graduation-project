import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./TrafficServices.css";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";
import PaymentMethods from "../PaymentMethod";

const TrafficServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSelf, setIsSelf] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [currentLicenseNumber, setCurrentLicenseNumber] = useState("");
  const [currentLicenseExpiryDate, setCurrentLicenseExpiryDate] = useState("");

  const [modelName, setModelName] = useState("");
  const [id, setId] = useState("");
  const [violationNumber , setViolationNumber] = useState("");
  const [violationType , setViolationType] = useState("");
  const [plateNumber , setPlateNumber] = useState("");

const [violationDate , setViolationDate] = useState("");
const [fineAmount , setFineAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [medicalResult, setMedicalResult] = useState(null);
  const [theoryResult, setTheoryResult] = useState(null);
  const [practicalResult, setPracticalResult] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");

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

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const newErrors = {};

      if (
        card.title === "استخراج رخصة قيادة" ||
        card.title === "استخراج رخصة سيارة"
      ) {
        if (!fullName) {
          newErrors.fullName = "هذا الحقل مطلوب";
        } else if (!isValidName(fullName)) {
          newErrors.fullName = "الاسم غير صالح";
        }

        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }

        if (!birthDate) {
          newErrors.birthDate = "هذا الحقل مطلوب";
        }
        if (!modelName) {
          newErrors.modelName = "هذا الحقل مطلوب";
        }

        if (!address) {
          newErrors.address = "هذا الحقل مطلوب";
        }

        if (!licenseType) {
          newErrors.licenseType = "هذا الحقل مطلوب";
        }

        if (!personalPhoto) {
          newErrors.personalPhoto = "هذا الحقل مطلوب";
        }

        if (!medicalResult) {
          newErrors.medicalResult = "هذا الحقل مطلوب";
        }

        if (!theoryResult) {
          newErrors.theoryResult = "هذا الحقل مطلوب";
        }

        if (!practicalResult) {
          newErrors.practicalResult = "هذا الحقل مطلوب";
        }

        if (!issueDate) {
          newErrors.issueDate = "هذا الحقل مطلوب";
        }

        if (!expiryDate) {
          newErrors.expiryDate = "هذا الحقل مطلوب";
        }
        if (!vehicleType) {
          newErrors.vehicleType = "هذا الحقل مطلوب";
        }
        if (!modelName) {
          newErrors.modelName = "هذا الحقل مطلوب";
        }
        if (!color) {
          newErrors.color = "هذا الحقل مطلوب";
        }
        if (!year) {
          newErrors.year = "هذا الحقل مطلوب";
        }
        if (!chassisNumber) {
          newErrors.chassisNumber = "هذا الحقل مطلوب";
        }
      }

      if (card.title === "تجديد رخصة قيادة" || card.title === "تجديد رخصة سيارة") {
        if (!currentLicenseNumber)
          newErrors.currentLicenseNumber = "هذا الحقل مطلوب";
        if (!currentLicenseExpiryDate)
          newErrors.currentLicenseExpiryDate = "هذا الحقل مطلوب";
        if (!paymentMethod) newErrors.paymentMethod = "هذا الحقل مطلوب";
        if (!isSelf) newErrors.isSelf = "هذا الحقل مطلوب";
        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!expiryDate) newErrors.expiryDate = "هذا الحقل مطلوب";
        if (!issueDate) newErrors.issueDate = "هذا الحقل مطلوب";
        if (!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
        if(!vehicleRegistrationNumber) newErrors.vehicleRegistrationNumber = "هذا الحقل مطلوب";
        if(!plateNumber) newErrors.plateNumber = "هذا الحقل مطلوب";
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
       if(!violationNumber) newErrors.violationNumber = "هذا الحقل مطلوب";
       if(!violationType) newErrors.violationType = "هذا الحقل مطلوب";
       if(!plateNumber) newErrors.plateNumber = "هذا الحقل مطلوب";
       if(!fineAmount) newErrors.fineAmount = "هذا الحقل مطلوب"; 
       if(!violationDate) newErrors.violationDate = "هذا الحقل مطلوب";
       if(!isSelf) newErrors.isSelf = "هذا الحقل مطلوب";
       if(!personalPhoto) newErrors.personalPhoto = "هذا الحقل مطلوب";
   
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({
      fullName,
      id,
      birthDate,
      address,
      licenseType,
      personalPhoto,
      medicalResult,
      theoryResult,
      practicalResult,
      issueDate,
      expiryDate,
      currentLicenseNumber,
      isSelf,
      paymentMethod,
      violationNumber,
      violationType,
      vehicleRegistrationNumber,
      plateNumber,
      fineAmount,
      violationDate,

    }),
  }));

  return (
    <>
      {card.title === "استخراج رخصة قيادة" && (
        <>
          <div className="mb-3 ">
            <label className="form-label">الاسم بالكامل </label>
            <input
              type="text"
              className="form-control "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">الرقم القومي </label>
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            {errors.id && <div className="text-danger">{errors.id}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">تاريخ الميلاد </label>
            <input
              type="date"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            {errors.birthDate && (
              <div className="text-danger">{errors.birthDate}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">العنوان </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نوع الرخصة </label>
            <select
              className="form-select "
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
            >
              <option value=""> </option>
              <option value="private">خاصة</option>
              <option value="commercial">تجارية</option>
              <option value="motorcycle">دراجة نارية</option>
            </select>
            {errors.licenseType && (
              <div className="text-danger">{errors.licenseType}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">الصورة الشخصية </label>
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
                  {personalPhoto ? personalPhoto.name : "لم يتم اختيار ملف"}
                </span>
                <span className="browse-button">اختر ملف</span>
              </label>
            </div>
            {errors.personalPhoto && (
              <div className="text-danger">{errors.personalPhoto}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نتيجة الفحص الطبي </label>
            <div className="file-input-container">
              <input
                type="file"
                id="medicalResult"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  setMedicalResult(e.target.files[0]);
                }}
              />
              <label htmlFor="medicalResult" className="file-input-label">
                <span className="file-name">
                  {medicalResult ? medicalResult.name : "لم يتم اختيار ملف"}
                </span>
                <span className="browse-button">اختر ملف</span>
              </label>
            </div>
            {errors.medicalResult && (
              <div className="text-danger">{errors.medicalResult}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نتيجة الاختبار النظري </label>
            <div className="file-input-container">
              <input
                type="file"
                id="theoryResult"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  setTheoryResult(e.target.files[0]);
                }}
              />
              <label htmlFor="theoryResult" className="file-input-label">
                <span className="file-name">
                  {theoryResult ? theoryResult.name : "لم يتم اختيار ملف"}
                </span>
                <span className="browse-button">اختر ملف</span>
              </label>
            </div>
            {errors.theoryResult && (
              <div className="text-danger">{errors.theoryResult}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نتيجة الاختبار العملي </label>
            <div className="file-input-container">
              <input
                type="file"
                id="practicalResult"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  setPracticalResult(e.target.files[0]);
                }}
              />
              <label htmlFor="practicalResult" className="file-input-label">
                <span className="file-name">
                  {practicalResult ? practicalResult.name : "لم يتم اختيار ملف"}
                </span>
                <span className="browse-button">اختر ملف</span>
              </label>
            </div>
            {errors.practicalResult && (
              <div className="text-danger">{errors.practicalResult}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">تاريخ الإصدار </label>
            <input
              type="date"
              className="form-control"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
            {errors.issueDate && (
              <div className="text-danger">{errors.issueDate}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">تاريخ الانتهاء </label>
            <input
              type="date"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            {errors.expiryDate && (
              <div className="text-danger">{errors.expiryDate}</div>
            )}
          </div>
        </>
      )}
      {card.title === "مخالفات المرور ودفعها" && (
        <>
          <div className="mb-3 ">
            <div className="row">
              <div className="col-md-6 mt-3">
                <div className="mb-3">
                  <label className="form-label">رقم المخالفة </label>
                  <input
                    type="text"
                    className="form-control"
                    value={violationNumber}
                    onChange={(e) => setViolationNumber(e.target.value)}
                  />
                  {errors.violationNumber && (
                    <div className="text-danger">{errors.violationNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم اللوحة </label>
                  <input
                    type="text"
                    className="form-control"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
                  {errors.plateNumber && (
                    <div className="text-danger">{errors.plateNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">نوع المخالفة</label>
                  <select className="form-select" value={violationType } onChange={(e) => setViolationType (e.target.value)}>
                    <option value=""> </option>
                    <option value="1">إشارة حمراء</option>
                    <option value="2">سرعة زائدة</option>
                    <option value="3">وقوف غير قانوني</option>
                  </select>
                  {errors.violationType  && (
                    <div className="text-danger">{errors.violationType }</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label mt-3">تاريخ المخالفة </label>
                  <input
                    type="date"
                    className="form-control"
                    value={violationDate}
                    onChange={(e) => setViolationDate(e.target.value)}
                  />
                  {errors.violationDate && (
                    <div className="text-danger">{errors.violationDate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">مبلغ الغرامة </label>
                  <input
                    type="text"
                    className="form-control"
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
                {isSelf === false && (
                  // <div className="mb-3">
                  //   <label className="form-label mt-4">طريقة الدفع </label>
                  //   <input
                  //     type="text"
                  //     className="form-control"
                  //     value={chassisNumber}
                  //     onChange={(e) => setChassisNumber(e.target.value)}
                  //   />
                  //   {errors.chassisNumber && (
                  //     <div className="text-danger">{errors.chassisNumber}</div>
                  //   )}
                  // </div>
                  <PaymentMethods/>
                )}
                {isSelf === true && (
                  <div className="mb-3">
                    <label className="form-label mt-4">إيصال الدفع </label>
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
              className="form-select"
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
              className="form-control"
              value={currentLicenseNumber}
              onChange={(e) => setCurrentLicenseNumber(e.target.value)}
            />
            {errors.currentLicenseNumber && (
              <div className="text-danger">{errors.currentLicenseNumber}</div>
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
                  <label htmlFor="personalPhoto" className="file-input-label">
                    <span className="file-name">
                      {personalPhoto ? personalPhoto.name : "لم يتم اختيار ملف"}
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
                  <label htmlFor="personalPhoto" className="file-input-label">
                    <span className="file-name">
                      {personalPhoto ? personalPhoto.name : "لم يتم اختيار ملف"}
                    </span>
                    <span className="browse-button">اختر ملف</span>
                  </label>
                </div>
                {errors.personalPhoto && (
                  <div className="text-danger">{errors.personalPhoto}</div>
                )}
              </div>
            )}
          </div>

          <div className="mb-3">
            <PaymentMethods />
          </div>
        </>
      )}

      {card.title === "استخراج رخصة سيارة" && (
        <>
          <div className="mb-3 ">
            <label className="form-label">الاسم بالكامل </label>
            <input
              type="text"
              className="form-control "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">الرقم القومي </label>
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            {errors.id && <div className="text-danger">{errors.id}</div>}
          </div>

          <div className="mb-3 ">
            <label className="form-label">نوع المركبة ؟</label>

            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="form-select"
            >
              <option value=""></option>
              <option value="car">سيارة</option>
              <option value="truck">شاحنة</option>
            </select>
            {errors.vehicleType && (
              <div className="text-danger">{errors.vehicleType}</div>
            )}

            <div className=" mt-4">
              <div className="row">
                <h4 className="text-color mb-3"> تفاصيل المركبة : </h4>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">الطراز </label>
                    <input
                      type="text"
                      className="form-control"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                    {errors.modelName && (
                      <div className="text-danger">{errors.modelName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">اللون </label>
                    <input
                      type="text"
                      className="form-control"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                    {errors.color && (
                      <div className="text-danger">{errors.color}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">سنة الصنع </label>
                    <input
                      type="number"
                      min="1900"
                      max="2025"
                      step="1"
                      className="form-control"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                    {errors.year && (
                      <div className="text-danger">{errors.year}</div>
                    )}
                    <div className="mb-3">
                      <label className="form-label mt-3">رقم الهيكل</label>
                      <input
                        type="text"
                        className="form-control"
                        value={chassisNumber}
                        onChange={(e) => setChassisNumber(e.target.value)}
                      />
                      {errors.chassisNumber && (
                        <div className="text-danger">
                          {errors.chassisNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">تقرير الفحص </label>
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
                    <label className="form-label">تقرير الفحص </label>
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
                    <label className="form-label">تقرير الفحص </label>
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {card.title === "تجديد رخصة قيادة" && (
        <>
          <div className="mb-3">
            <label className="form-label">الرقم القومي </label>
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            {errors.id && <div className="text-danger">{errors.id}</div>}
          </div>

          <div className="mb-3 ">
            <div className=" mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">رقم الرخصة الحالية </label>
                    <input
                      type="text"
                      className="form-control"
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
                    <label className="form-label">تاريخ الانتهاء الحالي </label>
                    <input
                      type="date"
                      className="form-control"
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
                    <label className="form-label ">طريقة الدفع </label>
                    <input
                      type="text"
                      className="form-control"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {errors.paymentMethod && (
                      <div className="text-danger">{errors.paymentMethod}</div>
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
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">صورة شخصية جديدة </label>
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
                    <label className="form-label">تاريخ التجديد </label>
                    <input
                      type="date"
                      className="form-control"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                    />
                    {errors.issueDate && (
                      <div className="text-danger">{errors.issueDate}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">تاريخ الانتهاء الجديد </label>
                    <input
                      type="date"
                      className="form-control"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    {errors.expiryDate && (
                      <div className="text-danger">{errors.expiryDate}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* {isSelf === true && (
             
            )} */}

            {/* {isSelf === false && (
           <div className="card mt-3 p-3">
           <div className="row">
           <h2 className="text-color mb-3">  تفاصيل الشاحنة</h2>
             <div className="col-md-6">
               <div className="mb-3">
                 <label className="form-label">الطراز </label>
                 <input
                   type="text"
                   className="form-control"
                   value={quadriliteralName}
                   onChange={(e) => setQuadriliteralName(e.target.value)}
                 />
               </div>
               <div className="mb-3">
                 <label className="form-label">اللون   </label>
                 <input
                   type="text"
                   className="form-control"
                   value={id}
                   onChange={(e) => setId(e.target.value)}
                 />
               </div>
               <div className="mb-3">
                 <label className="form-label">سنة الصنع   </label>
                 <input 
                   type="number"
                   min="1900" max="2025" step="1"
                   className="form-control"
                   value={familyName}
                   onChange={(e) => setFamilyName(e.target.value)}
                 />
             <div className="mb-3">
                 <label className="form-label mt-3">رقم الهيكل</label>
                 <input
                   type="text"
                   className="form-control"
                   value={motherName}
                   onChange={(e) => setMotherName(e.target.value)}
                 />
               </div>
             
               </div>
             </div>
             <div className="col-md-6">
               
               <div className="mb-3">
         <label className="form-label">تقرير الفحص  </label>
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
               {personalPhoto ? personalPhoto.name : "لم يتم اختيار ملف"}
             </span>
             <span className="browse-button">اختر ملف</span>
           </label>
         </div>
         {errors.personalPhoto && (
           <div className="text-danger">{errors.personalPhoto}</div>
         )}
       </div>
               <div className="mb-3">
         <label className="form-label">تقرير الفحص  </label>
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
               {personalPhoto ? personalPhoto.name : "لم يتم اختيار ملف"}
             </span>
             <span className="browse-button">اختر ملف</span>
           </label>
         </div>
         {errors.personalPhoto && (
           <div className="text-danger">{errors.personalPhoto}</div>
         )}
       </div>
               <div className="mb-3">
         <label className="form-label">تقرير الفحص  </label>
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
               {personalPhoto ? personalPhoto.name : "لم يتم اختيار ملف"}
             </span>
             <span className="browse-button">اختر ملف</span>
           </label>
         </div>
         {errors.personalPhoto && (
           <div className="text-danger">{errors.personalPhoto}</div>
         )}
       </div>
             </div>
           </div>
         </div>
            )} */}
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
              className="form-control "
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
            {errors.plateNumber && (
              <div className="text-danger">{errors.plateNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم تسجيل السيارة  </label>
            <input
              type="text"
              className="form-control"
              value={vehicleRegistrationNumber}
              onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
            />
            {errors.vehicleRegistrationNumber   && <div className="text-danger">{errors.vehicleRegistrationNumber}</div>}
          </div>
                  <div className="mb-3">
                    <label className="form-label"> تقرير الفحص الفني</label>
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
                <div className="mb-3 ">
            <label className="form-label">
             هل يوجد غرامات ؟
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
                <label className="form-check-label">يوجد غرامات</label>
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
                <label  className="form-check-label">بدون</label>
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
                      <div className="text-danger">{errors.personalPhoto}</div>
                    )}
                  </div>
                    <div className="mb-3">
                      <label className="form-label">تاريخ التجديد </label>
                      <input
                        type="date"
                        className="form-control"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      {errors.expiryDate && (
                        <div className="text-danger">
                          {errors.expiryDate}
                        </div>
                      )}
                    </div>
                        <PaymentMethods/>
                  
                 
                </div>
              </div>
            </div>

        
          </div>
        </>
      )}

      <div className="text-start">
        <button
          type="submit"
          className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
        >
          التالي &nbsp; <FaArrowLeftLong size={20} />
        </button>
      </div>
    </>
  );
});

export default TrafficServices;
