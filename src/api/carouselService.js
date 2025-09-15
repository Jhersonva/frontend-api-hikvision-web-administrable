// services/carouselService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/carousels";

// Traemos el token desde localStorage (puedes ajustarlo según tu flujo de auth)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

// Obtener todos los carousels
export const getCarousels = async () => {
  const res = await axios.get(API_URL, getAuthHeaders());
  return res.data;
};

// Crear un nuevo carousel
export const createCarousel = async (formData) => {
  const res = await axios.post(API_URL, formData, getAuthHeaders());
  return res.data;
};

// Actualizar un carousel
export const updateCarousel = async (id, formData) => {
  formData.append("_method", "PUT"); // Laravel requiere esto
  const res = await axios.post(`${API_URL}/${id}`, formData, getAuthHeaders());
  return res.data;
};

// Eliminar un carousel
export const deleteCarousel = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return res.data;
};