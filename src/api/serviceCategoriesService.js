// src/services/servicesCategoriesService.js
import api from "./api";

// Obtener todas las categorías
export const getServiceCategories = async () => {
  const { data } = await api.get("/service-categories");
  return data;
};

// Crear categoría
export const createServiceCategory = async (formData) => {
  const { data } = await api.post("/service-categories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Actualizar categoría
export const updateServiceCategory = async (id, formData) => {
  formData.append("_method", "PUT");
  const { data } = await api.post(`/service-categories/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Eliminar categoría
export const deleteServiceCategory = async (id) => {
  const { data } = await api.delete(`/service-categories/${id}`);
  return data;
};