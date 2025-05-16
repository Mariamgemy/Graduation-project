import React from 'react'

function Phone() {
  return (
    <div>
  {/* const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    } */}
<div className="mb-3">
                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
      
    </div>
  )
}

export default Phone