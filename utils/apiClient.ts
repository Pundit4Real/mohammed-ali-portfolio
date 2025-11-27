import axios, { AxiosRequestConfig } from "axios";

// Base URL
const baseURL = process.env.NEXT_PUBLIC_BE_URL;

// Default headers
const defaultHeaders = {
  json: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  form: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};

// Create axios instance
const apiClient = axios.create({
  baseURL,
  timeout: 200000,
});

// Create server-side client
export const serverApiClient = axios.create({
  baseURL,
  timeout: 200000,
});

// Interceptor - ONLY SET DEFAULT HEADERS
apiClient.interceptors.request.use((request) => {
  if (!request.headers["Content-Type"]) {
    const contentType =
      request.data instanceof FormData ? "form" : "json";

    Object.entries(defaultHeaders[contentType]).forEach(([key, value]) => {
      request.headers[key] = value;
    });
  }
  return request;
});

// Same for server side
serverApiClient.interceptors.request.use((request) => {
  if (!request.headers["Content-Type"]) {
    const contentType =
      request.data instanceof FormData ? "form" : "json";

    Object.entries(defaultHeaders[contentType]).forEach(([key, value]) => {
      request.headers[key] = value;
    });
  }
  return request;
});

// No refresh token logic, no auth checking

// Helper request function
export const request = async (config: AxiosRequestConfig) => {
  return apiClient.request(config);
};

export default apiClient;