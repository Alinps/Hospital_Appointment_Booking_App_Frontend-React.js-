import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Optional: add token automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Token ${user.token}`;
  }

  return config;
});

export default API;