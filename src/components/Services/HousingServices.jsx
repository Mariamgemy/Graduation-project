import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Civil.css";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";

const HousingServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;

  const [motherName, setMotherName] = useState("");
  const [personalPhoto , setPersonalPhoto] = useState("");
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
    const nameRegex = /^[a-zA-Z\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
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

      if (
        card.title === "شهادة ميلاد" ||
        card.title === "شهادة وفاة" ||
        card.title === "قسيمة زواج" ||
        card.title === "قسيمة طلاق" ||
        card.title === "شهادة ميلاد مميكنة لأول مرة"
      ) {
        if (!motherName) newErrors.motherName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(motherName)) {
          newErrors.motherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!partnerName) newErrors.partnerName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(partnerName)) {
          newErrors.partnerName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!anotherMotherName) newErrors.anotherMotherName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(anotherMotherName)) {
          newErrors.anotherMotherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!quadriliteralName) newErrors.quadriliteralName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(quadriliteralName)) {
          newErrors.quadriliteralName = "يجب ان لا يقل طول الحقل عن 3 احرف";
        }
        if (!id) {
          newErrors.id = "هذا الحقل مطلوب";
        } else if (!isValidId(id)) {
          newErrors.id = "الرقم القومي يجب أن يكون 14 رقم";
        }
        if (!isSelf) newErrors.isSelf = " اختار اولاً ";
        if (!kinship) newErrors.kinship = "هذا الحقل مطلوب";
        if (!gender) newErrors.gender = "هذا الحقل مطلوب";
        if (!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({}),
  }));

  return (
    <>
      {card.title === "شهادة كفاءة الطاقة" && (
        <>
          <div className="mb-3">
        
          </div>

          <div className="mt-3 p-3">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label"> الاسم رباعي </label>
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">العنوان بالتفصيل</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">رقم الهاتف </label>
                  <input
                    type="text"
                    className="form-control"
                    value={anotherMotherName}
                    onChange={(e) => setAnotherMotherName(e.target.value)}
                  />
                  {errors.anotherMotherName && (
                    <div className="text-danger">
                      {errors.anotherMotherName}
                    </div>
                  )}
                </div>
               
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">نوع المنشأة </label>
                  <select
                    type="text"
                    className="form-select custom-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="Residential">سكني</option>
                    <option value="Commercial">تجاري</option>
                    <option value="Industrial">صناعي</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">الغرض من استخراج الشهادة</label>
                  <select
                    type="text"
                    className="form-select custom-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value=""> </option>
                    <option value="Residential">بيع عقار</option>
                    <option value="Commercial">تأجير</option>
                    <option value="Industrial">تسجيل رسمي</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
                  )}
                </div>
                <div className="mb-3">
            <label className="form-label">صورة اخر فاتورة كهرباء</label>
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
            <label className="form-label">صورة بطاقة الرقم القومي</label>
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
                      <span>
                        يجب أن يكون مقدم الطلب هو صاحب العداد .
                      </span>
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
                        العقار يجب أن يكون مبنيًّا بشكل قانوني ومسجل في الجهات
                        الرسمية.
                      </span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <span className="me-2 text-warning">💡</span>
                      <span>
                        لا يتم إصدار الشهادة إلا بعد فحص استهلاك الطاقة (قد
                        يتطلب زيارة ميدانية أحيانًا حسب القوانين).
                      </span>
                    </li>
                 
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {card.title === "شهادة ميلاد مميكنة لأول مرة" && (
        <>
          <div className="mb-3">
            <Steppar />
            <NavigationButtons />
          </div>

          <div className=" mt-3 p-3">
            <div className="row">
              <h3 className="text-color mb-3">بيانات صاحب الوثيقة </h3>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label"> الاسم رباعي </label>
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-select custom-select"
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
                    className="form-control"
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
                    className="form-select custom-select"
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
          <div className="mb-3">
            <Steppar />
            <NavigationButtons />
          </div>

          <div className=" mt-3 p-3">
            <div className="row">
              <h3 className="text-color mb-3">بيانات المتوفي </h3>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label"> الاسم رباعي للمتوفي</label>
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <div className="text-danger">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">صلة القرابة </label>
                  <select
                    type="text"
                    className="form-select custom-select"
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
                    className="form-control"
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
                    className="form-select custom-select"
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
                    className="form-select custom-select"
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
        <>
          <div className="mb-3">
            <Steppar />
            <NavigationButtons />
            <label className="form-label ">اسم الأم لمقدم الطلب</label>
            <input
              type="text"
              className="form-control w-25"
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
                  className="form-select w-25 custom-select"
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
            )}

            {isSelf === false && (
              <div className=" mt-3 p-3">
                <div className="row">
                  <h3 className="text-color mb-3">بيانات صاحب الوثيقة</h3>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        الاسم رباعي للمطلق / المطلقة{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
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
                        className="form-control"
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
                        className="form-select custom-select"
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
                        <div className="text-danger">{errors.kinship}</div>
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
                        className="form-control"
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
                        className="form-select custom-select"
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
                        className="form-select custom-select"
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
            )}
          </div>
        </>
      )}
      {card.title === "قسيمة زواج" && (
        <>
          <div className="mb-3">
            <Steppar />
            <NavigationButtons />
            <label className="form-label ">اسم الأم لمقدم الطلب</label>
            <input
              type="text"
              className="form-control w-25"
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
                  className="form-select w-25 custom-select"
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
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
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
                      <label className="form-label">صلة القرابة </label>
                      <select
                        type="text"
                        className="form-select custom-select"
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
                        اسم زوج / زوجة صاحب القسيمة
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                      />
                      {errors.partnerName && (
                        <div className="text-danger">{errors.partnerName}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">النوع </label>
                      <select
                        type="text"
                        className="form-select custom-select"
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
                        className="form-select custom-select"
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
            )}
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

export default HousingServices;
