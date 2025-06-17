import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Alert } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_CONFIG } from "../../api/config";
import "./UtilityServices.css";

/**
 * Multi‑step form (wizard) for live‑consumption service.
 * ‑ Keeps a single `formData` state that aggregates inputs from all steps.
 * ‑ Exposes `validateForm`, `getFormData`, and `submitForm` through `ref` so the parent can control it.
 */
const ConsumptionServices = forwardRef((props, ref) => {
  /* ------------------------------------------------------------------ */
  /*                             Hooks & CTX                            */
  /* ------------------------------------------------------------------ */
  const location = useLocation();
  const { user } = useAuth();

  /* ------------------------------------------------------------------ */
  /*                               State                                */
  /* ------------------------------------------------------------------ */
  const [activeStep, setActiveStep] = useState(1); // 1, 2, 3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    BillAmount: "",
    Consumption: "",
    BillMonth: "",
    BillYear: "",
    DaysInBillingCycle: "",
    MeterType: "Electricity", // default كهرباء
    NumberOfAirConditioners: "",
    AirConditionerUsageHours: "",
    AirConditionerType: "",
    NumberOfLights: "",
    LightType: "",
    LightUsageHours: "",
    OtherMajorAppliances_Count: "",
    ApplianceUsage_Encoded: "3",
    HouseholdSize: "",
    HomeType_Encoded: "",
    ConsumptionTrend: "",
    SeasonalConsumptionPattern: "",
  });

  /* ------------------------------------------------------------------ */
  /*                         Auth guard on mount                        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!user) setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    else setAuthError(null);
  }, [user]);

  /* ------------------------------------------------------------------ */
  /*                          Helpers / validators                      */
  /* ------------------------------------------------------------------ */
  const isPositiveNumber = (v) => v !== "" && !isNaN(v) && Number(v) > 0;

  const validateStep1 = (acc) => {
    if (!isPositiveNumber(formData.BillAmount)) acc.BillAmount = "أدخل مبلغًا صحيحًا";
    if (!isPositiveNumber(formData.Consumption)) acc.Consumption = "أدخل استهلاكًا صحيحًا";
    if (!formData.BillMonth) acc.BillMonth = "شهر الفاتورة مطلوب";
    if (!formData.BillYear || String(formData.BillYear).length !== 4)
      acc.BillYear = "سنة مكونة من 4 أرقام";
    if (!isPositiveNumber(formData.DaysInBillingCycle)) acc.DaysInBillingCycle = "عدد أيام مطلوب";
    if (!formData.MeterType) acc.MeterType = "نوع العداد مطلوب";
    if (!formData.HomeType_Encoded) acc.HomeType_Encoded = "نوع المنزل مطلوب";
    if (!isPositiveNumber(formData.NumberOfAirConditioners)) acc.NumberOfAirConditioners = "عدد المكيفات";
    if (!isPositiveNumber(formData.AirConditionerUsageHours)) acc.AirConditionerUsageHours = "ساعات تشغيل المكيف";
    if (!formData.AirConditionerType) acc.AirConditionerType = "نوع المكيف مطلوب";
    if (!isPositiveNumber(formData.HouseholdSize)) acc.HouseholdSize = "عدد الأفراد مطلوب";
  };

  const validateStep2 = (acc) => {
    if (!isPositiveNumber(formData.NumberOfLights)) acc.NumberOfLights = "عدد المصابيح";
    if (!formData.LightType) acc.LightType = "نوع المصابيح مطلوب";
    if (!isPositiveNumber(formData.LightUsageHours)) acc.LightUsageHours = "ساعات تشغيل المصابيح";
    if (!isPositiveNumber(formData.OtherMajorAppliances_Count)) acc.OtherMajorAppliances_Count = "عدد الأجهزة الكبرى";
    if (!formData.ConsumptionTrend) acc.ConsumptionTrend = "نمط الاستهلاك مطلوب";
    if (!formData.SeasonalConsumptionPattern) acc.SeasonalConsumptionPattern = "النمط الموسمي مطلوب";
  };

  const validateForm = () => {
    const acc = {};
    validateStep1(acc);
    validateStep2(acc);
    setErrors(acc);
    return Object.keys(acc).length === 0;
  };

  /* ------------------------------------------------------------------ */
  /*                          Input change                              */
  /* ------------------------------------------------------------------ */
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ------------------------------------------------------------------ */
  /*                      Navigation (Next / Submit)                    */
  /* ------------------------------------------------------------------ */
  const handleNext = () => {
    const acc = {};
    if (activeStep === 1) validateStep1(acc);
    if (activeStep === 2) validateStep2(acc);
    setErrors(acc);
    if (Object.keys(acc).length === 0) setActiveStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_CONFIG.BASE_URL}/BillRecommendations/analyze`, formData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      });

      /* Transform response for charts */
      const d = res.data || {};
      setAnalysisResults({
        consumptionDistribution: [
          { name: "التكييف", value: d.airConditionerConsumption || 0 },
          { name: "الإضاءة", value: d.lightingConsumption || 0 },
          { name: "الأجهزة الأخرى", value: d.otherAppliancesConsumption || 0 },
        ],
        consumptionTrends: d.monthlyConsumption || [],
        recommendations: d.recommendations || [],
        summaryStats: [
          { label: "متوسط الاستهلاك", value: `${d.averageConsumption || 0} ك.و.س` },
          { label: "أعلى استهلاك", value: `${d.highestConsumption || 0} ك.و.س` },
          { label: "أقل استهلاك", value: `${d.lowestConsumption || 0} ك.و.س` },
        ],
      });
      document.getElementById("analysis-results")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setApiError("حدث خطأ أثناء إرسال البيانات، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*                     Expose methods to parent via ref               */
  /* ------------------------------------------------------------------ */
  useImperativeHandle(ref, () => ({ validateForm, getFormData: () => formData, submitForm: handleSubmit }));

  /* ------------------------------------------------------------------ */
  /*                           UI fragments                             */
  /* ------------------------------------------------------------------ */
  const Field = ({ col = "col-md-6", label, name, type = "number", as = "input", options = [] }) => (
    <div className={`${col} mb-3`}>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        {as === "select" ? (
          <Form.Select
            name={name}
            value={formData[name]}
            onChange={onInputChange}
            className={errors[name] ? "is-invalid" : ""}
          >
            <option value="">اختر</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            type={type}
            name={name}
            value={formData[name]}
            onChange={onInputChange}
            className={errors[name] ? "is-invalid" : ""}
          />
        )}
        {errors[name] && <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>}
      </Form.Group>
    </div>
  );

  const Step1 = () => (
    <>
      <div className="form-section-custom mb-5 p-4 border rounded-3">
        <h5 className="section-title mb-4 text-primary fw-bold">معلومات الفاتورة الأساسية</h5>
        <div className="row">
          <Field label="قيمة الفاتورة (ريال)" name="BillAmount" />
          <Field label="الاستهلاك (ك.و.س)" name="Consumption" />
        </div>
        <div className="row">
          <Field col="col-md-4" as="select" label="شهر الفاتورة" name="BillMonth" options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }))} />
          <Field col="col-md-4" as="select" label="سنة الفاتورة" name="BillYear" options={Array.from({ length: 5 }, (_, i) => ({ value: new Date().getFullYear() - i, label: new Date().getFullYear() - i }))} />
          <Field col="col-md-4" label="أيام دورة الفاتورة" name="DaysInBillingCycle" />
        </div>
        <div className="row">
          <Field as="select" label="نوع العداد" name="MeterType" options={[{ value: "Electricity", label: "كهرباء" }, { value: "Water", label: "ماء" }, { value: "Gas", label: "غاز" }]} />
          <Field as="select" label="نوع المنزل" name="HomeType_Encoded" options={[{ value: "Villa", label: "فيلا" }, { value: "Apartment", label: "شقة" }, { value: "Duplex", label: "دوبلكس" }, { value: "House", label: "منزل" }]} />
        </div>
      </div>
      <div className="form-section-custom mb-5 p-4 border rounded-3">
        <h5 className="section-title mb-4 text-primary fw-bold">معلومات التكييف</h5>
        <div className="row">
          <Field label="عدد أجهزة التكييف" name="NumberOfAirConditioners" />
          <Field label="ساعات تشغيل التكييف يوميًا" name="AirConditionerUsageHours" />
        </div>
        <div className="row">
          <Field as="select" label="نوع التكييف" name="AirConditionerType" options={[{ value: "Central", label: "مركزي" }, { value: "Split", label: "سبليت" }, { value: "Window", label: "نافذة" }]} />
          <Field label="حجم الأسرة" name="HouseholdSize" />
        </div>
      </div>
    </>
  );

  const Step2 = () => (
    <>
      <div className="form-section-custom mb-5 p-4 border rounded-3">
        <h5 className="section-title mb-4 text-primary fw-bold">معلومات الإضاءة</h5>
        <div className="row">
          <Field label="عدد اللمبات" name="NumberOfLights" />
          <Field label="ساعات تشغيل الإضاءة يوميًا" name="LightUsageHours" />
        </div>
        <div className="row">
          <Field as="select" label="نوع الإضاءة" name="LightType" options={[{ value: "LED", label: "LED" }, { value: "CFL", label: "CFL" }, { value: "Incandescent", label: "تقليدي" }, { value: "Fluorescent", label: "فلورسنت" }]} />
        </div>
      </div>
      <div className="form-section-custom mb-5 p-4 border rounded-3">
        <h5 className="section-title mb-4 text-primary fw-bold">أجهزة أخرى وأنماط الاستهلاك</h5>
        <div className="row">
          <Field label="عدد الأجهزة الكبرى الأخرى" name="OtherMajorAppliances_Count" />
          <Field as="select" label="نمط الاستهلاك" name="ConsumptionTrend" options={[{ value: "Increasing", label: "متزايد" }, { value: "Decreasing", label: "متناقص" }, { value: "Stable", label: "مستقر" }]} />
        </div>
        <div className="row">
          <Field as="select" label="النمط الموسمي" name="SeasonalConsumptionPattern" options={[{ value: "HigherThanUsual", label: "أعلى من المعتاد" }, { value: "LowerThanUsual", label: "أقل من المعتاد" }, { value: "Normal", label: "طبيعي" }]} />
        </div>
      </div>
    </>
  );

  const Review = () => (
    <div className="review-section mt-4">
      <h4 className="mb-4 text-center">مراجعة البيانات</h4>
      <pre className="bg-light p-3 border rounded-3 text-start" style={{ direction: "ltr" }}>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );

  /* ------------------------------------------------------------------ */
  /*                               Render                               */
  /* ------------------------------------------------------------------ */
  if (authError) return <Alert variant="warning" className="mt-3">{authError}</Alert>;

  return (
    <>
      {apiError && <Alert variant="danger" className="mb-3">{apiError}</Alert>}

      {activeStep === 1 && <Step1 />}\
n      {activeStep === 2 && <Step2 />}\
n      {activeStep === 3 && <Review />}\
n
      {/* Navigation buttons */}
      {activeStep < 3 && (
        <button className="btn btn-primary px-4" onClick={handleNext} disabled={!user}>
          التالي
        </button>
      )}

      {activeStep === 3 && (
        <div className="text-start">
          <button className="btn nav-btn btn-outline-secondary py-2 fs-5 mb-2" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : <>تقديم الطلب &nbsp; <FaArrowLeftLong size={20} /></>}
          </button>
        </div>
      )}

      {/* Results */}
      {analysisResults && (
        <div id="analysis-results" className="mt-5">
          {/* عرض مبسط للنتائج، يمكنك استبداله بالرسومات */}
          <h4 className="text-primary mb-3">نتائج التحليل</h4>
          <pre className="bg-light p-3 border rounded-3 text-start" style={{ direction: "ltr" }}>{JSON.stringify(analysisResults, null, 2)}</pre>
        </div>
      )}
    </>
  );
});

export default ConsumptionServices;
