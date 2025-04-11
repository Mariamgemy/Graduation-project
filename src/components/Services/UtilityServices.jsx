import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const UtilityServices = forwardRef((props, ref) => {
  const location = useLocation();
  const card = location.state;

  const [company, setCompany] = useState("");
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

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-25]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidEmail = (Email) => {
    const emailRegex =/^[\w]+@([\w]+\.)+[\w]+$/;
    return emailRegex.test(Email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[\u0621-\u064A\u066E-\u06D3\s]+$/;
    return nameRegex.test(name);
  };


  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const newErrors = {};

      if (card.title === "سداد فاتورة الكهرباء") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
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
        if (!complaintDescription) newErrors.complaintDescription = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
        if (!fullName){ newErrors.fullName = "هذا الحقل مطلوب";}else if (!isValidName(fullName)) {
          newErrors.fullName ="الاسم غير صحيح"
        }
        if (!phone){ newErrors.phone = "هذا الحقل مطلوب";}else if (!isValidPhoneNumber(phone)) {
          newErrors.phone ="الرقم غير صحيح"
        }
        if (!email) {newErrors.email = "هذا الحقل مطلوب"; }else if (!isValidEmail(email)) {
          newErrors.email ="البريد الالكتروني غير صحيح"
        }
      }

      if (card.title === "سداد فاتورة الغاز") {
        if (!company) newErrors.company = "هذا الحقل مطلوب";
        if (!subscriberNumber) newErrors.subscriberNumber = "هذا الحقل مطلوب";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));


  return (
   <>
      {card.title === "سداد فاتورة الكهرباء" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة *</label>
            <select className="form-select custom-select-style" value={company} onChange={(e) => setCompany(e.target.value)}>
              <option value="">برجاء الاختيار</option>
              <option value="1">كهرباء شمال القاهرة</option>
              <option value="2">كهرباء جنوب القاهرة</option>
              <option value="3">كهرباء جنوب الدلتا</option>
              <option value="4">كهرباء القناة</option>
              <option value="5">كهرباء مصر الوسطي</option>
              <option value="6">كهرباء مصر العليا</option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم السداد الالكتروني *</label>
            <input type="text" className="form-control" value={subscriberNumber} onChange={(e) => setSubscriberNumber(e.target.value)} />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )}
          </div>
        </>
      )}

      {card.title === "سداد فاتورة المياه" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة *</label>
            <select className="form-select custom-select-style" value={company} onChange={(e) => setCompany(e.target.value)}>
              <option value="">برجاء الاختيار</option>
              <option value="1">القاهرة الكبرى والجيزة والقليوبية</option>
              <option value="2">الإسكندرية</option>
              <option value="3">الدلتا</option>
              <option value="4">الصعيد</option>
              <option value="5">القناة وسيناء</option>
              <option value="6">المناطق الحدودية والوادي الجديد</option>
            </select>
            {errors.company && (
              <div className="text-danger">{errors.company}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم العداد *</label>
            <input type="text" className="form-control" value={meterNumber} onChange={(e) => setMeterNumber(e.target.value)} />
            {errors.meterNumber && (
              <div className="text-danger">{errors.meterNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">ادخل رقم المشترك *</label>
            <input type="text" className="form-control" value={subscriberNumber} onChange={(e) => setSubscriberNumber(e.target.value)} />
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
            <select className="form-select custom-select-style" value={utilityType} onChange={(e) => setUtilityType(e.target.value)}>
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
            <select className="form-select custom-select-style" value={governorate} onChange={(e) => setGovernorate(e.target.value)}>
              <option value="">برجاء الاختيار</option>
              <option value="1">القاهرة</option>
              <option value="2">الإسكندرية</option>
              <option value="3">الجيزة</option>
              <option value="4">الدقهلية</option>
              <option value="5">الشرقية</option>
              <option value="6">القليوبية</option>
              <option value="7">المنوفية</option>
              <option value="8">الغربية</option>
              <option value="9">المنيا</option>
              <option value="10">أسيوط</option>
              <option value="11">سوهاج</option>
              <option value="12">قنا</option>
              <option value="13">أسوان</option>
              <option value="14">الأقصر</option>
              <option value="15">البحر الأحمر</option>
              <option value="16">شمال سيناء</option>
              <option value="17">جنوب سيناء</option>
              <option value="18">الفيوم</option>
              <option value="19">بني سويف</option>
              <option value="20">سوهاج</option>
              <option value="21">الوادى الجديد</option>
              <option value="22">كفر الشيخ</option>
              <option value="23">دمياط</option>
              <option value="24">بورسعيد</option>
              <option value="25">السويس</option>
              <option value="26">الإسماعيلية</option>
              <option value="27">الجيزة</option>
              <option value="28">شمال سيناء</option>
              <option value="29">جنوب سيناء</option>
              <option value="30">الشرقية</option>
              <option value="31">البحيرة</option>
              <option value="32">المنوفية</option>
            </select>
            {errors.governorate && (
              <div className="text-danger">{errors.governorate}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">العنوان التفصيلي *</label>
            <input type="text" className="form-control" value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} />
            {errors.detailedAddress && (
              <div className="text-danger">{errors.detailedAddress}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">نوع الشكوى *</label>
            <select className="form-select custom-select-style" value={complaintType} onChange={(e) => setComplaintType(e.target.value)}>
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
            <textarea className="form-control" rows="4" value={complaintDescription} onChange={(e) => setComplaintDescription(e.target.value)}></textarea>
            {errors.complaintDescription && (
              <div className="text-danger">{errors.complaintDescription}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم المشترك *</label>
            <input type="text" className="form-control" value={subscriberNumber} onChange={(e) => setSubscriberNumber(e.target.value)} />
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">الاسم رباعي *</label>
            <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رقم الهاتف *</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && (
              <div className="text-danger">{errors.phone}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">البريد الإلكتروني *</label>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && (
              <div className="text-danger">{errors.email}</div>
            )}
          </div>
        </>
      )}

      {card.title === "سداد فاتورة الغاز" && (
        <>
          <div className="mb-3">
            <label className="form-label">اختر الشركة *</label>
            <select className="form-select custom-select-style" value={company} onChange={(e) => setCompany(e.target.value)}>
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
            <input type="text" className="form-control" placeholder="ادخل الارقام من المحافظة حتى الفرعي" value={subscriberNumber} onChange={(e) => setSubscriberNumber(e.target.value)} />
         
            {errors.subscriberNumber && (
              <div className="text-danger">{errors.subscriberNumber}</div>
            )} </div>
        </>
      )}

</>
  );
});

export default UtilityServices;
