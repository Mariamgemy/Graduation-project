import { forwardRef, useImperativeHandle } from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const ElectricityConsumptionForm = forwardRef((props, ref) => {
  const location = useLocation();
  const params = useParams();
  
  // التحقق من البيانات الواردة
  const [card, setCard] = useState(null);
  
  useEffect(() => {
    // محاولة الحصول على البيانات من location.state أولاً
    if (location.state) {
      setCard(location.state);
    } else {
      // إذا مفيش بيانات، استخدم بيانات افتراضية حسب الـ ID
      const defaultCards = {
        'utility-6': {
          id: 'utility-6',
          title: 'متابعة الاستهلاك بشكل لحظي',
          icon: '⚡'
        }
        // ممكن تضيفي كروت تانية هنا
      };
      
      if (params.id && defaultCards[params.id]) {
        setCard(defaultCards[params.id]);
      }
    }
  }, [location.state, params.id]);

  const [user] = useState(true); // افتراض أن المستخدم مسجل دخول
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authError = "يرجى تسجيل الدخول للمتابعة";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // إزالة الخطأ عند التغيير
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // إزالة الخطأ عند التغيير
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // هنا حط الكود بتاع الإرسال للسيرفر
      console.log("Form Data:", formData);
      
      // محاكاة عملية الإرسال
      setTimeout(() => {
        setIsSubmitting(false);
        alert("تم تقديم الطلب بنجاح!");
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      alert("حدث خطأ أثناء تقديم الطلب");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.BillAmount) newErrors.BillAmount = "مطلوب قيمة الفاتورة";
    if (!formData.Consumption) newErrors.Consumption = "مطلوب الاستهلاك";
    if (!formData.BillMonth) newErrors.BillMonth = "مطلوب شهر الفاتورة";
    if (!formData.BillYear) newErrors.BillYear = "مطلوب سنة الفاتورة";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => formData,
    submitForm: handleSubmit
  }));

  const renderStepContent = () => {
    if (!user) {
      return (
        <div className="mt-3 p-3">
          <div className="alert alert-warning mb-3">
            <p className="mb-0">{authError}</p>
          </div>
        </div>
      );
    }

    // التحقق من وجود الكارت وأن العنوان صحيح
    if (!card) {
      return (
        <div className="text-center mt-5">
          <h4>جاري التحميل...</h4>
        </div>
      );
    }

    // التحقق من نوع الخدمة
    const isElectricityService = card.title === "متابعة استهلاك الكهرباء بشكل لحظي" || 
                                card.id === "utility-6";

    if (!isElectricityService) {
      return (
        <div className="text-center mt-5">
          <h4>هذه الخدمة غير متاحة حالياً</h4>
          <p>الخدمة المطلوبة: {card.title}</p>
        </div>
      );
    }

    switch (activeStep) {
      case 1:
        return (
          <div className="electricity-consumption-form mt-4">
            <h4 className="mb-4 text-center">{card.title}</h4>
            
            {/* معلومات الفاتورة الأساسية */}
            <div className="form-section mb-4 p-3 border rounded">
              <h5 className="section-title mb-3 text-primary">معلومات الفاتورة</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">قيمة الفاتورة</label>
                  <input
                    type="number"
                    className={`form-control ${errors.BillAmount ? "is-invalid" : ""}`}
                    name="BillAmount"
                    value={formData.BillAmount}
                    onChange={handleChange}
                    placeholder="قيمة الفاتورة"
                  />
                  {errors.BillAmount && (
                    <div className="invalid-feedback">{errors.BillAmount}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">الاستهلاك (كيلو وات/ساعة)</label>
                  <input
                    type="number"
                    className={`form-control ${errors.Consumption ? "is-invalid" : ""}`}
                    name="Consumption"
                    value={formData.Consumption}
                    onChange={handleChange}
                    placeholder="الاستهلاك"
                  />
                  {errors.Consumption && (
                    <div className="invalid-feedback">{errors.Consumption}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">شهر الفاتورة</label>
                  <select
                    className={`form-select ${errors.BillMonth ? "is-invalid" : ""}`}
                    name="BillMonth"
                    value={formData.BillMonth}
                    onChange={handleSelectChange}
                  >
                    <option value="">اختر الشهر</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  {errors.BillMonth && (
                    <div className="invalid-feedback">{errors.BillMonth}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">سنة الفاتورة</label>
                  <input
                    type="number"
                    className={`form-control ${errors.BillYear ? "is-invalid" : ""}`}
                    name="BillYear"
                    value={formData.BillYear}
                    onChange={handleChange}
                    placeholder="السنة"
                  />
                  {errors.BillYear && (
                    <div className="invalid-feedback">{errors.BillYear}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">عدد أيام دورة الفاتورة</label>
                  <input
                    type="number"
                    className={`form-control ${errors.DaysInBillingCycle ? "is-invalid" : ""}`}
                    name="DaysInBillingCycle"
                    value={formData.DaysInBillingCycle}
                    onChange={handleChange}
                    placeholder="عدد الأيام"
                  />
                  {errors.DaysInBillingCycle && (
                    <div className="invalid-feedback">{errors.DaysInBillingCycle}</div>
                  )}
                </div>
              </div>
            </div>

            {/* معلومات التكييف */}
            <div className="form-section mb-4 p-3 border rounded">
              <h5 className="section-title mb-3 text-primary">معلومات التكييف</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">عدد أجهزة التكييف</label>
                  <input
                    type="number"
                    className={`form-control ${errors.NumberOfAirConditioners ? "is-invalid" : ""}`}
                    name="NumberOfAirConditioners"
                    value={formData.NumberOfAirConditioners}
                    onChange={handleChange}
                    placeholder="عدد أجهزة التكييف"
                  />
                  {errors.NumberOfAirConditioners && (
                    <div className="invalid-feedback">{errors.NumberOfAirConditioners}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">ساعات التشغيل</label>
                  <input
                    type="number"
                    className={`form-control ${errors.AirConditionerUsageHours ? "is-invalid" : ""}`}
                    name="AirConditionerUsageHours"
                    value={formData.AirConditionerUsageHours}
                    onChange={handleChange}
                    placeholder="ساعات التشغيل"
                  />
                  {errors.AirConditionerUsageHours && (
                    <div className="invalid-feedback">{errors.AirConditionerUsageHours}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">نوع التكييف</label>
                  <select
                    className={`form-select ${errors.AirConditionerType ? "is-invalid" : ""}`}
                    name="AirConditionerType"
                    value={formData.AirConditionerType}
                    onChange={handleSelectChange}
                  >
                    <option value="">اختر النوع</option>
                    <option value="Central">مركزي</option>
                    <option value="Split">سبليت</option>
                    <option value="Window">نافذة</option>
                  </select>
                  {errors.AirConditionerType && (
                    <div className="invalid-feedback">{errors.AirConditionerType}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="electricity-consumption-form mt-4">
            {/* معلومات الإضاءة */}
            <div className="form-section mb-4 p-3 border rounded">
              <h5 className="section-title mb-3 text-primary">معلومات الإضاءة</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">عدد اللمبات</label>
                  <input
                    type="number"
                    className={`form-control ${errors.NumberOfLights ? "is-invalid" : ""}`}
                    name="NumberOfLights"
                    value={formData.NumberOfLights}
                    onChange={handleChange}
                    placeholder="عدد اللمبات"
                  />
                  {errors.NumberOfLights && (
                    <div className="invalid-feedback">{errors.NumberOfLights}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">نوع الإضاءة</label>
                  <select
                    className={`form-select ${errors.LightType ? "is-invalid" : ""}`}
                    name="LightType"
                    value={formData.LightType}
                    onChange={handleSelectChange}
                  >
                    <option value="">اختر النوع</option>
                    <option value="LED">LED</option>
                    <option value="CFL">CFL</option>
                    <option value="Incandescent">تقليدي</option>
                  </select>
                  {errors.LightType && (
                    <div className="invalid-feedback">{errors.LightType}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">ساعات التشغيل</label>
                  <input
                    type="number"
                    className={`form-control ${errors.LightUsageHours ? "is-invalid" : ""}`}
                    name="LightUsageHours"
                    value={formData.LightUsageHours}
                    onChange={handleChange}
                    placeholder="ساعات التشغيل"
                  />
                  {errors.LightUsageHours && (
                    <div className="invalid-feedback">{errors.LightUsageHours}</div>
                  )}
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="form-section mb-4 p-3 border rounded">
              <h5 className="section-title mb-3 text-primary">معلومات إضافية</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">عدد الأجهزة الكبرى</label>
                  <input
                    type="number"
                    className={`form-control ${errors.OtherMajorAppliances_Count ? "is-invalid" : ""}`}
                    name="OtherMajorAppliances_Count"
                    value={formData.OtherMajorAppliances_Count}
                    onChange={handleChange}
                    placeholder="عدد الأجهزة"
                  />
                  {errors.OtherMajorAppliances_Count && (
                    <div className="invalid-feedback">{errors.OtherMajorAppliances_Count}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">حجم الأسرة</label>
                  <input
                    type="number"
                    className={`form-control ${errors.HouseholdSize ? "is-invalid" : ""}`}
                    name="HouseholdSize"
                    value={formData.HouseholdSize}
                    onChange={handleChange}
                    placeholder="حجم الأسرة"
                  />
                  {errors.HouseholdSize && (
                    <div className="invalid-feedback">{errors.HouseholdSize}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">نوع المنزل</label>
                  <select
                    className={`form-select ${errors.HomeType_Encoded ? "is-invalid" : ""}`}
                    name="HomeType_Encoded"
                    value={formData.HomeType_Encoded}
                    onChange={handleSelectChange}
                  >
                    <option value="">اختر النوع</option>
                    <option value="Villa">فيلا</option>
                    <option value="Apartment">شقة</option>
                    <option value="Duplex">دوبلكس</option>
                  </select>
                  {errors.HomeType_Encoded && (
                    <div className="invalid-feedback">{errors.HomeType_Encoded}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">نمط الاستهلاك</label>
                  <select
                    className={`form-select ${errors.ConsumptionTrend ? "is-invalid" : ""}`}
                    name="ConsumptionTrend"
                    value={formData.ConsumptionTrend}
                    onChange={handleSelectChange}
                  >
                    <option value="">اختر النمط</option>
                    <option value="Increasing">متزايد</option>
                    <option value="Decreasing">متناقص</option>
                    <option value="Stable">مستقر</option>
                  </select>
                  {errors.ConsumptionTrend && (
                    <div className="invalid-feedback">{errors.ConsumptionTrend}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">نمط الاستهلاك الموسمي</label>
                  <select
                    className={`form-select ${errors.SeasonalConsumptionPattern ? "is-invalid" : ""}`}
                    name="SeasonalConsumptionPattern"
                    value={formData.SeasonalConsumptionPattern}
                    onChange={handleSelectChange}
                  >
                    <option value="">اختر النمط</option>
                    <option value="HigherThanUsual">أعلى من المعتاد</option>
                    <option value="LowerThanUsual">أقل من المعتاد</option>
                    <option value="Normal">طبيعي</option>
                  </select>
                  {errors.SeasonalConsumptionPattern && (
                    <div className="invalid-feedback">{errors.SeasonalConsumptionPattern}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="review-section mt-4">
            <h4 className="mb-4 text-center">مراجعة البيانات</h4>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">ملخص البيانات المدخلة</h5>
                <div className="row">
                  <div className="col-md-6">
                    <strong>قيمة الفاتورة:</strong> {formData.BillAmount || "غير محدد"}
                  </div>
                  <div className="col-md-6">
                    <strong>الاستهلاك:</strong> {formData.Consumption || "غير محدد"}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <strong>شهر الفاتورة:</strong> {formData.BillMonth || "غير محدد"}
                  </div>
                  <div className="col-md-6">
                    <strong>سنة الفاتورة:</strong> {formData.BillYear || "غير محدد"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-3">
        {/* هنا ممكن تضيفي الـ Steppar والـ NavigationButtons */}
        <div className="d-flex justify-content-between mb-3">
          <button 
            className="btn btn-secondary"
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 1 || !user}
          >
            السابق
          </button>
          <span>الخطوة {activeStep} من 3</span>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={activeStep === 3 || !user}
          >
            التالي
          </button>
        </div>
      </div>

      {renderStepContent()}

      {activeStep < 3 && user && (
        <div className="text-center mt-3">
          <button className="btn btn-primary px-4" onClick={handleNext}>
            التالي
          </button>
        </div>
      )}

      {activeStep === 3 && (
        <div className="text-center">
          <button
            className="btn btn-success btn-lg px-4"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الاستعلام..." : "تقديم الطلب"}
          </button>
        </div>
      )}
    </>
  );
});

export default ElectricityConsumptionForm;