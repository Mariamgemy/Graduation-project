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

  const [motherName, setMotherName] = useState("");
  const [anotherMotherName , setAnotherMotherName] = useState("");
  const [isSelf, setIsSelf] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState("");
  const [quadriliteralName, setQuadriliteralName] = useState("");
  const [id, setId] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [gender, setGender] = useState("");
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [utilityType, setUtilityType] = useState("");
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

      if (card.title === "شهادة ميلاد") {
        if (!motherName) newErrors.motherName = "هذا الحقل مطلوب";
        else if (!isValidMotherName(motherName)) {
          newErrors.motherName = "يجب ان لا يقل طول الحقل عن 3 احرف";
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
        if(!kinship) newErrors.kinship = "هذا الحقل مطلوب";
        if(!gender) newErrors.gender = "هذا الحقل مطلوب";
        if(!numberOfCopies) newErrors.numberOfCopies = "هذا الحقل مطلوب";
      }

      if (card.title === "سداد فاتورة المياه") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!meterNumber) newErrors.meterNumber = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      }

      if (card.title === "تقديم شكوى مرافق") {
        if (!utilityType) newErrors.utilityType = "هذا الحقل مطلوب";
        if (!governorate) newErrors.governorate = "هذا الحقل مطلوب";
        if (!detailedAddress) newErrors.detailedAddress = "هذا الحقل مطلوب";
        if (!complaintType) newErrors.complaintType = "هذا الحقل مطلوب";
        if (!complaintDescription)
          newErrors.complaintDescription = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
        if (!fullName) {
          newErrors.fullName = "هذا الحقل مطلوب";
        } else if (!isValidName(fullName)) {
          newErrors.fullName = "الاسم غير صالح";
        }
        if (!phone) {
          newErrors.phone = "هذا الحقل مطلوب";
        } else if (!isValidPhoneNumber(phone)) {
          newErrors.phone = "الرقم غير صالح";
        }
        if (!email) {
          newErrors.email = "هذا الحقل مطلوب";
        } else if (!isValidEmail(email)) {
          newErrors.email = "البريد الالكتروني غير صالح";
        }
      }

      if (card.title === "سداد فاتورة الغاز") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    getFormData: () => ({
      company,
      subscriberNumber,
      meterNumber,
      governorate,
      detailedAddress,
      complaintType,
      complaintDescription,
      fullName,
      phone,
      email,
      utilityType,
    }),
  }));

  return (
    <>
      {card.title === "شهادة ميلاد" && (
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
                <label  className="form-check-label">لا</label>
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
              <div className="card mt-3 p-3">
                <div className="row">
                <h3 className="text-color mb-3">بيانات صاحب الشهادة</h3>
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
                  <div className="text-danger">{errors.quadriliteralName}</div>
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
                      <label className="form-label">صلة القرابة  </label>
                      <select
                        type="text"
                        className="form-select custom-select"
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
                  <div className="text-danger">{errors.kinship}</div>
                )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">اسم الام لصاحب الشهادة </label>
                      <input
                        type="text"
                        className="form-control"
                        value={anotherMotherName}
                        onChange={(e) => setAnotherMotherName(e.target.value)}
                      />
                      {errors.anotherMotherName && (
                  <div className="text-danger">{errors.anotherMotherName}</div>
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
            )}
          </div>
        </>
      )}

      {card.title === "سداد فاتورة المياه" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة *</label>
            <select
              className="form-select custom-select-style"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">برجاء الاختيار</option>
              <option value="القاهرة الكبرى والجيزة والقليوبية">
                القاهرة الكبرى والجيزة والقليوبية
              </option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="الدلتا">الدلتا</option>
              <option value="الصعيد">الصعيد</option>
              <option value="القناة وسيناء">القناة وسيناء</option>
              <option value="المناطق الحدودية والوادي الجديد">
                المناطق الحدودية والوادي الجديد
              </option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم العداد *</label>
            <input
              type="text"
              className="form-control"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
            />
            {errors.meterNumber && (
              <div className="text-danger">{errors.meterNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم المشترك *</label>
            <input
              type="text"
              className="form-control"
              value={subscriberNumber}
              onChange={(e) => setSubscriberNumber(e.target.value)}
            />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )}
          </div>
        </>
      )}

      {card.title === "تقديم شكوى مرافق" && (
        <>
          <div className="mb-3">
            <label className="form-label">نوع المرفق *</label>
            <select
              className="form-select custom-select-style"
              value={utilityType}
              onChange={(e) => setUtilityType(e.target.value)}
            >
              <option value="">اختر نوع المرفق</option>
              <option value="كهرباء">كهرباء</option>
              <option value="مياه">مياه</option>
              <option value="غاز">غاز</option>
            </select>
            {errors.utilityType && (
              <div className="text-danger">{errors.utilityType}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">المحافظة *</label>
            <select
              className="form-select custom-select-style"
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
            >
              <option value="">برجاء الاختيار</option>
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
            <label className="form-label">العنوان التفصيلي *</label>
            <input
              type="text"
              className="form-control"
              value={detailedAddress}
              onChange={(e) => setDetailedAddress(e.target.value)}
            />
            {errors.detailedAddress && (
              <div className="text-danger">{errors.detailedAddress}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نوع الشكوى *</label>
            <select
              className="form-select custom-select-style"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
            >
              <option value="">اختر نوع الشكوى</option>
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
            <label className="form-label">وصف الشكوى *</label>
            <textarea
              className="form-control"
              rows="4"
              value={complaintDescription}
              onChange={(e) => setComplaintDescription(e.target.value)}
            ></textarea>
            {errors.complaintDescription && (
              <div className="text-danger">{errors.complaintDescription}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم المشترك *</label>
            <input
              type="text"
              className="form-control"
              value={subscriberNumber}
              onChange={(e) => setSubscriberNumber(e.target.value)}
            />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">الاسم رباعي *</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم الهاتف *</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">البريد الإلكتروني *</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
        </>
      )}

      {card.title === "سداد فاتورة الغاز" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة *</label>
            <select
              className="form-select custom-select-style"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">برجاء الاختيار</option>
              <option value="1">بتروتريد</option>
              <option value="2">نات جاس</option>
              <option value="3">شركة طاقة للغاز</option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم المشترك *</label>
            <input
              type="text"
              className="form-control"
              placeholder="ادخل الارقام من المحافظة حتى الفرعي"
              value={subscriberNumber}
              onChange={(e) => setSubscriberNumber(e.target.value)}
            />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
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

export default CivilServices;
