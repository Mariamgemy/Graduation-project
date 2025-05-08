import apiClient from "./api";

// Service functions for PaymentController endpoints

/**
 * Initiates a bill payment process.
 * Corresponds to the POST /api/Payment/initiate-payment endpoint.
 * @param {object} request - The BillPaymentRequest data.
 * @returns {Promise<object>} - The result from the API.
 */
const initiateBillPayment = async (request) => {
  try {
    const response = await apiClient.post("/Payment/initiate-payment", request);
    return response.data;
  } catch (error) {
    console.error("Error initiating bill payment:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to be handled by the calling component
  }
};

/**
 * Checks the status of a payment intent.
 * Corresponds to the GET /api/Payment/payment-status/{paymentIntentId} endpoint.
 * @param {string} paymentIntentId - The ID of the payment intent.
 * @returns {Promise<object>} - The payment status details from the API.
 */
const checkPaymentStatus = async (paymentIntentId) => {
  try {
    const response = await apiClient.get(`/Payment/payment-status/${paymentIntentId}`);
    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error
  }
};

// Note: The payment-webhook endpoint is typically called by Stripe directly,
// so a frontend service function for it is usually not needed.

export const paymentService = {
  initiateBillPayment,
  checkPaymentStatus,
};

