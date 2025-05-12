import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Civil.css";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [authError, setAuthError] = useState(null);
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم مطلوب";
    }

    if (!formData.NID || formData.NID.length !== 14) {
      newErrors.NID = "الرقم القومي يجب أن يكون 14 رقم";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "تاريخ الميلاد مطلوب";
    }

    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "رقم الهاتف يجب أن يكون 11 رقم";
    }

    if (activeStep === 2) {
      if (!formData.governorate) {
        newErrors.governorate = "المحافظة مطلوبة";
      } else if (!isValidGovernorate(formData.governorate)) {
        newErrors.governorate = "يرجى إدخال اسم المحافظة بشكل صحيح";
      }

      if (!formData.city) {
        newErrors.city = "المدينة مطلوبة";
      } else if (!isValidCity(formData.city)) {
        newErrors.city = "يرجى إدخال اسم المدينة بشكل صحيح";
      }

      if (!formData.district) {
        newErrors.district = "الحي / المركز مطلوب";
      } else if (!isValidDistrict(formData.district)) {
        newErrors.district = "يرجى إدخال اسم الحي / المركز بشكل صحيح";
      }

      if (!formData.detailedAddress) {
        newErrors.detailedAddress = "العنوان التفصيلي مطلوب";
      } else if (!isValidDetailedAddress(formData.detailedAddress)) {
        newErrors.detailedAddress =
          "يرجى إدخال العنوان التفصيلي بشكل كامل (10 أحرف على الأقل)";
      }
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
      if (
        card.title === "شهادة ميلاد" ||
        card.title === "قسيمة زواج" ||
        card.title === "قسيمة طلاق"
      ) {
        if (!motherName) newErrors.motherName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(motherName)) {
          newErrors.motherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (isSelf === "") newErrors.isSelf = "اختر نعم أو لا";

        if (isSelf === true) {
          if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
        } else {
          if (!quadriliteralName)
            newErrors.quadriliteralName = "هذا الحقل مطلوب";
          else if (!isValidName(quadriliteralName)) {
            newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }

          if (!id) newErrors.id = "هذا الحقل مطلوب";
          else if (!isValidId(id)) {
            newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
          }

          if (!anotherMotherName)
            newErrors.anotherMotherName = "هذا الحقل مطلوب";
          else if (!isValidMotherName(anotherMotherName)) {
            newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }

          if (!kinship) newErrors.kinship = "هذا الحقل مطلوب";
          if (!gender) newErrors.gender = "هذا الحقل مطلوب";
          if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
          if (!partnerName) newErrors.partnerName = "هذا الحقل مطلوب";
          else if (!isValidName(partnerName)) {
            newErrors.partnerName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }
        }
      } else if (
        card.title === "شهادة ميلاد مميكنة لأول مرة" ||
        card.title === "شهادة وفاة"
      ) {
        if (!id) newErrors.id = "هذا الحقل مطلوب";
        else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
        if (!anotherMotherName) newErrors.anotherMotherName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(anotherMotherName)) {
          newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!gender) newErrors.gender = "هذا الحقل مطلوب";
        if (!quadriliteralName) newErrors.quadriliteralName = "هذا الحقل مطلوب";
        else if (!isValidName(quadriliteralName)) {
          newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }

        if (!kinship) newErrors.kinship = "هذا الحقل مطلوب";
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
                              <option value="son">الابن</option>
                              <option value="dauter">الابنة</option>
                              <option value="father">الاب</option>
                              <option value="mother">الام</option>
                              <option value="husband">الزوج</option>
                              <option value="wife">الزوجة</option>
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
                  <h5 className="mb-3">
                    ضوابط استخراج شهادة ميلاد من خلال الانترنت
                  </h5>
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
                          <option value="dauter">ابنة مقدم الطلب</option>
                          <option value="son">ابن مقدم الطلب</option>
                          <option value="mother">والدة مقدم الطلب</option>
                          <option value="father">والد مقدم الطلب</option>
                          <option value="wife">زوجة مقدم الطلب</option>
                          <option value="husband">زوج مقدم الطلب</option>
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
                          <option value="dauter">ابنة مقدم الطلب</option>
                          <option value="son">ابن مقدم الطلب</option>
                          <option value="mother">والدة مقدم الطلب</option>
                          <option value="father">والد مقدم الطلب</option>
                          <option value="wife">زوجة مقدم الطلب</option>
                          <option value="husband">زوج مقدم الطلب</option>
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
                              <option value="dauter">ابنة مقدم الطلب</option>
                              <option value="son">ابن مقدم الطلب</option>
                              <option value="mother">والدة مقدم الطلب</option>
                              <option value="father">والد مقدم الطلب</option>
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
                              <option value="dauter">ابنة مقدم الطلب</option>
                              <option value="son">ابن مقدم الطلب</option>
                              <option value="mother">والدة مقدم الطلب</option>
                              <option value="father">والد مقدم الطلب</option>
                              <option value="wife">زوجة مقدم الطلب</option>
                              <option value="husband">زوج مقدم الطلب</option>
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
            <h3 className="text-color mb-3">نتيجة الطلب</h3>
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
            motherName,
            isSelf,
            numberOfCopies,
            quadriliteralName,
            id,
            anotherMotherName,
            kinship,
            gender,
            governorate,
            city,
            district,
            detailedAddress,
          }}
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
            gender,
            governorate,
            city,
            district,
            detailedAddress,
          }}
        />
      </div>

      {renderStepContent()}

      {activeStep < 3 && <Button handleNext={handleNext} />}

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

      {/* {authError && (
        <Alert variant="warning" className="mb-3">
          <p className="mb-0">{authError}</p>
        </Alert>
      )} */}
    </>
  );
});

export default CivilServices;
