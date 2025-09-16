import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/features";

const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para siempre enviar el token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getFeatures = async () => {
  const { data } = await api.get("/");
  return data;
};

export const createFeature = async (formData) => {
  const { data } = await api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateFeature = async (id, formData) => {
  formData.append("_method", "PUT");
  const { data } = await api.post(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteFeature = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};
