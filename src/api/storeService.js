// src/api/storeService.js
import api from "./api";

// Obtener configuración de la tienda
const getStore = () => {
  return api.get("/store");
};

// Actualizar configuración de la tienda
const updateStore = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  formData.append("_method", "PUT");

  return api.post("/store/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default {
  getStore,
  updateStore,
};