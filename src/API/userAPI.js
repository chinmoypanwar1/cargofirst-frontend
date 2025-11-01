import apiClient from "./axiosInstance";

export const signupUser = async (formData) => {
  try {
    const response = await apiClient.post('/users/register', {
        fullname: formData.fullName,
        email: formData.email,
        password: formData.password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await apiClient.post('/users/login', {
        email: formData.email,
        password: formData.password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
};

export const getUserDetails = async () => {
  try {
    const response = await apiClient.get("/users/getUser");
    console.log("user details : ", response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user details");
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post("/users/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

