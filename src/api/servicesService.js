// src/services/servicesService.js
import API from "./api";

export default {
  // Obtener todos los servicios
  async getServices() {
    const { data } = await API.get("/services");
    return data;
  },

  // Crear servicio
  async createService(formData) {
    const { data } = await API.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  // Actualizar servicio
  async updateService(id, formData) {
    formData.append("_method", "PUT");
    const { data } = await API.post(`/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  // Eliminar servicio
  async deleteService(id) {
    const { data } = await API.delete(`/services/${id}`);
    return data;
  },
};