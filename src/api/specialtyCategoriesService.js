// src/api/specialtyCategoriesService.js
import api from "./api.js";

// Obtener todas las especialidades
export const getSpecialtyCategories = async () => {
  const { data } = await api.get("/specialty-categories");
  return data;
};

// Crear nueva especialidad
export const createSpecialtyCategory = async (specialty) => {
  const { data } = await api.post("/specialty-categories", specialty);
  return data;
};

// Actualizar especialidad
export const updateSpecialtyCategory = async (id, specialty) => {
  const { data } = await api.put(`/specialty-categories/${id}`, specialty);
  return data;
};

// Eliminar especialidad
export const deleteSpecialtyCategory = async (id) => {
  const { data } = await api.delete(`/specialty-categories/${id}`);
  return data;
};