import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/images";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CRUD de imágenes
export const getImages = () => api.get("/"); // obtiene todas las imágenes
export const createImage = (payload) => api.post("/", payload); // crear imagen
export const deleteImage = (id) => api.delete(`/${id}`); // eliminar imagen
