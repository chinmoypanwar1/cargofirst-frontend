import apiClient from "./axiosInstance";

export const postJobAPI = async (formData) => {
  try {
    const response = await apiClient.post("/jobs/postJob", {
      title: formData.title,
      description: formData.description,
      lastDate: formData.lastDate,
      companyName: formData.companyName,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to post job");
  }
};

// Get all jobs posted by the authenticated user
export const getJobsAPI = async () => {
  try {
    const response = await apiClient.get("/jobs/allJob");
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};

