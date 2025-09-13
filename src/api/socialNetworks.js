import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/social-networks";

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

export const getSocialNetworks = () => api.get("/");
export const createSocialNetwork = (formData) =>
  api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateSocialNetwork = (id, formData) =>
  api.post(`/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteSocialNetwork = (id) => api.delete(`/${id}`);
