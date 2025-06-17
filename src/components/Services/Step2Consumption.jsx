import "./UtilityServices.css"
import { Form } from "react-bootstrap"
import Line from "../Line"

function Step2({ formData, errors, handleChange }) {
    return(
        <>
      

    {/* Lighting Information Section */}
    <div className="form-section-custom mb-5 p-4 border rounded-3">
      <h5 className=" mb-4 text-clor text-center fw-bold">
        معلومات الإضاءة
      </h5>
      <Line/>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Group>
            <Form.Label>عدد اللمبات</Form.Label>
            <Form.Control
              type="number"
              name="NumberOfLights"
              value={formData.NumberOfLights}
              onChange={handleChange}
              className={`custom-input ${
                errors.NumberOfLights ? "is-invalid" : ""
              }`}
              placeholder="عدد اللمبات"
            />
            {errors.NumberOfLights && (
              <Form.Control.Feedback type="invalid">
                {errors.NumberOfLights}
              </Form.Control.Feedback>
            )}
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
              className={`custom-input ${
                errors.LightUsageHours ? "is-invalid" : ""
              }`}
              placeholder="ساعات التشغيل"
            />
            {errors.LightUsageHours && (
              <Form.Control.Feedback type="invalid">
                {errors.LightUsageHours}
              </Form.Control.Feedback>
            )}
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
              className={`custom-select-style custom-input ${
                errors.LightType ? "is-invalid" : ""
              }`}
            >
              <option value="">اختر النوع</option>
              <option value="LED">LED</option>
              <option value="CFL">CFL</option>
              <option value="Incandescent">تقليدي</option>
              <option value="Fluorescent">فلورسنت</option>
            </Form.Select>
            {errors.LightType && (
              <Form.Control.Feedback type="invalid">
                {errors.LightType}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>
    </div>

    {/* Other Appliances & Trends Section */}
    <div className="form-section-custom mb-5 p-4 border rounded-3">
      <h5 className=" mb-4 text-clor text-center fw-bold">
        أجهزة أخرى وأنماط الاستهلاك
      </h5>
      <Line/>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Group>
            <Form.Label>عدد الأجهزة الكبرى الأخرى</Form.Label>
            <Form.Control
              type="number"
              name="OtherMajorAppliances_Count"
              value={formData.OtherMajorAppliances_Count}
              onChange={handleChange}
              className={`custom-input ${
                errors.OtherMajorAppliances_Count ? "is-invalid" : ""
              }`}
              placeholder="عدد الأجهزة"
            />
            {errors.OtherMajorAppliances_Count && (
              <Form.Control.Feedback type="invalid">
                {errors.OtherMajorAppliances_Count}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <div className="col-md-6 mb-3">
          <Form.Group>
            <Form.Label>نمط الاستهلاك</Form.Label>
            <Form.Select
              name="ConsumptionTrend"
              value={formData.ConsumptionTrend}
              onChange={handleChange}
              className={`custom-select-style custom-input ${
                errors.ConsumptionTrend ? "is-invalid" : ""
              }`}
            >
              <option value="">اختر النمط</option>
              <option value="Increasing">متزايد</option>
              <option value="Decreasing">متناقص</option>
              <option value="Stable">مستقر</option>
            </Form.Select>
            {errors.ConsumptionTrend && (
              <Form.Control.Feedback type="invalid">
                {errors.ConsumptionTrend}
              </Form.Control.Feedback>
            )}
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
              className={`custom-select-style custom-input ${
                errors.SeasonalConsumptionPattern ? "is-invalid" : ""
              }`}
            >
              <option value="">اختر النمط</option>
              <option value="HigherThanUsual">أعلى من المعتاد</option>
              <option value="LowerThanUsual">أقل من المعتاد</option>
              <option value="Normal">طبيعي</option>
            </Form.Select>
            {errors.SeasonalConsumptionPattern && (
              <Form.Control.Feedback type="invalid">
                {errors.SeasonalConsumptionPattern}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>
    </div>
    
  </>

    )
}
  export default Step2