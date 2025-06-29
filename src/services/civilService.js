import apiClient from "./api";
import { API_CONFIG } from "../api/config";

/**
 * Submits a civil service request
 * @param {object} request - The civil service request data matching backend object structure
 * @returns {Promise<object>} - The result from the API
 */
const submitCivilServiceRequest = async (request) => {
  try {
    console.log("Submitting civil service request:", request);

    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.CIVIL.SUBMIT_REQUEST,
      request
    );

    console.log("Civil service response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting civil service request:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

/**
 * Gets civil service types
 * @returns {Promise<object>} - Available civil service types
 */
const getCivilServiceTypes = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CIVIL.GET_TYPES);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching civil service types:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

/**
 * Gets user's civil service requests
 * @returns {Promise<object>} - User's civil service requests
 */
const getUserCivilRequests = async () => {
  try {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.CIVIL.GET_USER_REQUESTS
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user civil requests:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const civilService = {
  submitCivilServiceRequest,
  getCivilServiceTypes,
  getUserCivilRequests,
};
