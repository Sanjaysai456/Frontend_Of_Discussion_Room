// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to your actual baseURL
});

// Add the token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
