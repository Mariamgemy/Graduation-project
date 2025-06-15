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
const CivilServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [motherName, setMotherName] = useState("");
  const [anotherMotherName, setAnotherMotherName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [isSelf, setIsSelf] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState("");
  const [quadriliteralName, setQuadriliteralName] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [kinship, setKinship] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  // بيانات الاستلام
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    NID: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    governorate: "",
    city: "",
    district: "",
    detailedAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

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

  useEffect(() => {
    if (!user) {
      setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    } else {
      setAuthError(null);
    }
  }, [user]);
  const getDocumentType = (title) => {
    if (title.includes("ميلاد")) return "BirthCertificate";
    if (title.includes("زواج")) return "MarriageCertificate";
    if (title.includes("طلاق")) return "DivorceCertificate";
    if (title.includes("وفاة")) return "ResidenceCertificate";
    return "Other";
  };

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

  const validateCivilServiceData = (newErrors) => {
    if (!motherName) newErrors.motherName = "هذا الحقل مطلوب";
    else if (!isValidMotherName(motherName)) {
      newErrors.motherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
    }

    if (isSelf === "") newErrors.isSelf = "اختر نعم أو لا";

    if (isSelf === true) {
      if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
    } else if (isSelf === false) {
      if (!quadriliteralName) {
        newErrors.quadriliteralName = "هذا الحقل مطلوب";
      } else if (!isValidName(quadriliteralName)) {
        newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      }

      if (!id) {
        newErrors.id = "هذا الحقل مطلوب";
      } else if (!isValidId(id)) {
        newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
      }

      if (!anotherMotherName) {
        newErrors.anotherMotherName = "هذا الحقل مطلوب";
      } else if (!isValidMotherName(anotherMotherName)) {
        newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      }

      if (!kinship) newErrors.kinship = "هذا الحقل مطلوب";
      if (!gender) newErrors.gender = "هذا الحقل مطلوب";
      if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
    }
  };

  const validateForm = () => {
    const newErrors = {};


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log("تم إرسال البيانات:", formData);

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
      if (
        card.title === "شهادة ميلاد" ||
        card.title === "قسيمة زواج" ||
        card.title === "قسيمة طلاق"
      ) {
        validateCivilServiceData(newErrors);

        if (card.title === "قسيمة زواج" && isSelf === false) {
          if (!partnerName) {
            newErrors.partnerName = "هذا الحقل مطلوب";
          } else if (!isValidName(partnerName)) {
            newErrors.partnerName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }
        }
      } else if (
        card.title === "شهادة ميلاد مميكنة لأول مرة" ||
        card.title === "شهادة وفاة"
      ) {
        if (!quadriliteralName) {
          newErrors.quadriliteralName = "هذا الحقل مطلوب";
        } else if (!isValidName(quadriliteralName)) {
          newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }

        if (!anotherMotherName) {
          newErrors.anotherMotherName = "هذا الحقل مطلوب";
        } else if (!isValidMotherName(anotherMotherName)) {
          newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (!kinship) newErrors.kinship = "هذا الحقل مطلوب";
        if (!gender) newErrors.gender = "هذا الحقل مطلوب";
        if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
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
            {card.title === "شهادة ميلاد" && (
              <div>
                <div className="mb-3">
                  <label className="form-label ">اسم الأم لمقدم الطلب</label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.motherName ? "is-invalid" : ""
                    }`}
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                  {errors.motherName && (
                    <div className="text-danger">{errors.motherName}</div>
                  )}
                </div>

                <div className="mb-3 ">
                  <label className="form-label">
                    هل تريد إصدار شهادة الميلاد لنفسك ؟
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
                    {errors.isSelf && (
                      <div className="text-danger">{errors.isSelf}</div>
                    )}
                  </div>

                  {isSelf === true && (
                    <div className="mt-3">
                      <label className="form-label">عدد النسخ المطلوبة </label>
                      <select
                        className={`form-select custom-select-style custom-input ${
                          errors.numberOfCopies ? "is-invalid" : ""
                        }`}
                        value={numberOfCopies}
                        onChange={(e) => setNumberOfCopies(e.target.value)}
                      >
                        <option value=""> </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {errors.numberOfCopies && (
                        <div className="text-danger">
                          {errors.numberOfCopies}
                        </div>
                      )}
                    </div>
                  )}

                  {isSelf === false && (
                    <div className=" mt-3 p-3">
                      <div className="row">
                        <h3 className="text-color mb-3">بيانات صاحب الشهادة</h3>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الاسم رباعي</label>
                            <input
                              type="text"
                              className={`form-control custom-input ${
                                errors.quadriliteralName ? "is-invalid" : ""
                              }`}
                              value={quadriliteralName}
                              onChange={(e) =>
                                setQuadriliteralName(e.target.value)
                              }
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
                            <label className="form-label">صلة القرابة </label>
                            <select
                              type="text"
                              className={`form-select custom-select-style custom-input ${
                                errors.kinship ? "is-invalid" : ""
                              }`}
                              value={kinship}
                              onChange={(e) => setKinship(e.target.value)}
                            >
                              <option value="">بالنسبة لمقدم الطلب </option>
                              <option value="الابن">الابن</option>
                              <option value="الابنة">الابنة</option>
                              <option value="الاب">الاب</option>
                              <option value="الام">الام</option>
                              <option value="الزوج">الزوج</option>
                              <option value="الزوجة">الزوجة</option>
                            </select>
                            {errors.kinship && (
                              <div className="text-danger">
                                {errors.kinship}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              اسم الام لصاحب الشهادة
                            </label>
                            <input
                              type="text"
                              className={`form-control custom-input ${
                                errors.anotherMotherName ? "is-invalid" : ""
                              }`}
                              value={anotherMotherName}
                              onChange={(e) =>
                                setAnotherMotherName(e.target.value)
                              }
                            />
                            {errors.anotherMotherName && (
                              <div className="text-danger">
                                {errors.anotherMotherName}
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">النوع </label>
                            <select
                              type="text"
                              className={`form-select custom-select-style custom-input ${
                                errors.gender ? "is-invalid" : ""
                              }`}
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value=""> </option>
                              <option value="female">أنثي</option>
                              <option value="male">ذكر</option>
                            </select>
                            {errors.gender && (
                              <div className="text-danger">{errors.gender}</div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">عدد النسخ </label>
                            <select
                              className={`form-select custom-select-style custom-input ${
                                errors.numberOfCopies ? "is-invalid" : ""
                              }`}
                              value={numberOfCopies}
                              onChange={(e) =>
                                setNumberOfCopies(e.target.value)
                              }
                            >
                              <option value=""> </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            {errors.numberOfCopies && (
                              <div className="text-danger">
                                {errors.numberOfCopies}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 p-4 bg-light rounded-3 border border-2 border-color">
                  <h4 className="mb-3">
                    ⚠️ ضوابط استخراج شهادة ميلاد من خلال الانترنت
                  </h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يتم استخراج شهادة الميلاد المميكنة لثانى مرة بشرط
                        استخراج شهادة ميلاد مميكنة مطبوعة سابقاً
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب كتابة اسم المستفيد واسم الام له بطريقة صحيحة حيث ان
                        المستفيد هو الشخص الذي سوف يتم طباعه الشهادة له.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        يجب ان يكون مقدم الطلب هو صاحب الشأن او لاحد اقرباء
                        الدرجة الأولى.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {card.title === "شهادة ميلاد مميكنة لأول مرة" && (
              <>
                <div className=" mt-3 p-3">
                  <div className="row">
                    <h3 className="text-color mb-3">بيانات صاحب الوثيقة </h3>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label"> الاسم رباعي </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
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
                        <label className="form-label">صلة القرابة </label>
                        <select
                          type="text"
                          className={`form-select custom-select-style custom-input ${
                            errors.kinship ? "is-invalid" : ""
                          }`}
                          value={kinship}
                          onChange={(e) => setKinship(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="الابنه">ابنة مقدم الطلب</option>
                          <option value="الابن">ابن مقدم الطلب</option>
                          <option value="الام">والدة مقدم الطلب</option>
                          <option value="الاب">والد مقدم الطلب</option>
                          <option value="الزوجة">زوجة مقدم الطلب</option>
                          <option value="الزوج">زوج مقدم الطلب</option>
                        </select>
                        {errors.kinship && (
                          <div className="text-danger">{errors.kinship}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          اسم الام لصاحب الوثيقة{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
                            errors.anotherMotherName ? "is-invalid" : ""
                          }`}
                          value={anotherMotherName}
                          onChange={(e) => setAnotherMotherName(e.target.value)}
                        />
                        {errors.anotherMotherName && (
                          <div className="text-danger">
                            {errors.anotherMotherName}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">النوع </label>
                        <select
                          type="text"
                          className={`form-select custom-select-style custom-input ${
                            errors.gender ? "is-invalid" : ""
                          }`}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value=""> </option>
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
              </>
            )}
            {card.title === "شهادة وفاة" && (
              <>
                <div className=" mt-3 p-3">
                  <div className="row">
                    <h3 className="text-color mb-3">بيانات المتوفي </h3>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          {" "}
                          الاسم رباعي للمتوفي
                        </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
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
                          className={`form-control custom-input  ${
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
                        <label className="form-label">صلة القرابة </label>
                        <select
                          type="text"
                          className={`form-select custom-select-style custom-input ${
                            errors.kinship ? "is-invalid" : ""
                          }`}
                          value={kinship}
                          onChange={(e) => setKinship(e.target.value)}
                        >
                           <option value=""> </option>
                          <option value="الابنه">ابنة مقدم الطلب</option>
                          <option value="الابن">ابن مقدم الطلب</option>
                          <option value="الام">والدة مقدم الطلب</option>
                          <option value="الاب">والد مقدم الطلب</option>
                          <option value="الزوجة">زوجة مقدم الطلب</option>
                          <option value="الزوج">زوج مقدم الطلب</option>
                        </select>
                        {errors.kinship && (
                          <div className="text-danger">{errors.kinship}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">اسم الام للمتوفي </label>
                        <input
                          type="text"
                          className={`form-control custom-input  ${
                            errors.anotherMotherName ? "is-invalid" : ""
                          }`}
                          value={anotherMotherName}
                          onChange={(e) => setAnotherMotherName(e.target.value)}
                        />
                        {errors.anotherMotherName && (
                          <div className="text-danger">
                            {errors.anotherMotherName}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">النوع </label>
                        <select
                          type="text"
                          className={`form-select custom-select-style custom-input ${
                            errors.gender ? "is-invalid" : ""
                          }`}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="female">أنثي</option>
                          <option value="male">ذكر</option>
                        </select>
                        {errors.gender && (
                          <div className="text-danger">{errors.gender}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">عدد النسخ </label>
                        <select
                          className={`form-select custom-select-style custom-input ${
                            errors.numberOfCopies ? "is-invalid" : ""
                          }`}
                          value={numberOfCopies}
                          onChange={(e) => setNumberOfCopies(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        {errors.numberOfCopies && (
                          <div className="text-danger">
                            {errors.numberOfCopies}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {card.title === "قسيمة طلاق" && (
              <div>
                <div className="mb-3">
                  <label className="form-label ">اسم الأم لمقدم الطلب</label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.motherName ? "is-invalid" : ""
                    }`}
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />

                  {errors.motherName && (
                    <div className="text-danger">{errors.motherName}</div>
                  )}
                </div>

                <div className="mb-3 ">
                  <label className="form-label">
                    هل تريد إصدار قسيمة طلاق لنفسك ؟
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
                    {errors.isSelf && (
                      <div className="text-danger">{errors.isSelf}</div>
                    )}
                  </div>

                  {isSelf === true && (
                    <div className="mt-3">
                      <label className="form-label">عدد النسخ المطلوبة </label>
                      <select
                        className={`form-select custom-select-style custom-input ${
                          errors.numberOfCopies ? "is-invalid" : ""
                        }`}
                        value={numberOfCopies}
                        onChange={(e) => setNumberOfCopies(e.target.value)}
                      >
                        <option value=""> </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {errors.numberOfCopies && (
                        <div className="text-danger">
                          {errors.numberOfCopies}
                        </div>
                      )}
                    </div>
                  )}

                  {isSelf === false && (
                    <div className=" mt-3 p-3">
                      <div className="row">
                        <h3 className="text-color mb-3">بيانات صاحب الوثيقة</h3>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              الاسم رباعي للمطلق / المطلقة
                            </label>
                            <input
                              type="text"
                              className={`form-control custom-input  ${
                                errors.quadriliteralName ? "is-invalid" : ""
                              }`}
                              value={quadriliteralName}
                              onChange={(e) =>
                                setQuadriliteralName(e.target.value)
                              }
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
                              className={`form-control custom-input  ${
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
                            <label className="form-label">صلة القرابة </label>
                            <select
                              type="text"
                              className={`form-select custom-select-style custom-input ${
                                errors.kinship ? "is-invalid" : ""
                              }`}
                              value={kinship}
                              onChange={(e) => setKinship(e.target.value)}
                            >
                                 <option value=""> </option>
                          <option value="الابنه">ابنة مقدم الطلب</option>
                          <option value="الابن">ابن مقدم الطلب</option>
                          <option value="الام">والدة مقدم الطلب</option>
                          <option value="الاب">والد مقدم الطلب</option>
                     
                            </select>
                            {errors.kinship && (
                              <div className="text-danger">
                                {errors.kinship}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              اسم الام لصاحب الوثيقة
                            </label>
                            <input
                              type="text"
                              className={`form-control custom-input  ${
                                errors.anotherMotherName ? "is-invalid" : ""
                              }`}
                              value={anotherMotherName}
                              onChange={(e) =>
                                setAnotherMotherName(e.target.value)
                              }
                            />
                            {errors.anotherMotherName && (
                              <div className="text-danger">
                                {errors.anotherMotherName}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label">النوع </label>
                            <select
                              type="text"
                              className={`form-select custom-select-style custom-input ${
                                errors.gender ? "is-invalid" : ""
                              }`}
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value=""> </option>
                              <option value="female">أنثي</option>
                              <option value="male">ذكر</option>
                            </select>
                            {errors.gender && (
                              <div className="text-danger">{errors.gender}</div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">عدد النسخ </label>
                            <select
                              className={`form-select custom-select-style custom-input ${
                                errors.numberOfCopies ? "is-invalid" : ""
                              }`}
                              value={numberOfCopies}
                              onChange={(e) =>
                                setNumberOfCopies(e.target.value)
                              }
                            >
                              <option value=""> </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            {errors.numberOfCopies && (
                              <div className="text-danger">
                                {errors.numberOfCopies}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {card.title === "قسيمة زواج" && (
              <div>
                <div className="mb-3">
                  <label className="form-label ">اسم الأم لمقدم الطلب</label>
                  <input
                    type="text"
                    className={`form-control custom-input  ${
                      errors.motherName ? "is-invalid" : ""
                    }`}
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />

                  {errors.motherName && (
                    <div className="text-danger">{errors.motherName}</div>
                  )}
                </div>

                <div className="mb-3 ">
                  <label className="form-label">
                    هل تريد إصدار قسيمة زواج لنفسك ؟
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
                    {errors.isSelf && (
                      <div className="text-danger">{errors.isSelf}</div>
                    )}
                  </div>

                  {isSelf === true && (
                    <div className="mt-3">
                      <label className="form-label">عدد النسخ المطلوبة </label>
                      <select
                        className={`form-select custom-select-style custom-input ${
                          errors.numberOfCopies ? "is-invalid" : ""
                        }`}
                        value={numberOfCopies}
                        onChange={(e) => setNumberOfCopies(e.target.value)}
                      >
                        <option value=""> </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {errors.numberOfCopies && (
                        <div className="text-danger">
                          {errors.numberOfCopies}
                        </div>
                      )}
                    </div>
                  )}

                  {isSelf === false && (
                    <div className=" mt-3 p-3">
                      <div className="row">
                        <h3 className="text-color mb-3">بيانات صاحب القسيمة</h3>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الاسم رباعي</label>
                            <input
                              type="text"
                              className={`form-control custom-input  ${
                                errors.quadriliteralName ? "is-invalid" : ""
                              }`}
                              value={quadriliteralName}
                              onChange={(e) =>
                                setQuadriliteralName(e.target.value)
                              }
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
                              className={`form-control custom-input  ${
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
                            <label className="form-label">
                              اسم الام لصاحب القسيمة
                            </label>
                            <input
                              type="text"
                              className={`form-control custom-input  ${
                                errors.anotherMotherName ? "is-invalid" : ""
                              }`}
                              value={anotherMotherName}
                              onChange={(e) =>
                                setAnotherMotherName(e.target.value)
                              }
                            />
                            {errors.anotherMotherName && (
                              <div className="text-danger">
                                {errors.anotherMotherName}
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">صلة القرابة </label>
                            <select
                              type="text"
                              className={`form-select custom-select-style custom-input ${
                                errors.kinship ? "is-invalid" : ""
                              }`}
                              value={kinship}
                              onChange={(e) => setKinship(e.target.value)}
                            >
                                <option value=""> </option>
                          <option value="الابنه">ابنة مقدم الطلب</option>
                          <option value="الابن">ابن مقدم الطلب</option>
                          <option value="الام">والدة مقدم الطلب</option>
                          <option value="الاب">والد مقدم الطلب</option>
                          <option value="الزوجة">زوجة مقدم الطلب</option>
                          <option value="الزوج">زوج مقدم الطلب</option>
                            </select>
                            {errors.kinship && (
                              <div className="text-danger">
                                {errors.kinship}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              اسم زوج / زوجة صاحب القسيمة
                            </label>
                            <input
                              type="text"
                              className={`form-control custom-input  ${
                                errors.partnerName ? "is-invalid" : ""
                              }`}
                              value={partnerName}
                              onChange={(e) => setPartnerName(e.target.value)}
                            />
                            {errors.partnerName && (
                              <div className="text-danger">
                                {errors.partnerName}
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">النوع </label>
                            <select
                              type="text"
                              className={`form-select custom-select-style custom-input ${
                                errors.gender ? "is-invalid" : ""
                              }`}
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value=""> </option>
                              <option value="female">أنثي</option>
                              <option value="male">ذكر</option>
                            </select>
                            {errors.gender && (
                              <div className="text-danger">{errors.gender}</div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">عدد النسخ </label>
                            <select
                              className={`form-select custom-select-style custom-input ${
                                errors.numberOfCopies ? "is-invalid" : ""
                              }`}
                              value={numberOfCopies}
                              onChange={(e) =>
                                setNumberOfCopies(e.target.value)
                              }
                            >
                              <option value=""> </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            {errors.numberOfCopies && (
                              <div className="text-danger">
                                {errors.numberOfCopies}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
            <h3 className="text-color mb-4">تأكيد الطلب</h3>

            {/* بيانات الطلب */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-color">بيانات الطلب</h5>
              </div>
              <div className="card-body">
                {card.title === "شهادة ميلاد"  && (
                  <>
                    <div className="row mb-3">
                  <UserInfoDisplay/>
                      <div className="col-md-6">
                 
                   
                        <p>
                          <strong>اسم الأم لمقدم الطلب:</strong> {motherName}
                        </p>
                        <p>
                          <strong>صاحب الطلب: </strong>
                          {isSelf ? user?.name : "شخص آخر"}
                        </p>
                        {isSelf ? (
                          <p>
                            <strong>عدد النسخ:</strong> {numberOfCopies}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>الاسم الرباعي:</strong>
                              {quadriliteralName}
                            </p>
                            <p>
                              <strong>الرقم القومي:</strong> {id}
                            </p>
                            <p>
                              <strong>اسم الأم:</strong> {anotherMotherName}
                            </p>
                            <p>
                              <strong>صلة القرابة:</strong> {kinship}
                            </p>
                            <p>
                              <strong>النوع:</strong>
                              {gender === "male" ? "ذكر" : "أنثى"}
                            </p>
                            <p>
                              <strong>عدد النسخ:</strong> {numberOfCopies}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {card.title === "قسيمة طلاق"  && (
                  <>
                    <div className="row mb-3">
                  <UserInfoDisplay/>
                      <div className="col-md-6">
                 
                   
                        <p>
                          <strong>اسم الأم لمقدم الطلب:</strong> {motherName}
                        </p>
                        <p>
                          <strong>صاحب الطلب: </strong>
                          {isSelf ? user?.name : "شخص آخر"}
                        </p>
                        {isSelf ? (
                          <p>
                            <strong>عدد النسخ:</strong> {numberOfCopies}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>الاسم الرباعي:</strong>
                              {quadriliteralName}
                            </p>
                            <p>
                              <strong>الرقم القومي:</strong> {id}
                            </p>
                            <p>
                              <strong>اسم الأم:</strong> {anotherMotherName}
                            </p>
                            <p>
                              <strong>صلة القرابة:</strong> {kinship}
                            </p>
                            <p>
                              <strong>النوع:</strong>
                              {gender === "male" ? "ذكر" : "أنثى"}
                            </p>
                            <p>
                              <strong>عدد النسخ:</strong> {numberOfCopies}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {card.title === "قسيمة زواج" && (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p>
                          <strong>اسم الأم لمقدم الطلب:</strong> {motherName}
                        </p>
                        <p>
                          <strong>نوع الطلب:</strong>{" "}
                          {isSelf ? "لنفسي" : "لشخص آخر"}
                        </p>
                        {isSelf ? (
                          <p>
                            <strong>عدد النسخ:</strong> {numberOfCopies}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>الاسم الرباعي:</strong>{" "}
                              {quadriliteralName}
                            </p>
                            <p>
                              <strong>الرقم القومي:</strong> {id}
                            </p>
                            <p>
                              <strong>اسم الأم:</strong> {anotherMotherName}
                            </p>
                            <p>
                              <strong>صلة القرابة:</strong> {kinship}
                            </p>
                            <p>
                              <strong>النوع:</strong>{" "}
                              {gender === "male" ? "ذكر" : "أنثى"}
                            </p>
                            <p>
                              <strong>عدد النسخ:</strong> {numberOfCopies}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
           
                {card.title === "شهادة وفاة" && (
                  <>
                    <div className="row mb-3">
                        <UserInfoDisplay/>
                      <div className="col-md-6">
 
                          <>
                            <p>
                              <strong>الاسم الرباعي:</strong>{" "}
                              {quadriliteralName}
                            </p>
                            <p>
                              <strong>الرقم القومي:</strong> {id}
                            </p>
                            <p>
                              <strong>اسم الأم:</strong> {anotherMotherName}
                            </p>
                            <p>
                              <strong>صلة القرابة:</strong> {kinship}
                            </p>
                            <p>
                              <strong>النوع:</strong>{" "}
                              {gender === "male" ? "ذكر" : "أنثى"}
                            </p>
                            <p>
                              <strong>عدد النسخ:</strong> {numberOfCopies}
                            </p>
                          </>
                        
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* بيانات الاستلام */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-color">بيانات الاستلام</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>المحافظة:</strong> {governorate}
                    </p>
                    <p>
                      <strong>المدينة:</strong> {city}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>الحي/المركز:</strong> {district}
                    </p>
                    <p>
                      <strong>العنوان التفصيلي:</strong> {detailedAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* خيارات الدفع */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-color">اختر طريقة الدفع</h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cash"
                    value="cash"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="cash">
                    الدفع عند الاستلام
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="creditCard"
                    value="creditCard"
                  />
                  <label className="form-check-label" htmlFor="creditCard">
                    بطاقة ائتمان
                  </label>
                </div>
              
              </div>
            </div>

            {/* ملخص التكلفة */}
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
    <>
      <div className="mb-3">
        <Steppar
          active={activeStep}
          setActive={setActiveStep}
          formData={{
            card,
            motherName,
            isSelf,
            numberOfCopies,
            quadriliteralName,
            id,
            anotherMotherName,
            kinship,
            gender,
            partnerName,
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
            motherName,
            isSelf,
            numberOfCopies,
            quadriliteralName,
            id,
            anotherMotherName,
            kinship,
            partnerName,
            gender,
            governorate,
            city,
            district,
            detailedAddress,
          }}
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

export default CivilServices;
