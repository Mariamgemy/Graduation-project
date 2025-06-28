import apiClient from "./api";

/**
 * Submits a civil service request
 * @param {object} request - The civil service request data
 * @returns {Promise<object>} - The result from the API
 */
const submitCivilServiceRequest = async (request) => {
  try {
    const response = await apiClient.post("/CivilServices/submit", request);
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
    const response = await apiClient.get("/CivilServices/types");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching civil service types:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const civilService = {
  submitCivilServiceRequest,
  getCivilServiceTypes,
};
