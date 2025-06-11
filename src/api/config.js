// Base URL for API requests
export const API_BASE_URL =
  "https://government-c8bqb5c6gwfnf2h8.canadacentral-01.azurewebsites.net/api";
  

// API Configuration
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    UTILITY: {
      GENERATE_AND_PAY: "/bills/generate-and-pay",
      REGISTER_METER: "/bills/register-meter",
    },
    PAYMENT: {
      INITIATE: "/Payment/initiate-payment",
      STATUS: "/Payment/payment-status",
    },
  },
};

// API Headers
export const getHeaders = () => ({
  "Content-Type": "application/json",
  // Add any additional headers here (e.g., Authorization)
});

// Error messages
export const ERROR_MESSAGES = {
  GENERAL_ERROR: "حدث خطأ غير متوقع",
  NETWORK_ERROR: "خطأ في الاتصال بالخادم",
  VALIDATION_ERROR: "البيانات المدخلة غير صحيحة",
  AUTH_ERROR: "خطأ في المصادقة",
};
