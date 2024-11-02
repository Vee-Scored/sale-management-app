// src/services/axios.js (or src/utils/axios.js)
import axios from 'axios';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: 'https://voucher-app-auth-api.ygnsh.com/api/v1', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
    Accept : "application/json"
  },
});

// You can add interceptors here if needed, for example:
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config before sending the request, like adding auth tokens
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response.status === 401) {
      // Handle unauthorized errors, like redirecting to login
      console.log('Unauthorized, redirecting...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
