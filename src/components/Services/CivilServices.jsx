import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Civil.css";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import UserInfoDisplay from "../UserInfoDisplay";
import DeliveryData from "../DeliveryData";
import { civilService } from "../../services/civilService";
import Sidebar from "../SideBar";

const CivilServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryData, setDeliveryData] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    motherName: "",
    isSelf: "",
    numberOfCopies: "",
    quadriliteralName: "",
    id: "",
    anotherMotherName: "",
    kinship: "",
    gender: "",
    spouseName: "",
  });

  // Validation functions
  const isValidName = (name) => {
    // Check if name has exactly 4 parts (quadriliteral name)
    const nameParts = name
      .trim()
      .split(/\s+/)
      .filter((part) => part.length > 0);
    return (
      nameParts.length === 4 &&
      /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/.test(name)
    );
  };
  const isValidMotherName = (motherName) =>
    /^[\u0621-\u064A\u066E-\u06D3\s]{2,}$/.test(motherName);
  const isValidId = (id) => /^\d{14}$/.test(id);

  useEffect(() => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    } else {
      setAuthError(null);
    }
  }, [user]);

  // Fetch user's civil service requests
  const fetchUserRequests = async () => {
    if (!user) return;

    try {
      const requests = await civilService.getUserCivilRequests();
      console.log("User civil requests:", requests);
      // You can store these requests in state if needed
    } catch (error) {
      console.error("Error fetching user requests:", error);
    }
  };

  // Get document type for backend
  const getDocumentType = (title) => {
    if (title.includes("ميلاد مميكنة لأول مرة"))
      return "BirthCertificateForFisrTime";
    if (title.includes("ميلاد")) return "BirthCertificate";
    if (title.includes("زواج")) return "MarriageCertificate";
    if (title.includes("طلاق")) return "DivorceCertificate";
    if (title.includes("وفاة")) return "Death Certificate";
    return "Other";
  };

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validation logic
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Special validation for death certificate and first time birth certificate
      if (card.title === "شهادة وفاة") {
        if (!formData.quadriliteralName) {
          newErrors.quadriliteralName = "هذا الحقل مطلوب";
        } else if (!isValidName(formData.quadriliteralName)) {
          newErrors.quadriliteralName = "يجب إدخال الاسم الرباعي (4 مقاطع)";
        }

        if (!formData.id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(formData.id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }

        if (!formData.anotherMotherName) {
          newErrors.anotherMotherName = "هذا الحقل مطلوب";
        } else if (!isValidMotherName(formData.anotherMotherName)) {
          newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (!formData.kinship) newErrors.kinship = "هذا الحقل مطلوب";
        if (!formData.gender) newErrors.gender = "هذا الحقل مطلوب";
        if (!formData.numberOfCopies) {
          newErrors.numberOfCopies = "هذا الحقل مطلوب";
        }
      }
      if (card.title === "شهادة ميلاد مميكنة لأول مرة") {
        if (!formData.quadriliteralName) {
          newErrors.quadriliteralName = "هذا الحقل مطلوب";
        } else if (!isValidName(formData.quadriliteralName)) {
          newErrors.quadriliteralName = "يجب إدخال الاسم الرباعي (4 مقاطع)";
        }

        if (!formData.anotherMotherName) {
          newErrors.anotherMotherName = "هذا الحقل مطلوب";
        } else if (!isValidMotherName(formData.anotherMotherName)) {
          newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (!formData.kinship) newErrors.kinship = "هذا الحقل مطلوب";
        if (!formData.gender) newErrors.gender = "هذا الحقل مطلوب";
      } else {
        // Regular validation for other certificates
        if (!formData.motherName) {
          newErrors.motherName = "هذا الحقل مطلوب";
        } else if (!isValidMotherName(formData.motherName)) {
          newErrors.motherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (formData.isSelf === "") {
          newErrors.isSelf = "اختر نعم أو لا";
        }

        if (formData.isSelf === false) {
          if (!formData.quadriliteralName) {
            newErrors.quadriliteralName = "هذا الحقل مطلوب";
          } else if (!isValidName(formData.quadriliteralName)) {
            newErrors.quadriliteralName = "يجب إدخال الاسم الرباعي (4 مقاطع)";
          }

          if (!formData.id) {
            newErrors.id = "هذا الحقل مطلوب";
          } else if (!isValidId(formData.id)) {
            newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
          }

          if (!formData.anotherMotherName) {
            newErrors.anotherMotherName = "هذا الحقل مطلوب";
          } else if (!isValidMotherName(formData.anotherMotherName)) {
            newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }

          if (!formData.kinship) newErrors.kinship = "هذا الحقل مطلوب";
          if (!formData.gender) newErrors.gender = "هذا الحقل مطلوب";

          if (card.title === "قسيمة زواج" && !formData.spouseName) {
            newErrors.spouseName = "هذا الحقل مطلوب";
          } else if (
            card.title === "قسيمة زواج" &&
            !isValidName(formData.spouseName)
          ) {
            newErrors.spouseName = "يجب إدخال الاسم الرباعي (4 مقاطع)";
          }
        }

        if (!formData.numberOfCopies) {
          newErrors.numberOfCopies = "هذا الحقل مطلوب";
        }
      }
    }

    if (step === 2) {
      if (!deliveryData.governorate) newErrors.governorate = "المحافظة مطلوبة";
      if (!deliveryData.city) newErrors.city = "المدينة مطلوبة";
      if (!deliveryData.district) newErrors.district = "الحي / المركز مطلوب";
      if (!deliveryData.detailedAddress)
        newErrors.detailedAddress = "العنوان التفصيلي مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle delivery data from DeliveryData component
  const handleDeliveryData = (data) => {
    setDeliveryData(data);
  };

  // Submit form to backend
  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setIsSubmitting(true);
    try {
      // Prepare request data according to backend object structure
      const requestData = {
        documentType: getDocumentType(card.title),
        applicantName: user.name,
        applicantNID: user.nationalId,
        relation:
          card.title === "شهادة وفاة" ||
          card.title === "شهادة ميلاد مميكنة لأول مرة"
            ? formData.kinship
            : formData.isSelf
            ? "Self"
            : formData.kinship,
        ownerName:
          card.title === "شهادة وفاة" ||
          card.title === "شهادة ميلاد مميكنة لأول مرة"
            ? formData.quadriliteralName
            : formData.isSelf
            ? user.name
            : formData.quadriliteralName,
        ownerNID:
          card.title === "شهادة وفاة" ||
          card.title === "شهادة ميلاد مميكنة لأول مرة"
            ? formData.id
            : formData.isSelf
            ? user.nationalId
            : formData.id,
        ownerMotherName:
          card.title === "شهادة وفاة" ||
          card.title === "شهادة ميلاد مميكنة لأول مرة"
            ? formData.anotherMotherName
            : formData.isSelf
            ? formData.motherName
            : formData.anotherMotherName,
        copiesCount: parseInt(formData.numberOfCopies),
        governorate: deliveryData.governorate,
        district: deliveryData.district,
        city: deliveryData.city,
        detailsAddress: deliveryData.detailedAddress,
        extraFields: {
          gender: formData.gender || "",
        },
      };

      console.log("Sending request to backend:", requestData);
      const response = await civilService.submitCivilServiceRequest(
        requestData
      );
      console.log("Backend response:", response);

      // Navigate to success page with response data
      navigate("/civilDone", {
        state: {
          serviceType: "الخدمات المدنية",
          documentType: card.title,
          requestId: response.requestId || response.id,
          responseData: response,
        },
      });
      // حفظ بيانات الطلب في localStorage
      localStorage.setItem(
        "lastCivilOrder",
        JSON.stringify({
          serviceType: "الخدمات المدنية",
          documentType: card.title,
          requestId: response.requestId || response.id,
          responseData: response,
        })
      );
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({
        submit: error.response?.data?.message || "حدث خطأ أثناء تقديم الطلب",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => validateStep(activeStep),
    getFormData: () => ({ ...formData, ...deliveryData }),
  }));

  // Render form fields based on service type
  const renderServiceFields = () => {
    // Special case for death certificate - no self option
    if (card.title === "شهادة وفاة") {
      return (
        <div className="mt-3 p-3">
          <div className="row">
            <h3 className="text-color mb-3">بيانات المتوفي</h3>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">الاسم رباعي للمتوفي</label>
                <input
                  type="text"
                  className={`form-control custom-input ${
                    errors.quadriliteralName ? "is-invalid" : ""
                  }`}
                  value={formData.quadriliteralName}
                  onChange={(e) =>
                    handleFieldChange("quadriliteralName", e.target.value)
                  }
                />
                {errors.quadriliteralName && (
                  <div className="text-danger">{errors.quadriliteralName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">الرقم القومي</label>
                <input
                  type="text"
                  className={`form-control custom-input ${
                    errors.id ? "is-invalid" : ""
                  }`}
                  value={formData.id}
                  onChange={(e) => handleFieldChange("id", e.target.value)}
                />
                {errors.id && <div className="text-danger">{errors.id}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">صلة القرابة</label>
                <select
                  className={`form-select custom-select-style custom-input ${
                    errors.kinship ? "is-invalid" : ""
                  }`}
                  value={formData.kinship}
                  onChange={(e) => handleFieldChange("kinship", e.target.value)}
                >
                  <option value="">اختر صلة القرابة</option>
                  <option value="الابن">الابن</option>
                  <option value="الابنة">الابنة</option>
                  <option value="الاب">الاب</option>
                  <option value="الام">الام</option>
                  <option value="الزوج">الزوج</option>
                  <option value="الزوجة">الزوجة</option>
                </select>
                {errors.kinship && (
                  <div className="text-danger">{errors.kinship}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">اسم الام للمتوفي</label>
                <input
                  type="text"
                  className={`form-control custom-input ${
                    errors.anotherMotherName ? "is-invalid" : ""
                  }`}
                  value={formData.anotherMotherName}
                  onChange={(e) =>
                    handleFieldChange("anotherMotherName", e.target.value)
                  }
                />
                {errors.anotherMotherName && (
                  <div className="text-danger">{errors.anotherMotherName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">النوع</label>
                <select
                  className={`form-select custom-select-style custom-input ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  value={formData.gender}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                >
                  <option value="">اختر النوع</option>
                  <option value="female">أنثي</option>
                  <option value="male">ذكر</option>
                </select>
                {errors.gender && (
                  <div className="text-danger">{errors.gender}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">عدد النسخ</label>
                <select
                  className={`form-select custom-select-style custom-input ${
                    errors.numberOfCopies ? "is-invalid" : ""
                  }`}
                  value={formData.numberOfCopies}
                  onChange={(e) =>
                    handleFieldChange("numberOfCopies", e.target.value)
                  }
                >
                  <option value="">اختر عدد النسخ</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                {errors.numberOfCopies && (
                  <div className="text-danger">{errors.numberOfCopies}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (card.title === "شهادة ميلاد مميكنة لأول مرة") {
      return (
        <div className="mt-3 p-3">
          <div className="row">
            <h3 className="text-color mb-3">بيانات صاحب الوثيقة</h3>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">الاسم رباعي </label>
                <input
                  type="text"
                  className={`form-control custom-input ${
                    errors.quadriliteralName ? "is-invalid" : ""
                  }`}
                  value={formData.quadriliteralName}
                  onChange={(e) =>
                    handleFieldChange("quadriliteralName", e.target.value)
                  }
                />
                {errors.quadriliteralName && (
                  <div className="text-danger">{errors.quadriliteralName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">صلة القرابة</label>
                <select
                  className={`form-select custom-select-style custom-input ${
                    errors.kinship ? "is-invalid" : ""
                  }`}
                  value={formData.kinship}
                  onChange={(e) => handleFieldChange("kinship", e.target.value)}
                >
                  <option value="">اختر صلة القرابة</option>
                  <option value="الابن">الابن</option>
                  <option value="الابنة">الابنة</option>
                  <option value="الاب">الاب</option>
                  <option value="الام">الام</option>
                </select>
                {errors.kinship && (
                  <div className="text-danger">{errors.kinship}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">اسم الام لصاحب الوثيقة</label>
                <input
                  type="text"
                  className={`form-control custom-input ${
                    errors.anotherMotherName ? "is-invalid" : ""
                  }`}
                  value={formData.anotherMotherName}
                  onChange={(e) =>
                    handleFieldChange("anotherMotherName", e.target.value)
                  }
                />
                {errors.anotherMotherName && (
                  <div className="text-danger">{errors.anotherMotherName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">النوع</label>
                <select
                  className={`form-select custom-select-style custom-input ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  value={formData.gender}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                >
                  <option value="">اختر النوع</option>
                  <option value="female">أنثي</option>
                  <option value="male">ذكر</option>
                </select>
                {errors.gender && (
                  <div className="text-danger">{errors.gender}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const commonFields = (
      <>
        <div className="mb-3">
          <label className="form-label">اسم الأم لمقدم الطلب</label>
          <input
            type="text"
            className={`form-control custom-input ${
              errors.motherName ? "is-invalid" : ""
            }`}
            value={formData.motherName}
            onChange={(e) => handleFieldChange("motherName", e.target.value)}
          />
          {errors.motherName && (
            <div className="text-danger">{errors.motherName}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            هل تريد إصدار {card.title} لنفسك ؟
          </label>
          <div className="d-flex gap-5">
            <div className="form-check">
              <input
                type="radio"
                name="isSelf"
                className="form-check-input"
                checked={formData.isSelf === true}
                onChange={() => handleFieldChange("isSelf", true)}
              />
              <label className="form-check-label">نعم</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="isSelf"
                className="form-check-input"
                checked={formData.isSelf === false}
                onChange={() => handleFieldChange("isSelf", false)}
              />
              <label className="form-check-label">لا</label>
            </div>
          </div>
          {errors.isSelf && <div className="text-danger">{errors.isSelf}</div>}
        </div>
      </>
    );

    const selfFields = (
      <div className="mt-3">
        <label className="form-label">عدد النسخ المطلوبة</label>
        <select
          className={`form-select custom-select-style custom-input ${
            errors.numberOfCopies ? "is-invalid" : ""
          }`}
          value={formData.numberOfCopies}
          onChange={(e) => handleFieldChange("numberOfCopies", e.target.value)}
        >
          <option value="">اختر عدد النسخ</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.numberOfCopies && (
          <div className="text-danger">{errors.numberOfCopies}</div>
        )}
      </div>
    );

    const otherPersonFields = (
      <div className="mt-3 p-3">
        <div className="row">
          <h3 className="text-color mb-3">بيانات صاحب الوثيقة</h3>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">الاسم رباعي</label>
              <input
                type="text"
                className={`form-control custom-input ${
                  errors.quadriliteralName ? "is-invalid" : ""
                }`}
                value={formData.quadriliteralName}
                onChange={(e) =>
                  handleFieldChange("quadriliteralName", e.target.value)
                }
              />
              {errors.quadriliteralName && (
                <div className="text-danger">{errors.quadriliteralName}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">الرقم القومي</label>
              <input
                type="text"
                className={`form-control custom-input ${
                  errors.id ? "is-invalid" : ""
                }`}
                value={formData.id}
                onChange={(e) => handleFieldChange("id", e.target.value)}
              />
              {errors.id && <div className="text-danger">{errors.id}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">صلة القرابة</label>
              <select
                className={`form-select custom-select-style custom-input ${
                  errors.kinship ? "is-invalid" : ""
                }`}
                value={formData.kinship}
                onChange={(e) => handleFieldChange("kinship", e.target.value)}
              >
                <option value="">اختر صلة القرابة</option>
                <option value="الابن">الابن</option>
                <option value="الابنة">الابنة</option>
                <option value="الاب">الاب</option>
                <option value="الام">الام</option>
                <option value="الزوج">الزوج</option>
                <option value="الزوجة">الزوجة</option>
              </select>
              {errors.kinship && (
                <div className="text-danger">{errors.kinship}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">اسم الام لصاحب الوثيقة</label>
              <input
                type="text"
                className={`form-control custom-input ${
                  errors.anotherMotherName ? "is-invalid" : ""
                }`}
                value={formData.anotherMotherName}
                onChange={(e) =>
                  handleFieldChange("anotherMotherName", e.target.value)
                }
              />
              {errors.anotherMotherName && (
                <div className="text-danger">{errors.anotherMotherName}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">النوع</label>
              <select
                className={`form-select custom-select-style custom-input ${
                  errors.gender ? "is-invalid" : ""
                }`}
                value={formData.gender}
                onChange={(e) => handleFieldChange("gender", e.target.value)}
              >
                <option value="">اختر النوع</option>
                <option value="female">أنثي</option>
                <option value="male">ذكر</option>
              </select>
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">عدد النسخ</label>
              <select
                className={`form-select custom-select-style custom-input ${
                  errors.numberOfCopies ? "is-invalid" : ""
                }`}
                value={formData.numberOfCopies}
                onChange={(e) =>
                  handleFieldChange("numberOfCopies", e.target.value)
                }
              >
                <option value="">اختر عدد النسخ</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.numberOfCopies && (
                <div className="text-danger">{errors.numberOfCopies}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    const partnerField = card.title === "قسيمة زواج" &&
      formData.isSelf === false && (
        <div className="mb-3">
          <label className="form-label">اسم زوج / زوجة صاحب القسيمة</label>
          <input
            type="text"
            className={`form-control custom-input ${
              errors.spouseName ? "is-invalid" : ""
            }`}
            value={formData.spouseName}
            onChange={(e) => handleFieldChange("spouseName", e.target.value)}
          />
          {errors.spouseName && (
            <div className="text-danger">{errors.spouseName}</div>
          )}
        </div>
      );

    return (
      <div>
        {commonFields}
        {formData.isSelf === true && selfFields}
        {formData.isSelf === false && (
          <>
            {otherPersonFields}
            {partnerField}
          </>
        )}
      </div>
    );
  };

  // Render step content
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
            {renderServiceFields()}
            <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
              <h4 className="mb-3">
                ⚠️ ضوابط استخراج {card.title} من خلال الانترنت
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-start">
                  <span className="me-2 text-warning">💡</span>
                  <span>يجب كتابة اسم المستفيد واسم الام له بطريقة صحيحة</span>
                </li>
                <li className="mb-2 d-flex align-items-start">
                  <span className="me-2 text-warning">💡</span>
                  <span>
                    يجب ان يكون مقدم الطلب هو صاحب الشأن او لاحد اقرباء الدرجة
                    الأولى
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <DeliveryData onDataChange={handleDeliveryData} errors={errors} />
        );
      case 3:
        return (
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
                    {card.title === "شهادة وفاة" ||
                    card.title === "شهادة ميلاد مميكنة لأول مرة" ? (
                      <>
                        <p>
                          <strong>الاسم الرباعي:</strong>{" "}
                          {formData.quadriliteralName}
                        </p>
                        <p>
                          <strong>الرقم القومي:</strong> {formData.id}
                        </p>
                        <p>
                          <strong>اسم الأم:</strong>{" "}
                          {formData.anotherMotherName}
                        </p>
                        <p>
                          <strong>صلة القرابة:</strong> {formData.kinship}
                        </p>
                        <p>
                          <strong>النوع:</strong>{" "}
                          {formData.gender === "male" ? "ذكر" : "أنثى"}
                        </p>
                        <p>
                          <strong>عدد النسخ:</strong> {formData.numberOfCopies}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>اسم الأم لمقدم الطلب:</strong>{" "}
                          {formData.motherName}
                        </p>
                        <p>
                          <strong>صاحب الطلب:</strong>{" "}
                          {formData.isSelf ? user?.name : "شخص آخر"}
                        </p>
                        {formData.isSelf ? (
                          <p>
                            <strong>عدد النسخ:</strong>{" "}
                            {formData.numberOfCopies}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>الاسم الرباعي:</strong>{" "}
                              {formData.quadriliteralName}
                            </p>
                            <p>
                              <strong>الرقم القومي:</strong> {formData.id}
                            </p>
                            <p>
                              <strong>اسم الأم:</strong>{" "}
                              {formData.anotherMotherName}
                            </p>
                            <p>
                              <strong>صلة القرابة:</strong> {formData.kinship}
                            </p>
                            <p>
                              <strong>النوع:</strong>{" "}
                              {formData.gender === "male" ? "ذكر" : "أنثى"}
                            </p>
                            <p>
                              <strong>عدد النسخ:</strong>{" "}
                              {formData.numberOfCopies}
                            </p>
                            {formData.spouseName && (
                              <p>
                                <strong>اسم الزوج/الزوجة:</strong>{" "}
                                {formData.spouseName}
                              </p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

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

            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-color">ملخص التكلفة</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>تكلفة الوثيقة:</span>
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

      <div className="">
        <div className="mb-3">
          <Steppar
            active={activeStep}
            setActive={setActiveStep}
            formData={{ ...formData, ...deliveryData, card }}
            disabled={!user}
          />
          <NavigationButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            formData={{ ...formData, ...deliveryData, card }}
            disabled={!user}
          />
        </div>

        {renderStepContent()}

        {activeStep < 3 && user && <Button handleNext={handleNext} />}

        {activeStep === 3 && (
          <div className="d-flex justify-content-end">
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
  
  );
});

export default CivilServices;
