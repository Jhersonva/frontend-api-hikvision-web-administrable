// src/api/faqsService.js
import api from "./api";

// Obtener todas las FAQs
export const getFaqs = async () => {
  const response = await api.get("/faqs");
  return response.data;
};

// Crear una nueva FAQ
export const createFaq = async (faqData) => {
  const formData = new FormData();
  formData.append("question", faqData.question);
  formData.append("response", faqData.response);

  const response = await api.post("/faqs", formData);
  return response.data;
};

// Actualizar una FAQ
export const updateFaq = async (id, faqData) => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("question", faqData.question);
  formData.append("response", faqData.response);

  const response = await api.post(`/faqs/${id}`, formData);
  return response.data;
};

// Eliminar una FAQ
export const deleteFaq = async (id) => {
  const response = await api.delete(`/faqs/${id}`);
  return response.data;
};