import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
  withCredentials: true, // Include cookies (if needed)
});

export default api;