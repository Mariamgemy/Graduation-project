import apiClient from "./api";
import { API_CONFIG } from "../api/config";

// Service functions for BillsController endpoints

/**
 * Registers a new meter.
 * Corresponds to the POST /api/Bills/register-meter endpoint.
 * @param {object} request - The RegisterMeterDto data (e.g., { customerId, meterNumber, type, installationDate }).
 * @returns {Promise<object>} - The result from the API, including the registered meter details.
 */
const registerMeter = async (request) => {
  try {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.UTILITY.REGISTER_METER,
      request
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error registering meter:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error
  }
};

/**
 * Generates a bill and initiates the payment process.
 * Corresponds to the POST /api/Bills/generate-and-pay endpoint.
 * @param {object} request - The GenerateBillRequestDto data (e.g., { customerId, meterId, usage, billType }).
 * @returns {Promise<object>} - The result from the API, including bill details and Stripe payment intent info.
 */
const generateAndPayBill = async (request) => {
  try {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.UTILITY.GENERATE_AND_PAY,
      request
    );
    return response.data; // Contains { Success, BillNumber, Amount, PaymentIntentId, ClientSecret, Message }
  } catch (error) {
    console.error(
      "Error generating and paying bill:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error
  }
};

export const billingService = {
  registerMeter,
  generateAndPayBill,
};
