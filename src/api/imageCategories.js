// src/api/imageCategories.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/image-categories";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CRUD
export const getImageCategories = () => api.get("/");
export const createImageCategory = (payload) => api.post("/", payload);
export const updateImageCategory = (id, payload) =>
  api.put(`/${id}`, payload);
export const deleteImageCategory = (id) => api.delete(`/${id}`);
