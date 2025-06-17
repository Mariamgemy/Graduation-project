import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";


import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Form, Alert } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_CONFIG } from "../../api/config";
import "./UtilityServices.css";
import Step1 from "./Step1Consumption";
import Step2 from "./Step2Consumption";
const ConsumptionServices = forwardRef((props, ref) => {
  const location = useLocation();
  const { user } = useAuth();

  const [activeStep, setActiveStep] = useState(1);
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
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  useEffect(() => {
    if (!user) setAuthError("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
    else setAuthError(null);
  }, [user]);

  const isPositiveNumber = (v) => v !== "" && !isNaN(v) && Number(v) > 0;

  const validateStep1 = (acc) => {
    if (!isPositiveNumber(formData.BillAmount))
      acc.BillAmount = "أدخل مبلغًا صحيحًا";
    if (!isPositiveNumber(formData.Consumption))
      acc.Consumption = "أدخل استهلاكًا صحيحًا";
    if (!formData.BillMonth) acc.BillMonth = "شهر الفاتورة مطلوب";
    if (!formData.BillYear || String(formData.BillYear).length !== 4)
      acc.BillYear = "سنة مكونة من 4 أرقام";
    if (!isPositiveNumber(formData.DaysInBillingCycle))
      acc.DaysInBillingCycle = "عدد أيام مطلوب";
    if (!formData.MeterType) acc.MeterType = "نوع العداد مطلوب";
    if (!formData.HomeType_Encoded) acc.HomeType_Encoded = "نوع المنزل مطلوب";
    if (!isPositiveNumber(formData.NumberOfAirConditioners))
      acc.NumberOfAirConditioners = " عدد المكيفات مطلوب";
    if (!isPositiveNumber(formData.AirConditionerUsageHours))
      acc.AirConditionerUsageHours = "ساعات تشغيل المكيف مطلوبة";
    if (!formData.AirConditionerType)
      acc.AirConditionerType = "نوع المكيف مطلوب";
    if (!isPositiveNumber(formData.HouseholdSize))
      acc.HouseholdSize = "عدد أفراد الأسرة مطلوب";
  };

  const validateStep2 = (acc) => {
    if (!isPositiveNumber(formData.NumberOfLights))
      acc.NumberOfLights = "عدد المصابيح";
    if (!formData.LightType) acc.LightType = "نوع المصابيح مطلوب";
    if (!isPositiveNumber(formData.LightUsageHours))
      acc.LightUsageHours = "ساعات تشغيل المصابيح";
    if (!isPositiveNumber(formData.OtherMajorAppliances_Count))
      acc.OtherMajorAppliances_Count = "عدد الأجهزة الكبرى";
    if (!formData.ConsumptionTrend)
      acc.ConsumptionTrend = "نمط الاستهلاك مطلوب";
    if (!formData.SeasonalConsumptionPattern)
      acc.SeasonalConsumptionPattern = "النمط الموسمي مطلوب";
  };

  const validateForm = () => {
    const acc = {};
    validateStep1(acc);
    validateStep2(acc);
    setErrors(acc);
    return Object.keys(acc).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError(null);
  };

  const handleNext = () => {
    const acc = {};
    if (activeStep === 1) validateStep1(acc);
    if (activeStep === 2) validateStep2(acc);
    setErrors(acc);
    if (Object.keys(acc).length === 0) setActiveStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setApiError(null);
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}/BillRecommendations/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
          {
            label: "متوسط الاستهلاك",
            value: `${d.featureImportance.BillMonth || 0} ك.و.س`,
          },
          {
            label: "أعلى استهلاك",
            value: `${d.highestConsumption || 0} ك.و.س`,
          },
          { label: "أقل استهلاك", value: `${d.lowestConsumption || 0} ك.و.س` },
        ],
      });
      document
        .getElementById("analysis-results")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setApiError("حدث خطأ أثناء إرسال البيانات، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => formData,
    submitForm: handleSubmit,
  }));

  // const Field = ({
  //   col = "col-md-6",
  //   label,
  //   name,
  //   type = "number",
  //   as = "input",
  //   options = [],
  // }) => (
  //   <div className={`${col} mb-3`}>
  //     <Form.Group>
  //       <Form.Label>{label}</Form.Label>
  //       {as === "select" ? (
  //         <Form.Select
  //           name={name}
  //           value={formData[name]}
  //           onChange={handleChange}
  //           className={errors[name] ? "is-invalid" : ""}
  //         >
  //           <option value="">اختر</option>
  //           {options.map((o) => (
  //             <option key={o.value} value={o.value}>
  //               {o.label}
  //             </option>
  //           ))}
  //         </Form.Select>
  //       ) : (
  //         <Form.Control
  //           type={type}
  //           name={name}
  //           value={formData[name]}
  //           onChange={handleChange}
  //           className={errors[name] ? "is-invalid" : ""}
  //         />
  //       )}
  //       {errors[name] && (
  //         <Form.Control.Feedback type="invalid">
  //           {errors[name]}
  //         </Form.Control.Feedback>
  //       )}
  //     </Form.Group>
  //   </div>
  // );

  const Review = () => (
    <div className="review-section mt-4">
      <h4 className="mb-4 text-center">مراجعة البيانات</h4>
      <pre
        className="bg-light p-3 border rounded-3 text-start"
        style={{ direction: "ltr" }}
      >
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );

  if (authError)
    return (
      <Alert variant="warning" className="mt-3">
        {authError}
      </Alert>
    );

  return (
    <>
      {apiError && (
        <Alert variant="danger" className="mb-3">
          {apiError}
        </Alert>
      )}
      <Form noValidate onSubmit={handleSubmit}>
      {activeStep === 1 && (
        <Step1
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      )}
      {activeStep === 2 && (
        <Step2
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      )}
      {activeStep === 3 && <Review />}
      {/* Navigation buttons */}
      {activeStep < 3 && (
        <div className="text-start">
        <button
         className="btn nav-btn btn-outline-secondry mb-2 mt-3"
          onClick={handleNext}
          disabled={!user}
        >
          التالي &nbsp; <FaArrowLeftLong size={20} />
        </button>
        </div>
      )}
      {activeStep === 3 && (
        <div className="text-start">
          <button
         className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-5 mb-2 mt-3"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "جاري الإرسال..."
            ) : (
              <>
                متابعة  &nbsp; <FaArrowLeftLong size={20} />
              </>
            )}
          </button>
        </div>
      )}
      {/* Results */}
      {analysisResults && (
        <div id="analysis-results" className="mt-5">
          {/* عرض مبسط للنتائج، يمكنك استبداله بالرسومات */}
          <h4 className="text-primary mb-3">نتائج التحليل</h4>
          <pre
            className="bg-light p-3 border rounded-3 text-start"
            style={{ direction: "ltr" }}
          >
            {JSON.stringify(analysisResults, null, 2)}
          </pre>
        </div>
      )}
      </Form>
    </>
  );
});

export default ConsumptionServices;
