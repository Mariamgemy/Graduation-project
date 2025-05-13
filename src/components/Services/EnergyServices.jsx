import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Civil.css";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";
import NavigationButtons from "../NavigationButtons";
import { FaUser, FaFileAlt, FaCheck } from "react-icons/fa";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const EnergyServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);

  const [quadriliteralName, setQuadriliteralName] = useState("");
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [utilityType, setUtilityType] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationshipType, setRelationshipType] = useState("");

  const [detailedAddress, setDetailedAddress] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [idPhoto, setIdPhoto] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [facilityType, setFacilityType] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [elctricBill, setElctricBill] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    NID: "",
    address: "",
    phoneNumber: "",
    meterNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

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

    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "رقم الهاتف يجب أن يكون 11 رقم";
    }

    if (!formData.meterNumber.trim()) {
      newErrors.meterNumber = "رقم العداد مطلوب";
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

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-25]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidEmail = (Email) => {
    const emailRegex = /^[\w]+@([\w]+\.)+[\w]+$/;
    return emailRegex.test(Email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return nameRegex.test(name);
  };
  const isValidMotherName = (motherName) => {
    const nameRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{2,}$/;
    return nameRegex.test(motherName);
  };
  const isValidId = (id) => {
    const idRegex = /^\d{14}$/;
    return idRegex.test(id);
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const newErrors = {};

      // if (activeStep === 1) {
      //   if (card.title === "شهادة كفاءة الطاقة") {
      //     if (!idPhoto) newErrors.idPhoto = "هذا الحقل مطلوب";
      //     if (!certificateType) newErrors.certificateType = "هذا الحقل مطلوب";
      //     if (!facilityType) newErrors.facilityType = "هذا الحقل مطلوب";
      //     if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
      //     if (!phone) newErrors.phone = "هذا الحقل مطلوب";
      //     else if (!isValidPhoneNumber(phone)) {
      //       newErrors.phone = "رقم الهاتف غير صحيح";
      //     }
      //     if (!elctricBill) newErrors.elctricBill = "هذا الحقل مطلوب";
      //     if (!quadriliteralName)
      //       newErrors.quadriliteralName = "هذا الحقل مطلوب";
      //     else if (!isValidMotherName(quadriliteralName)) {
      //       newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      //     }
      //     if (!id) {
      //       newErrors.id = "هذا الحقل مطلوب";
      //     } else if (!isValidId(id)) {
      //       newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
      //     }
      //   } else if (card.title === "تقديم شكوي مرافق") {
      //     if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
      //     else if (!isValidMotherName(fullName)) {
      //       newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      //     }
      //     if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      //     if (!complaintType) newErrors.complaintType = "هذا الحقل مطلوب";
      //     if (!complaintDescription)
      //       newErrors.complaintDescription = "هذا الحقل مطلوب";
      //     if (!governorate) newErrors.governorate = "هذا الحقل مطلوب";
      //     if (!utilityType) newErrors.utilityType = "هذا الحقل مطلوب";
      //     if (!email) newErrors.email = "هذا الحقل مطلوب";
      //     else if (!isValidEmail(email)) {
      //       newErrors.email = "البريد الإلكتروني غير صالح";
      //     }
      //     if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
      //     if (!phone) newErrors.phone = "هذا الحقل مطلوب";
      //     else if (!isValidPhoneNumber(phone))
      //       newErrors.phone = "الرقم غير صالح";
      //   }
      //   else if(card.title ==="التقديم على عداد كهرباء / مياه"){
      //     if (!id) {
      //       newErrors.id = "هذا الحقل مطلوب";
      //     } else if (!isValidId(id)) {
      //       newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
      //     }
      //     if (!email) newErrors.email = "هذا الحقل مطلوب";
      //     else if (!isValidEmail(email)) {
      //       newErrors.email = "البريد الإلكتروني غير صالح";
      //     }
      //     if (!phone) newErrors.phone = "هذا الحقل مطلوب";
      //     else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
      //     if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
      //     else if (!isValidMotherName(fullName)) {
      //       newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      //     }
      //   }

      // }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({
      quadriliteralName,
      id,
      phone,
      idPhoto,
      certificateType,
      facilityType,
      elctricBill,
      detailedAddress,
      subscriberNumber,
      fullName,
      email,
      complaintType,
      governorate,
      complaintDescription,
      utilityType,
      meterNumber,
    }),
  }));

  const handleNext = () => {
    const newErrors = {};

    if (activeStep === 1) {
      if (card.title === "شهادة كفاءة الطاقة") {
        if (!quadriliteralName) newErrors.quadriliteralName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(quadriliteralName)) {
          newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
        if (!phone) newErrors.phone = "هذا الحقل مطلوب";
        else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
        if (!facilityType) newErrors.facilityType = "هذا الحقل مطلوب";
        if (!certificateType) newErrors.certificateType = "هذا الحقل مطلوب";
        if (!elctricBill) newErrors.elctricBill = "هذا الحقل مطلوب";
        if (!idPhoto) newErrors.idPhoto = "هذا الحقل مطلوب";
      } else if (card.title === "تقديم شكوى مرافق") {
        if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(fullName)) {
          newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
        if (!complaintType) newErrors.complaintType = "هذا الحقل مطلوب";
        if (!complaintDescription)
          newErrors.complaintDescription = "هذا الحقل مطلوب";
        if (!governorate) newErrors.governorate = "هذا الحقل مطلوب";
        if (!utilityType) newErrors.utilityType = "هذا الحقل مطلوب";
        if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
        if (!email) newErrors.email = "هذا الحقل مطلوب";
        else if (!isValidEmail(email)) {
          newErrors.email = "البريد الإلكتروني غير صالح";
        }
        if (!phone) newErrors.phone = "هذا الحقل مطلوب";
        else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
      } else if (card.title === "التقديم على عداد كهرباء / مياه") {
        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!email) newErrors.email = "هذا الحقل مطلوب";
        else if (!isValidEmail(email)) {
          newErrors.email = "البريد الإلكتروني غير صالح";
        }
        if (!phone) newErrors.phone = "هذا الحقل مطلوب";
        else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
        if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(fullName)) {
          newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
      } else if (card.title === "نقل ملكية عداد") {
        if (!fullName) newErrors.fullName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(fullName)) {
          newErrors.fullName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!id) newErrors.id = "هذا الحقل مطلوب";
        else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }

        if (!phone) newErrors.phone = "هذا الحقل مطلوب";
        else if (!isValidPhoneNumber(phone)) newErrors.phone = "الرقم غير صالح";
        if (!meterNumber) newErrors.meterNumber = "هذا الحقل مطلوب";
        if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (activeStep === 1) {
        // Check if all required fields for step 1 are filled
        let step1Completed = true;
        if (card.title === "شهادة كفاءة الطاقة") {
          if (
            !quadriliteralName ||
            !id ||
            !detailedAddress ||
            !phone ||
            !facilityType ||
            !certificateType ||
            !elctricBill ||
            !idPhoto
          )
            step1Completed = false;
        } else if (card.title === "تقديم شكوى مرافق") {
          if (
            !email ||
            !subscriberNumber ||
            !fullName ||
            !complaintType ||
            !governorate ||
            !complaintDescription ||
            !utilityType
          )
            step1Completed = false;
        } else if (card.title === "التقديم على عداد كهرباء / مياه") {
          if (!email || !phone || !fullName || !id) step1Completed = false;
        } else if (card.title === "نقل ملكية عداد") {
          if (!fullName || !id || !phone || !meterNumber || !detailedAddress)
            step1Completed = false;
        }
        if (step1Completed && activeStep < 3) {
          setActiveStep(activeStep + 1);
        }
      } else if (activeStep < 3) {
        setActiveStep(activeStep + 1);
      }
    }
  };
  const navigationSteps = {
    "شهادة كفاءة الطاقة": [
      { label: "بيانات المالك والمنشأة", icon: <FaUser /> },
      { label: "بيانات الفحص والمرفقات", icon: <FaFileAlt /> },
      { label: "تأكيد الطلب", icon: <FaCheck /> },
    ],
    "تقديم شكوى مرافق": [
      { label: "بيانات الشكوى والمبلغ", icon: <FaUser /> },
      { label: "تفاصيل إضافية", icon: <FaFileAlt /> },
      { label: "ملخص الشكوى", icon: <FaCheck /> },
    ],
    "التقديم على عداد كهرباء / مياه": [
      { label: "بيانات المتقدم", icon: <FaUser /> },
      { label: "بيانات العقار", icon: <FaFileAlt /> },
      { label: "تأكيد البيانات", icon: <FaCheck /> },
    ],
    "نقل ملكية عداد": [
      { label: "بيانات المالك الحالي", icon: <FaUser /> },
      { label: "بيانات المالك الجديد", icon: <FaFileAlt /> },
      { label: "تأكيد النقل", icon: <FaCheck /> },
    ],
  };

  const currentStepLabels = navigationSteps[card?.title] || [
    { label: "الخطوة 1", icon: <FaUser /> },
    { label: "الخطوة 2", icon: <FaFileAlt /> },
    { label: "الخطوة 3", icon: <FaCheck /> },
  ];
  const handleRelationshipChange = (e) => {
    setRelationshipType(e.target.value);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            {card.title === "شهادة كفاءة الطاقة" && (
              <>
                <div className="mb-3"></div>

                <div className="mt-3 p-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label"> الاسم رباعي </label>
                        <input
                          type="text"
                          className={`form-control custom-input ${
                            errors.quadriliteralName ? "is-invalid" : ""
                          }`}
                          value={quadriliteralName}
                          onChange={(e) => setQuadriliteralName(e.target.value)}
                        />
                        {errors.quadriliteralName && (
                          <div className="text-danger">
                            {errors.quadriliteralName}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">الرقم القومي </label>
                        <input
                          type="text"
                          className={`form-control custom-input ${
                            errors.id ? "is-invalid" : ""
                          }`}
                          value={id}
                          onChange={(e) => setId(e.target.value)}
                        />
                        {errors.id && (
                          <div className="text-danger">{errors.id}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">العنوان بالتفصيل</label>
                        <input
                          type="text"
                          className={`form-control custom-input ${
                            errors.detailedAddress ? "is-invalid" : ""
                          }`}
                          value={detailedAddress}
                          onChange={(e) => setDetailedAddress(e.target.value)}
                        />
                        {errors.detailedAddress && (
                          <div className="text-danger">
                            {errors.detailedAddress}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">رقم الهاتف </label>
                        <input
                          type="text"
                          className={`form-control custom-input ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && (
                          <div className="text-danger">{errors.phone}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">نوع المنشأة </label>
                        <select
                          type="text"
                          className={`form-select custom-select-style custom-input ${
                            errors.facilityType ? "is-invalid" : ""
                          }`}
                          value={facilityType}
                          onChange={(e) => setFacilityType(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="Residential">سكني</option>
                          <option value="Commercial">تجاري</option>
                          <option value="Industrial">صناعي</option>
                        </select>
                        {errors.facilityType && (
                          <div className="text-danger">
                            {errors.facilityType}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          الغرض من استخراج الشهادة
                        </label>
                        <select
                          type="text"
                          className={`form-select custom-select-style custom-input ${
                            errors.certificateType ? "is-invalid" : ""
                          }`}
                          value={certificateType}
                          onChange={(e) => setCertificateType(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="Residential">بيع عقار</option>
                          <option value="Commercial">تأجير</option>
                          <option value="Industrial">تسجيل رسمي</option>
                        </select>
                        {errors.certificateType && (
                          <div className="text-danger">
                            {errors.certificateType}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          صورة اخر فاتورة كهرباء
                        </label>
                        <div className="file-input-container">
                          <input
                            type="file"
                            id="elctricBill"
                            accept="image/*"
                            onChange={(e) => {
                              setElctricBill(e.target.files[0]);
                            }}
                          />
                          <label
                            htmlFor="elctricBill"
                            className={` file-input-label ${
                              errors.elctricBill ? "is-invalid" : ""
                            }`}
                          >
                            <span className="file-name">
                              {elctricBill
                                ? elctricBill.name
                                : "لم يتم اختيار ملف"}
                            </span>
                            <span className="browse-button">اختر ملف</span>
                          </label>
                        </div>
                        {errors.elctricBill && (
                          <div className="text-danger">
                            {errors.elctricBill}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          صورة بطاقة الرقم القومي
                        </label>
                        <div className="file-input-container">
                          <input
                            type="file"
                            id="idPhoto"
                            accept="image/*"
                            onChange={(e) => {
                              setIdPhoto(e.target.files[0]);
                            }}
                          />
                          <label
                            htmlFor="idPhoto"
                            className={`file-input-label ${
                              errors.idPhoto ? "is-invalid" : ""
                            }`}
                          >
                            <span className="file-name">
                              {idPhoto ? idPhoto.name : "لم يتم اختيار ملف"}
                            </span>
                            <span className="browse-button">اختر ملف</span>
                          </label>
                        </div>
                        {errors.idPhoto && (
                          <div className="text-danger">{errors.idPhoto}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* New Requirements Section */}
                  <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
                    <h4 className="text-color mb-3 fw-bold">
                      شروط إصدار شهادة كفاءة الطاقة
                    </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-3 d-flex align-items-start">
                            <span className="me-2 text-warning">💡</span>
                            <span>يجب أن يكون مقدم الطلب هو صاحب العداد .</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <span className="me-2 text-warning">💡</span>
                            <span>يجب أن تكون بيانات العداد صحيحة ومحدثة.</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <span className="me-2 text-warning">💡</span>
                            <span>
                              يجب تسديد أي مستحقات مالية متأخرة قبل تقديم الطلب.
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-3 d-flex align-items-start">
                            <span className="me-2 text-warning fs-4">💡</span>
                            <span>
                              العقار يجب أن يكون مبنيًّا بشكل قانوني ومسجل في
                              الجهات الرسمية.
                            </span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <span className="me-2 text-warning">💡</span>
                            <span>
                              لا يتم إصدار الشهادة إلا بعد فحص استهلاك الطاقة
                              (قد يتطلب زيارة ميدانية أحيانًا حسب القوانين).
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {card.title === "تقديم شكوى مرافق" && (
              <>
                <div className="mb-3">
                  <label className="form-label">نوع المرفق </label>
                  <select
                    className={`form-select custom-select-style custom-input ${
                      errors.utilityType ? "is-invalid" : ""
                    }`}
                    value={utilityType}
                    onChange={(e) => setUtilityType(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="كهرباء">كهرباء</option>
                    <option value="مياه">مياه</option>
                    <option value="غاز">غاز</option>
                  </select>
                  {errors.utilityType && (
                    <div className="text-danger">{errors.utilityType}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">المحافظة</label>
                  <select
                    className={`form-select custom-select-style custom-input ${
                      errors.governorate ? "is-invalid" : ""
                    }`}
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="القاهرة">القاهرة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الدقهلية">الدقهلية</option>
                    <option value="الشرقية">الشرقية</option>
                    <option value="القليوبية">القليوبية</option>
                    <option value="المنوفية">المنوفية</option>
                    <option value="الغربية">الغربية</option>
                    <option value="المنيا">المنيا</option>
                    <option value="أسيوط">أسيوط</option>
                    <option value="سوهاج">سوهاج</option>
                    <option value="قنا">قنا</option>
                    <option value="أسوان">أسوان</option>
                    <option value="الأقصر">الأقصر</option>
                    <option value="البحر الأحمر">البحر الأحمر</option>
                    <option value="شمال سيناء">شمال سيناء</option>
                    <option value="جنوب سيناء">جنوب سيناء</option>
                    <option value="الفيوم">الفيوم</option>
                    <option value="بني سويف">بني سويف</option>
                    <option value="سوهاج">سوهاج</option>
                    <option value="الوادى الجديد">الوادى الجديد</option>
                    <option value="كفر الشيخ">كفر الشيخ</option>
                    <option value="دمياط">دمياط</option>
                    <option value="بورسعيد">بورسعيد</option>
                    <option value="السويس">السويس</option>
                    <option value="الإسماعيلية">الإسماعيلية</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="شمال سيناء">شمال سيناء</option>
                    <option value="جنوب سيناء">جنوب سيناء</option>
                    <option value="الشرقية">الشرقية</option>
                    <option value="البحيرة">البحيرة</option>
                    <option value="المنوفية">المنوفية</option>
                  </select>
                  {errors.governorate && (
                    <div className="text-danger">{errors.governorate}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">العنوان التفصيلي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.detailedAddress ? "is-invalid" : ""
                    }`}
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                  />
                  {errors.detailedAddress && (
                    <div className="text-danger">{errors.detailedAddress}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">نوع الشكوى </label>
                  <select
                    className={`form-select custom-select-style custom-input ${
                      errors.complaintType ? "is-invalid" : ""
                    }`}
                    value={complaintType}
                    onChange={(e) => setComplaintType(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="cut">انقطاع الخدمة</option>
                    <option value="highBill">فاتورة مرتفعة</option>
                    <option value="leak">تسريب</option>
                    <option value="badService">خدمة سيئة</option>
                    <option value="other">أخرى</option>
                  </select>
                  {errors.complaintType && (
                    <div className="text-danger">{errors.complaintType}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">وصف الشكوى </label>
                  <textarea
                    className={`form-control customW ${
                      errors.complaintDescription ? "is-invalid" : ""
                    }`}
                    rows="4"
                    value={complaintDescription}
                    onChange={(e) => setComplaintDescription(e.target.value)}
                  ></textarea>
                  {errors.complaintDescription && (
                    <div className="text-danger">
                      {errors.complaintDescription}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">رقم المشترك </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.subscriberNumber ? "is-invalid" : ""
                    }`}
                    value={subscriberNumber}
                    onChange={(e) => setSubscriberNumber(e.target.value)}
                  />
                  {errors.subscriberNumber && (
                    <div className="text-danger">{errors.subscriberNumber}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">الاسم رباعي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <div className="text-danger">{errors.fullName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">رقم الهاتف </label>
                  <input
                    type="tel"
                    className={`form-control custom-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">البريد الإلكتروني </label>
                  <input
                    type="email"
                    className={`form-control custom-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </>
            )}
            {card.title === "التقديم على عداد كهرباء / مياه" && (
              <>
                <div className="mb-3">
                  <label className="form-label"> الاسم رباعي </label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    name="fullName"
                    autoComplete="name"
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
                    className={`form-control custom-input ${
                      errors.id ? "is-invalid" : ""
                    }`}
                    name="id"
                    autoComplete="off"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الهاتف </label>
                  <input
                    type="tel"
                    className={`form-control custom-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">البريد الإلكتروني </label>
                  <input
                    type="email"
                    className={`form-control custom-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </>
            )}
            {card.title === "نقل ملكية عداد" && (
              <>
                <h3 className="text-color mb-3">بيانات المالك الحالي</h3>
                <div className="mb-3">
                  <label className="form-label">الاسم رباعي</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <div className="text-danger">{errors.fullName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم القومي </label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.id ? "is-invalid" : ""
                    }`}
                    name="id"
                    autoComplete="off"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الهاتف</label>
                  <input
                    type="tel"
                    className={`form-control custom-input  ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم العداد</label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.meterNumber ? "is-invalid" : ""
                    }`}
                    value={meterNumber}
                    onChange={(e) => setMeterNumber(e.target.value)}
                  />
                  {errors.meterNumber && (
                    <div className="text-danger">{errors.meterNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">عنوان تركيب العداد</label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.detailedAddress ? "is-invalid" : ""
                    }`}
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                  />
                  {errors.detailedAddress && (
                    <div className="text-danger">{errors.detailedAddress}</div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      case 2:
        return (
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">بيانات المالك الجديد</h3>
            {card.title === "نقل ملكية عداد" && (
              <>
                <div className="mb-3">
                  <label className="form-label">الاسم رباعي</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.quadriliteralName ? "is-invalid" : ""
                    }`}
                    value={quadriliteralName}
                    onChange={(e) => setQuadriliteralName(e.target.value)}
                  />
                  {errors.quadriliteralName && (
                    <div className="text-danger">
                      {errors.quadriliteralName}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم القومي </label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.id2 ? "is-invalid" : ""
                    }`}
                    value={id2}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id2 && (
                    <div className="text-danger">{errors.id2}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الهاتف</label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">سبب نقل الملكية</label>

                  <select
                    className={`form-select custom-select-style custom-input ${
                      errors.relationshipType ? "is-invalid" : ""
                    }`}
                    value={relationshipType}
                    onChange={handleRelationshipChange}
                  >
                    <option value=""></option>
                    <option value="شراء">شراء</option>
                    <option value="إيجار">إيجار</option>
                    <option value="ورث">ورث</option>
                  </select>
                  {errors.relationshipType && (
                    <div className="text-danger">{errors.relationshipType}</div>
                  )}
                </div>
                {relationshipType === "ورث" && (
                  <>
                    <div className="form-group">
                      <label>إعلام الوراثة الرسمي (PDF أو صورة):</label>
                      <input type="file" accept=".pdf,image/*" required />
                    </div>

                    <div className="form-group">
                      <label>موافقة باقي الورثة (إن وجدت):</label>
                      <input type="file" accept=".pdf,image/*" />
                    </div>

                    <div className="form-group">
                      <label>هل لديك توكيل من باقي الورثة؟</label>
                      <select required>
                        <option value="">اختر</option>
                        <option value="نعم">نعم</option>
                        <option value="لا">لا</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            )}
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
            idPhoto,
            certificateType,
            facilityType,
            detailedAddress,
            phone,
            elctricBill,
            quadriliteralName,
            id,
            subscriberNumber,
            fullName,
            email,
            phone,
            complaintType,
            governorate,
            complaintDescription,
            utilityType,
            meterNumber,
          }}
        />
        <NavigationButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          formData={{
            card,
            idPhoto,
            certificateType,
            facilityType,
            detailedAddress,
            phone,
            elctricBill,
            quadriliteralName,
            id,
            subscriberNumber,
            fullName,
            email,
            phone,
            complaintType,
            governorate,
            complaintDescription,
            utilityType,
            meterNumber,
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

export default EnergyServices;
