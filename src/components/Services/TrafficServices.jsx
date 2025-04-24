import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./TrafficServices.css";
import NavigationButtons from "../NavigationButtons";
import Steppar from "../Steppar";
import { FaArrowLeftLong } from "react-icons/fa6";

const TrafficServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;

  const [motherName, setMotherName] = useState("");
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
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [medicalResult, setMedicalResult] = useState(null);
  const [theoryResult, setTheoryResult] = useState(null);
  const [practicalResult, setPracticalResult] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

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

      if (card.title === "استخراج رخصة قيادة") {
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

      {card.title === "سداد فاتورة المياه" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة </label>
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
            <label className="form-label">ادخل رقم العداد </label>
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
            <label className="form-label">ادخل رقم المشترك </label>
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
            <label className="form-label">نوع المرفق </label>
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
            <label className="form-label">المحافظة </label>
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
            <label className="form-label">العنوان التفصيلي </label>
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
            <label className="form-label">نوع الشكوى </label>
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
            <label className="form-label">وصف الشكوى </label>
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
            <label className="form-label">رقم المشترك </label>
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
            <label className="form-label">الاسم رباعي </label>
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
            <label className="form-label">رقم الهاتف </label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">البريد الإلكتروني </label>
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
            <label className="form-label">اختر الشركة </label>
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
            <label className="form-label">ادخل رقم المشترك </label>
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

export default TrafficServices;
