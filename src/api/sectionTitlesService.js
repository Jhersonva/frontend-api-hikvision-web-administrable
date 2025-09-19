// src/api/sectionTitlesService.js
import api from "./api";

export default {
  // Obtener todos los títulos de sección
  getAll() {
    return api.get("/section-titles");
  },

  // Obtener un título específico por ID
  getById(id) {
    return api.get(`/section-titles/${id}`);
  },

  // Actualizar un título de sección
  update(id, data) {
    return api.put(`/section-titles/${id}`, data);
  }
};