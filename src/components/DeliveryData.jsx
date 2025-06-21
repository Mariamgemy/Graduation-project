import React from 'react'
import { Alert } from 'react-bootstrap'

function DeliveryData() {
      // بيانات الاستلام
      const [errors, setErrors] = useState({});
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    NID: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    governorate: "",
    city: "",
    district: "",
    detailedAddress: "",
  });


  const isValidGovernorate = (governorate) => {
    const governorateRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return governorateRegex.test(governorate);
  };

  const isValidCity = (city) => {
    const cityRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return cityRegex.test(city);
  };

  const isValidDistrict = (district) => {
    const districtRegex = /^[\u0621-\u064A\u066E-\u06D3\s]{3,}$/;
    return districtRegex.test(district);
  };

  const isValidDetailedAddress = (address) => {
    return address.length >= 10;
  };


  
  return (
    <div>
          <div className="mt-3 p-3">
            <h3 className="text-color mb-3">بيانات الاستلام</h3>
            <Alert variant="secondary" className="mb-4">
              <p className="mb-0">
                💡 يرجى إدخال بيانات الاستلام بشكل صحيح لتسهيل عملية توصيل
                الوثيقة
              </p>
            </Alert>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">المحافظة</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.governorate ? "is-invalid" : ""
                    }`}
                    name="governorate"
                    autoComplete="address-level1"
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                  />
                  {errors.governorate && (
                    <div className="text-danger">{errors.governorate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">المدينة</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    name="city"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <div className="text-danger">{errors.city}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">الحي / المركز</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${
                      errors.district ? "is-invalid" : ""
                    }`}
                    name="district"
                    autoComplete="address-level3"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  {errors.district && (
                    <div className="text-danger">{errors.district}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">العنوان بالتفصيل</label>
                  <textarea
                    className={`form-control custom-input ${
                      errors.detailedAddress ? "is-invalid" : ""
                    }`}
                    name="detailedAddress"
                    autoComplete="street-address"
                    rows="3"
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                  />
                  {errors.detailedAddress && (
                    <div className="text-danger">{errors.detailedAddress}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        
    </div>
  )
}

export default DeliveryData