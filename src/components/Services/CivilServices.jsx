import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Civil.css";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";

const CivilServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;

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
      //   if (
      //     card.title === "شهادة ميلاد" ||
      //     card.title === "شهادة وفاة" ||
      //     card.title === "قسيمة زواج" ||
      //     card.title === "قسيمة طلاق" ||
      //     card.title === "شهادة ميلاد مميكنة لأول مرة"
      //   ) {
      //     if (!motherName) newErrors.motherName = "هذا الحقل مطلوب";
      //     else if (!isValidMotherName(motherName)) {
      //       newErrors.motherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      //     }
      //     if (!partnerName) newErrors.partnerName = "هذا الحقل مطلوب";
      //     else if (!isValidMotherName(partnerName)) {
      //       newErrors.partnerName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      //     }
      //     if (!anotherMotherName)
      //       newErrors.anotherMotherName = "هذا الحقل مطلوب";
      //     else if (!isValidMotherName(anotherMotherName)) {
      //       newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
      //     }
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
      //     if (!isSelf) newErrors.isSelf = " اختار اولاً ";
      //     if (!kinship) newErrors.kinship = "هذا الحقل مطلوب";
      //     if (!gender) newErrors.gender = "هذا الحقل مطلوب";
      //     if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
      //   }
      // }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({
      motherName,
      anotherMotherName,
      partnerName,
      isSelf,
      numberOfCopies,
      quadriliteralName,
      id,
      gender,
      kinship,
    }),
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
          if(!partnerName) newErrors.partnerName = "هذا الحقل مطلوب";
          else if (!isValidName(partnerName)) {
            newErrors.partnerName = "يجب ان لا يقل طول الحقل عن 3 احرف";
          }
        }
      } else if (
        card.title === "شهادة ميلاد مميكنة لأول مرة" ||
        card.title === "شهادة وفاة"
      ) {
        if(!id) newErrors.id = "هذا الحقل مطلوب";
        else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if(!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
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
    }

    setErrors(newErrors);

    // Only proceed to next step if there are no errors and step 1 is completed
    if (Object.keys(newErrors).length === 0) {
      if (activeStep === 1) {
        // Check if all required fields for step 1 are filled
        let step1Completed = true;

        if (
          card.title === "شهادة ميلاد" ||
          card.title === "قسيمة زواج" ||
          card.title === "قسيمة طلاق"
        ) {
          if (
            !motherName ||
            !isSelf ||
            (isSelf === true && !numberOfCopies) ||
            (isSelf === false &&
              (!quadriliteralName ||
                !id ||
                !anotherMotherName ||
                !kinship ||
                !gender ||
                !numberOfCopies))
          ) {
            step1Completed = false;
          }
        } else if (
          card.title === "شهادة ميلاد مميكنة لأول مرة" ||
          card.title === "شهادة وفاة"
        ) {
          if (!quadriliteralName || !kinship || !anotherMotherName || !gender ||!id || !numberOfCopies) {
            step1Completed = false;
          }
        }

        if (step1Completed && activeStep < 3) {
          setActiveStep(activeStep + 1);
        }
      } else if (activeStep < 3) {
        setActiveStep(activeStep + 1);
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
                  <label className="form-label">اسم الام لصاحب الوثيقة </label>
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
                  <label className="form-label"> الاسم رباعي للمتوفي</label>
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
                  {errors.id && <div className="text-danger">{errors.id}</div>}
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
                    <div className="text-danger">{errors.numberOfCopies}</div>
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
            {/* Add delivery information form fields here */}
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
          }}
        />
      </div>

      {renderStepContent()}

      {activeStep < 3 && (
        <div className="text-start">
          <button
            type="button"
            className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2"
            onClick={handleNext}
          >
            التالي &nbsp; <FaArrowLeftLong size={20} />
          </button>
        </div>
      )}
    </>
  );
});

export default CivilServices;