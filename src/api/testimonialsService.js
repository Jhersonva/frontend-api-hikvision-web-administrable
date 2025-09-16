// src/api/testimonialsService.js
import api from "./api"; 

// Obtener todos los testimonios
export const getTestimonials = async () => {
  const response = await api.get("/testimonials");
  return response.data;
};

// Crear un nuevo testimonio
export const createTestimonial = async (data) => {
  const response = await api.post("/testimonials", data);
  return response.data;
};

// Actualizar testimonio
export const updateTestimonial = async (id, data) => {
  // Se usa _method para PUT
  data.append("_method", "PUT");
  const response = await api.post(`/testimonials/${id}`, data);
  return response.data;
};

// Eliminar testimonio
export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/testimonials/${id}`);
  return response.data;
};