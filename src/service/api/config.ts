import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  async get<T>(url: string) {
    const response = await api.get<T>(url);
    return response.data;
  },

  async post<T, D = unknown>(url: string, data: D) {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  async put<T, D = unknown>(url: string, data: D) {
    const response = await api.put<T>(url, data);
    return response.data;
  },

  async delete<T>(url: string) {
    const response = await api.delete<T>(url);
    return response.data;
  }
};
