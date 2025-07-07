import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Button, Alert, Card, Row, Col, Badge } from "react-bootstrap";
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

import { API_CONFIG } from "../../api/config";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./UtilityServices.css";

const ConsumptionServices = forwardRef((props, ref) => {
  const { user } = useAuth();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    BillAmount: "",
    Consumption: "",
    BillMonth: "",
    BillYear: "",
    DaysInBillingCycle: "",
    MeterType: "Electricity",
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [card, setCard] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [resultData, setResultData] = useState(null);

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  useEffect(() => {
    if (location.state) {
      setCard(location.state);
    } else {
      const defaultCards = {
        "utility-6": {
          id: "utility-6",
          title: "متابعة الاستهلاك بشكل لحظي",
          icon: "⚡",
        },
      };

      if (params.id && defaultCards[params.id]) {
        setCard(defaultCards[params.id]);
      } else {
        setCard(defaultCards["utility-6"]);
      }
    }
  }, [location.state, params.id]);

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    const requiredFields = {
      BillAmount: "قيمة الفاتورة مطلوبة",
      Consumption: "الاستهلاك مطلوب",
      BillMonth: "شهر الفاتورة مطلوب",
      BillYear: "سنة الفاتورة مطلوبة",
      DaysInBillingCycle: "عدد أيام دورة الفاتورة مطلوب",
      MeterType: "نوع العداد مطلوب",
      HomeType_Encoded: "نوع المنزل مطلوب",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) {
        newErrors[field] = message;
        isValid = false;
      }
    });

    // Numeric validation
    const numericFields = ["BillAmount", "Consumption", "DaysInBillingCycle"];
    numericFields.forEach((field) => {
      if (formData[field] && isNaN(formData[field])) {
        newErrors[field] = "يجب إدخال رقم صحيح";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("يرجى تسجيل الدخول للمتابعة");
      return;
    }

    if (!validateForm()) {
      alert("يرجى تصحيح الأخطاء في النموذج قبل الإرسال.");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const submissionData = {
        billAmount: parseFloat(formData.BillAmount),
        consumption: parseFloat(formData.Consumption),
        billMonth: parseInt(formData.BillMonth),
        billYear: parseInt(formData.BillYear),
        daysInBillingCycle: parseInt(formData.DaysInBillingCycle),
        meterType: formData.MeterType,
        numberOfAirConditioners:
          parseInt(formData.NumberOfAirConditioners) || 0,
        airConditionerUsageHours:
          parseFloat(formData.AirConditionerUsageHours) || 0,
        airConditionerType: formData.AirConditionerType || "Unknown",
        numberOfLights: parseInt(formData.NumberOfLights) || 0,
        lightType: formData.LightType || "Unknown",
        lightUsageHours: parseFloat(formData.LightUsageHours) || 0,
        otherMajorAppliancesCount:
          parseInt(formData.OtherMajorAppliances_Count) || 0,
        applianceUsageEncoded: formData.ApplianceUsage_Encoded,
        householdSize: parseInt(formData.HouseholdSize) || 0,
        homeTypeEncoded: formData.HomeType_Encoded,
        consumptionTrend: formData.ConsumptionTrend || "Unknown",
        seasonalConsumptionPattern:
          formData.SeasonalConsumptionPattern || "Unknown",
      };

      console.log("Sending data to API:", submissionData);
      console.log(
        "API URL:",
        `${API_CONFIG.BASE_URL}/BillRecommendations/analyze`
      );

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/BillRecommendations/analyze`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data) {
        const transformedData = {
          consumptionDistribution: [
            {
              name: "التكييف",
              value: response.data.airConditionerConsumption || 0,
            },
            { name: "الإضاءة", value: response.data.lightingConsumption || 0 },
            {
              name: "الأجهزة الأخرى",
              value: response.data.otherAppliancesConsumption || 0,
            },
          ],
          consumptionTrends: response.data.monthlyConsumption || [],
          recommendations: response.data.recommendations || [],
          summaryStats: [
            {
              label: "متوسط الاستهلاك",
              value: `${response.data.averageConsumption || 0} ك.و.س`,
            },
            {
              label: "أعلى استهلاك",
              value: `${response.data.highestConsumption || 0} ك.و.س`,
            },
            {
              label: "أقل استهلاك",
              value: `${response.data.lowestConsumption || 0} ك.و.س`,
            },
          ],
        };

        setAnalysisResults(transformedData);
        document
          .getElementById("analysis-results")
          .scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      setApiError(
        error.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      return validateForm();
    },
    getFormData: () => formData,
  }));

  const renderAnalysisResults = () => {
    if (!analysisResults) return null;

    return (
      <div id="analysis-results" className="mt-5">
        <h3 className="text-center mb-4 text-primary">نتائج التحليل</h3>

        {/* Consumption Distribution Chart */}
        <div className="chart-container mb-5">
          <h4 className="mb-3">توزيع الاستهلاك</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analysisResults.consumptionDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analysisResults.consumptionDistribution?.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Consumption Trends Chart */}
        <div className="chart-container mb-5">
          <h4 className="mb-3">اتجاهات الاستهلاك</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisResults.consumptionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="recommendations-section p-4 border rounded-3">
          <h4 className="mb-3">التوصيات</h4>
          <ul className="list-unstyled">
            {analysisResults.recommendations?.map((rec, index) => (
              <li key={index} className="mb-2">
                <i className="fas fa-lightbulb text-warning me-2"></i>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Statistics */}
        <div className="summary-stats mt-4 p-4 border rounded-3">
          <h4 className="mb-3">ملخص الإحصائيات</h4>
          <div className="row">
            {analysisResults.summaryStats?.map((stat, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="stat-card p-3 border rounded">
                  <h5 className="text-muted">{stat.label}</h5>
                  <p className="h4 mb-0">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getFeatureDisplayName = (key) => {
    const nameMap = {
      BillMonth: "شهر الفاتورة",
      BillYear: "سنة الفاتورة",
      DaysInBillingCycle: "أيام دورة الفاتورة",
      MeterTypeEncoded: "نوع العداد",
      NumberOfAirConditionersFloat: "عدد أجهزة التكييف",
      AirConditionerUsageHours: "ساعات تشغيل التكييف",
      AirConditionerTypeEncoded: "نوع التكييف",
      NumberOfLightsFloat: "عدد اللمبات",
      LightTypeEncoded: "نوع الإضاءة",
      LightUsageHours: "ساعات تشغيل الإضاءة",
      OtherMajorAppliances_CountFloat: "الأجهزة الكبرى الأخرى",
      ApplianceUsage_EncodedFloat: "استخدام الأجهزة",
      HouseholdSizeFloat: "حجم الأسرة",
      HomeTypeEncoded: "نوع المنزل",
      ConsumptionTrendEncoded: "نمط الاستهلاك",
      SeasonalConsumptionPatternEncoded: "النمط الموسمي",
    };
    return nameMap[key] || key;
  };

  const getFactorIcon = (factorName) => {
    const iconMap = {
      "شهر الفاتورة": "📅",
      "سنة الفاتورة": "🗓️",
      "أيام دورة الفاتورة": "⏱️",
      "نوع العداد": "📊",
      "عدد أجهزة التكييف": "❄️",
      "ساعات تشغيل التكييف": "🕐",
      "نوع التكييف": "🌡️",
      "عدد اللمبات": "💡",
      "نوع الإضاءة": "🔆",
      "ساعات تشغيل الإضاءة": "⏰",
      "الأجهزة الكبرى الأخرى": "📱",
      "استخدام الأجهزة": "🔌",
      "حجم الأسرة": "👨‍👩‍👧‍👦",
      "نوع المنزل": "🏠",
      "نمط الاستهلاك": "📈",
      "النمط الموسمي": "🌤️",
    };
    return iconMap[factorName] || "⚡";
  };

  const currentServiceTitle = card?.title || "خدمات الاستهلاك";

  if (!user) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning text-center">
          <p className="mb-0">يرجى تسجيل الدخول للمتابعة</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center mt-5">
        <h4>جاري التحميل...</h4>
      </div>
    );
  }

  const isElectricityService = card.id === "utility-6";

  if (!isElectricityService) {
    return (
      <div className="text-center mt-5">
        <h4>هذه الخدمة غير متاحة حالياً</h4>
        <p>الخدمة المطلوبة: {card.title}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="modern-card p-4 shadow-sm rounded-4 bg-white">
        {apiError && (
          <Alert variant="danger" className="mb-4">
            {apiError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Bill Information Section */}
          <div className="form-section-custom mb-5 p-4 border rounded-3">
            <h5 className="section-title mb-4 text-primary fw-bold">
              معلومات الفاتورة الأساسية
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>قيمة الفاتورة (ريال)</Form.Label>
                  <Form.Control
                    type="number"
                    name="BillAmount"
                    value={formData.BillAmount}
                    onChange={handleChange}
                    className={`custom-input ${
                      errors.BillAmount ? "is-invalid" : ""
                    }`}
                    placeholder="أدخل قيمة الفاتورة"
                  />
                  {errors.BillAmount && (
                    <Form.Control.Feedback type="invalid">
                      {errors.BillAmount}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>الاستهلاك (كيلو وات/ساعة)</Form.Label>
                  <Form.Control
                    type="number"
                    name="Consumption"
                    value={formData.Consumption}
                    onChange={handleChange}
                    className={`custom-input ${
                      errors.Consumption ? "is-invalid" : ""
                    }`}
                    placeholder="أدخل قيمة الاستهلاك"
                  />
                  {errors.Consumption && (
                    <Form.Control.Feedback type="invalid">
                      {errors.Consumption}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <Form.Group>
                  <Form.Label>شهر الفاتورة</Form.Label>
                  <Form.Select
                    name="BillMonth"
                    value={formData.BillMonth}
                    onChange={handleChange}
                    className={`custom-select-style custom-input ${
                      errors.BillMonth ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">اختر الشهر</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.BillMonth && (
                    <Form.Control.Feedback type="invalid">
                      {errors.BillMonth}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Group>
                  <Form.Label>سنة الفاتورة</Form.Label>
                  <Form.Select
                    name="BillYear"
                    value={formData.BillYear}
                    onChange={handleChange}
                    className={`custom-select-style custom-input ${
                      errors.BillYear ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">اختر السنة</option>
                    {Array.from({ length: 5 }, (_, i) => (
                      <option key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.BillYear && (
                    <Form.Control.Feedback type="invalid">
                      {errors.BillYear}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Group>
                  <Form.Label>عدد أيام دورة الفاتورة</Form.Label>
                  <Form.Control
                    type="number"
                    name="DaysInBillingCycle"
                    value={formData.DaysInBillingCycle}
                    onChange={handleChange}
                    className={`custom-input ${
                      errors.DaysInBillingCycle ? "is-invalid" : ""
                    }`}
                    placeholder="عدد الأيام"
                  />
                  {errors.DaysInBillingCycle && (
                    <Form.Control.Feedback type="invalid">
                      {errors.DaysInBillingCycle}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>نوع العداد</Form.Label>
                  <Form.Select
                    name="MeterType"
                    value={formData.MeterType}
                    onChange={handleChange}
                    className={`custom-select-style custom-input ${
                      errors.MeterType ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">اختر نوع العداد</option>
                    <option value="Electricity">كهرباء</option>
                    <option value="Water">ماء</option>
                    <option value="Gas">غاز</option>
                  </Form.Select>
                  {errors.MeterType && (
                    <Form.Control.Feedback type="invalid">
                      {errors.MeterType}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>نوع المنزل</Form.Label>
                  <Form.Select
                    name="HomeType_Encoded"
                    value={formData.HomeType_Encoded}
                    onChange={handleChange}
                    className={`custom-select-style custom-input ${
                      errors.HomeType_Encoded ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">اختر نوع المنزل</option>
                    <option value="Villa">فيلا</option>
                    <option value="Apartment">شقة</option>
                    <option value="Duplex">دوبلكس</option>
                    <option value="House">منزل</option>
                  </Form.Select>
                  {errors.HomeType_Encoded && (
                    <Form.Control.Feedback type="invalid">
                      {errors.HomeType_Encoded}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
            </div>
          </div>

          {/* Air Conditioning Information Section */}
          <div className="form-section-custom mb-5 p-4 border rounded-3">
            <h5 className="section-title mb-4 text-primary fw-bold">
              معلومات التكييف
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>عدد أجهزة التكييف</Form.Label>
                  <Form.Control
                    type="number"
                    name="NumberOfAirConditioners"
                    value={formData.NumberOfAirConditioners}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder="عدد أجهزة التكييف"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>ساعات تشغيل التكييف يوميًا</Form.Label>
                  <Form.Control
                    type="number"
                    name="AirConditionerUsageHours"
                    value={formData.AirConditionerUsageHours}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder="ساعات التشغيل"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>نوع التكييف</Form.Label>
                  <Form.Select
                    name="AirConditionerType"
                    value={formData.AirConditionerType}
                    onChange={handleChange}
                    className="custom-select-style custom-input"
                  >
                    <option value="">اختر النوع</option>
                    <option value="Central">مركزي</option>
                    <option value="Split">سبليت</option>
                    <option value="Window">نافذة</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>حجم الأسرة</Form.Label>
                  <Form.Control
                    type="number"
                    name="HouseholdSize"
                    value={formData.HouseholdSize}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder="عدد الأفراد"
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          {/* Lighting Information Section */}
          <div className="form-section-custom mb-5 p-4 border rounded-3">
            <h5 className="section-title mb-4 text-primary fw-bold">
              معلومات الإضاءة
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>عدد اللمبات</Form.Label>
                  <Form.Control
                    type="number"
                    name="NumberOfLights"
                    value={formData.NumberOfLights}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder="عدد اللمبات"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>ساعات تشغيل الإضاءة يوميًا</Form.Label>
                  <Form.Control
                    type="number"
                    name="LightUsageHours"
                    value={formData.LightUsageHours}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder="ساعات التشغيل"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>نوع الإضاءة</Form.Label>
                  <Form.Select
                    name="LightType"
                    value={formData.LightType}
                    onChange={handleChange}
                    className="custom-select-style custom-input"
                  >
                    <option value="">اختر النوع</option>
                    <option value="LED">LED</option>
                    <option value="CFL">CFL</option>
                    <option value="Incandescent">تقليدي</option>
                    <option value="Fluorescent">فلورسنت</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>

          {/* Other Appliances & Trends Section */}
          <div className="form-section-custom mb-5 p-4 border rounded-3">
            <h5 className="section-title mb-4 text-primary fw-bold">
              أجهزة أخرى وأنماط الاستهلاك
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>عدد الأجهزة الكبرى الأخرى</Form.Label>
                  <Form.Control
                    type="number"
                    name="OtherMajorAppliances_Count"
                    value={formData.OtherMajorAppliances_Count}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder="عدد الأجهزة"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>نمط الاستهلاك</Form.Label>
                  <Form.Select
                    name="ConsumptionTrend"
                    value={formData.ConsumptionTrend}
                    onChange={handleChange}
                    className="custom-select-style custom-input"
                  >
                    <option value="">اختر النمط</option>
                    <option value="Increasing">متزايد</option>
                    <option value="Decreasing">متناقص</option>
                    <option value="Stable">مستقر</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>نمط الاستهلاك الموسمي</Form.Label>
                  <Form.Select
                    name="SeasonalConsumptionPattern"
                    value={formData.SeasonalConsumptionPattern}
                    onChange={handleChange}
                    className="custom-select-style custom-input"
                  >
                    <option value="">اختر النمط</option>
                    <option value="HigherThanUsual">أعلى من المعتاد</option>
                    <option value="LowerThanUsual">أقل من المعتاد</option>
                    <option value="Normal">طبيعي</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <Button
              type="submit"
              className="btn-custom-submit py-2 px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال البيانات"}
            </Button>
          </div>
        </Form>

        {/* Analysis Results Section */}
        {analysisResults && renderAnalysisResults()}
      </div>
    </div>
  );
});

export default ConsumptionServices;
