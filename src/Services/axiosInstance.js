import axios from "axios";

const defaultConfig = {
  baseURL:"https://insta--connect.herokuapp.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
let axiosInstance = axios.create(defaultConfig);

// Set the AUTH token for all request
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export  { axiosInstance};