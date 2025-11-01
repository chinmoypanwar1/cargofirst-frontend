import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cargofirst-backend.vercel.app/api",
  withCredentials: true,
});

export default apiClient;
