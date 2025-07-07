import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";

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
import {
  FaArrowLeftLong,
  FaLightbulb,
  FaBolt,
  FaChartPie,
} from "react-icons/fa6";
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

  const [showResults, setShowResults] = useState(false);
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
    ApplianceUsage_Encoded: "",
    HouseholdSize: "",
    HomeType_Encoded: "",
    ConsumptionTrend: "",
    SeasonalConsumptionPattern: "",
  });

  // ألوان محسنة للمخططات
  const COLORS = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];

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
    if (!formData.ApplianceUsage_Encoded)
      acc.ApplianceUsage_Encoded = "نمط استخدام الاجهزة مطلوب ";
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

  const transformFeatureImportanceData = (featureImportance) => {
    const arabicLabels = {
      BillMonth: "شهر الفاتورة",
      BillYear: "سنة الفاتورة",
      DaysInBillingCycle: "أيام دورة الفاتورة",
      MeterTypeEncoded: "نوع العداد",
      NumberOfAirConditionersFloat: "عدد المكيفات",
      AirConditionerUsageHours: "ساعات تشغيل المكيف",
      AirConditionerTypeEncoded: "نوع المكيف",
      NumberOfLightsFloat: "عدد المصابيح",
      LightTypeEncoded: "نوع المصابيح",
      LightUsageHours: "ساعات الإضاءة",
      OtherMajorAppliances_CountFloat: "الأجهزة الكبرى",
      ApplianceUsage_EncodedFloat: "نمط استخدام الأجهزة",
      HouseholdSizeFloat: "حجم الأسرة",
      HomeTypeEncoded: "نوع المنزل",
      ConsumptionTrendEncoded: "نمط الاستهلاك",
      SeasonalConsumptionPatternEncoded: "النمط الموسمي",
    };

    // 1. تصفية القيم غير الصفرية
    const filtered = Object.entries(featureImportance).filter(
      ([_, value]) => value > 0
    );

    // 2. حساب المجموع الكلي
    const total = filtered.reduce((sum, [_, value]) => sum + value, 0);

    // 3. حساب النسب المئوية
    const percentageData = filtered.map(([key, value]) => ({
      name: arabicLabels[key] || key,
      value: Number(((value / total) * 100).toFixed(2)), // نسبة مئوية مضبوطة
    }));

    // ترتيب تنازلي حسب التأثير (اختياري)
    percentageData.sort((a, b) => b.value - a.value);

    // الناتج النهائي:
    console.log(percentageData);

    return percentageData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setApiError(null);
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/BillRecommendations/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /* Transform response for charts */
      if (response.data) {
        // تحويل البيانات الجديدة من الباك إند
        const transformedData = {
          ...response.data, // الاحتفاظ بجميع البيانات الأصلية
          featureImportanceChart: transformFeatureImportanceData(
            response.data.featureImportance || {}
          ),
        };

        setAnalysisResults(transformedData);
        setShowResults(true); // إظهار النتائج وإخفاء الفورم

        // التمرير لأعلى الصفحة
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // دالة للرجوع للفورم
  const handleBackToForm = () => {
    setShowResults(false);
    setAnalysisResults(null);
  };

  if (authError) {
    return (
      <Alert variant="warning" className="mt-3">
        {authError}
      </Alert>
    );
  }

  if (showResults && analysisResults) {
    return (
      <div className="results-only-view">
        {/* زر الرجوع */}
        {/* <div className="back-to-form-section mb-4">
        <Container fluid>
          <button
            className="btn btn-back-to-form btn-lg"
            onClick={handleBackToForm}
            style={{
              borderRadius: '25px',
              padding: '12px 30px',
              fontWeight: 'bold'
            }}
          >
            <FaArrowLeftLong className="me-2" />
            العودة لتحليل جديد
          </button>
        </Container>
      </div> */}

        {/* النتائج */}
        <div className="analysis-results-section">
          <Container fluid>
            {/* Header Section */}
            <div className="results-header text-center mb-5">
              <h1 className="display-5 text-color mb-5  fw-bold">
                <FaChartPie className="me-3" />
                نتائج تحليل استهلاك الكهرباء
              </h1>
              <div className="bill-status-badge mb-4">
                {analysisResults.isHighBill ? (
                  <Badge
                    bg="danger"
                    className="fs-4 p-4"
                    style={{ borderRadius: "25px" }}
                  >
                    <FaBolt className="me-2" />
                    فاتورة مرتفعة - تحتاج إلى ترشيد
                  </Badge>
                ) : (
                  <Badge
                    bg="clor"
                    className="fs-4 p-4"
                    style={{ borderRadius: "25px" }}
                  >
                    <FaBolt className="me-2" />
                    فاتورة ضمن المعدل الطبيعي
                  </Badge>
                )}
              </div>
            </div>

            <Row className="g-4">
              {/* Bill Summary Cards */}
              <Col lg={12} className="mb-4">
                <Row className="g-3">
                  <Col md={4}>
                    <Card
                      className="summary-card border-0 shadow h-100"
                      style={{ borderRadius: "20px" }}
                    >
                      <Card.Body className="text-center p-4">
                        <div className="summary-icon mb-3">
                          <FaBolt size={50} className="text-warning" />
                        </div>
                        <h5 className="text-muted mb-2 fs-6">مبلغ الفاتورة</h5>
                        <h2 className="text-color mb-0 fw-bold">
                          {analysisResults.billAmount} جنيه
                        </h2>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card
                      className="summary-card border-0 shadow h-100"
                      style={{ borderRadius: "20px" }}
                    >
                      <Card.Body className="text-center p-4">
                        <div className="summary-icon mb-3">
                          <i
                            className="fas fa-home"
                            style={{ fontSize: "50px", color: "#17a2b8" }}
                          ></i>
                        </div>
                        <h5 className="text-muted mb-2 fs-6">
                          إجمالي الاستهلاك
                        </h5>
                        <h2 className="text-color mb-0 fw-bold">
                          {analysisResults.consumption} (كيلو وات)
                        </h2>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card
                      className="summary-card border-0 shadow h-100"
                      style={{ borderRadius: "20px" }}
                    >
                      <Card.Body className="text-center p-4">
                        <div className="summary-icon mb-3">
                          <FaLightbulb size={50} className="text-success" />
                        </div>
                        <h5 className="text-muted mb-2 fs-6">عدد النصائح</h5>
                        <h2 className="text-color mb-0 fw-bold">
                          {analysisResults.recommendations?.length || 0}
                        </h2>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>

              {/* Feature Importance Chart */}
              {analysisResults.featureImportanceChart &&
                analysisResults.featureImportanceChart.length > 0 && (
                  <Col lg={8} className="mb-4">
                    <Card
                      className="chart-card border-0 shadow h-100"
                      style={{ borderRadius: "20px" }}
                    >
                      <Card.Header
                        className="bg-color text-white"
                        style={{ borderRadius: "20px 20px 0 0" }}
                      >
                        <h3 className="mb-0 fw-bold">
                          <FaChartPie className="me-2" />
                          العوامل المؤثرة في الاستهلاك
                        </h3>
                      </Card.Header>
                      <Card.Body className="p-4">
                        <ResponsiveContainer width="100%" height={400}>
                          {" "}
                          {/* قلل الارتفاع من 550 */}
                          <PieChart>
                            <Pie
                              data={analysisResults.featureImportanceChart}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={120}
                              innerRadius={40}
                              paddingAngle={2}
                              label={({ value }) => ` ${value}%`}
                              labelLine={false}
                              fontSize={11}
                            >
                              {analysisResults.featureImportanceChart?.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                )
                              )}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [
                                `${value}`,
                                "نسبة التأثير",
                              ]}
                              contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "13px",
                                direction: "rtl",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>

                        <div className="custom-legend ">
                          <div className="row g-2">
                            {analysisResults.featureImportanceChart?.map(
                              (entry, index) => (
                                <div key={index} className="col-md-6 col-lg-4">
                                  <div
                                    className="legend-item d-flex align-items-center p-2 rounded"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                  >
                                    <div
                                      className="legend-color me-2"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        backgroundColor:
                                          COLORS[index % COLORS.length],
                                        borderRadius: "3px",
                                        flexShrink: 0,
                                      }}
                                    ></div>
                                    <span
                                      className="legend-text"
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        color: "#495057",
                                        lineHeight: "1.2",
                                      }}
                                    >
                                      {entry.name}
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="text-center mt-5">
                          <small className="text-muted fs-6">
                            النسب المئوية تمثل تأثير كل عامل على إجمالي
                            الاستهلاك
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}

              {/* Top Factors */}
              {analysisResults.featureImportanceChart &&
                analysisResults.featureImportanceChart.length > 0 && (
                  <Col lg={4} className="mb-4">
                    <Card
                      className="factors-card border-0 shadow h-100"
                      style={{ borderRadius: "20px" }}
                    >
                      <Card.Header
                        className="bg-color text-white"
                        style={{ borderRadius: "20px 20px 0 0" }}
                      >
                        <h3 className="mb-2 mt-1 fw-bold fs-5">
                          <i className="fas fa-chart-line ms-2 me-2"></i>
                          أهم العوامل المؤثرة
                        </h3>
                      </Card.Header>
                      <Card.Body className="p-4">
                        <div className="factors-list">
                          {analysisResults.featureImportanceChart
                            ?.slice(0, 6)
                            .map((factor, index) => (
                              <div key={index} className="factor-item mb-3">
                                <div
                                  className="d-flex justify-content-between align-items-center p-3 rounded-3"
                                  style={{
                                    backgroundColor: `${
                                      COLORS[index % COLORS.length]
                                    }15`,
                                    border: `2px solid ${
                                      COLORS[index % COLORS.length]
                                    }30`,
                                  }}
                                >
                                  <div className="factor-info flex-grow-1">
                                    <div
                                      className="factor-name fw-bold mb-2"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {factor.name}
                                    </div>
                                    <div
                                      className="factor-bar"
                                      style={{
                                        height: "8px",
                                        backgroundColor: "#e9ecef",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: `${factor.value}%`,
                                          height: "100%",
                                          backgroundColor:
                                            COLORS[index % COLORS.length],
                                          borderRadius: "4px",
                                          transition: "width 0.5s ease",
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                  <Badge
                                    style={{
                                      backgroundColor:
                                        COLORS[index % COLORS.length],
                                      marginLeft: "5px",
                                      fontSize: "14px",
                                      padding: "8px 12px",
                                      borderRadius: "15px",
                                    }}
                                    className="bg-color factor-percentage"
                                  >
                                    {factor.value}%
                                  </Badge>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="mt-4 p-3 bg-light rounded-3">
                          <small className="text-muted fs-6">
                            <i className="fas fa-info-circle me-2"></i>
                            العوامل مرتبة حسب درجة تأثيرها على استهلاك الكهرباء
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}

              {/* Recommendations */}
              {analysisResults.recommendations &&
                analysisResults.recommendations.length > 0 && (
                  <Col lg={12}>
                    <Card
                      className="recommendations-card border-0 shadow"
                      style={{ borderRadius: "20px" }}
                    >
                      <Card.Header
                        className="bg-color text-white"
                        style={{ borderRadius: "20px 20px 0 0" }}
                      >
                        <h3 className="mb-0  fw-bold">
                          <FaLightbulb className="me-2" />
                          نصائح ترشيد الاستهلاك
                        </h3>
                      </Card.Header>
                      <Card.Body className="p-4">
                        <Row className="g-4">
                          {analysisResults.recommendations?.map(
                            (recommendation, index) => (
                              <Col md={6} key={index}>
                                <div
                                  className="recommendation-item p-4 border rounded-3 h-100 shadow-sm"
                                  style={{
                                    borderLeft: `5px solid ${
                                      COLORS[index % COLORS.length]
                                    }`,
                                    backgroundColor: `${
                                      COLORS[index % COLORS.length]
                                    }05`,
                                  }}
                                >
                                  <div className="d-flex align-items-start">
                                    {/* <div className="recommendation-icon me-3 mt-1">
                                      <FaLightbulb
                                        size={24}
                                        style={{
                                          color: COLORS[index % COLORS.length],
                                        }}
                                      /> 
                                    </div>  */}
                                    <div className="recommendation-text">
                                      <p className="mb-0 fs-5 fw-medium">
                                        {recommendation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            )
                          )}
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                )}

              {/* زر العودة في الأسفل أيضاً */}
              <Col lg={12} className="d-flex justify-content-center">
                <button
                  className="btn nav-btn btn-outline-secondry p2-4 py-2 mb-2 mt-3"
                  onClick={handleBackToForm}
                  style={{
                    borderRadius: "25px",
                    padding: "15px 40px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <FaArrowLeftLong className="ms-2" />
                  إجراء تحليل جديد
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  // إذا لم تكن النتائج معروضة، اعرض الفورم العادي
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

        {/* Navigation buttons */}
        {activeStep < 2 && (
          <div className="d-flex justify-content-end">
            <button
              className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-4 mb-2 mt-3"
              onClick={handleNext}
              disabled={!user}
            >
              التالي &nbsp; <FaArrowLeftLong size={20} />
            </button>
          </div>
        )}
        {activeStep === 2 && (
          <div className="d-flex justify-content-end">
            <button
              className="btn nav-btn btn-outline-secondry p2-4 py-2 fs-4 mb-2 mt-3"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "جاري الإرسال..."
              ) : (
                <>
                  متابعة &nbsp; <FaArrowLeftLong size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </Form>
    </>
  );
});

export default ConsumptionServices;
