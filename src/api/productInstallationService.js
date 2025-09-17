import api from "./api";

// -------- PRODUCT INSTALLATION --------

// Obtener instalación de un producto
export const getProductInstallation = (productId) => {
  return api.get(`/products/${productId}/installation`);
};

// Crear instalación (si no existe)
export const createProductInstallation = (productId, data) => {
  return api.post(`/products/${productId}/installation`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar instalación (si existe)
export const updateProductInstallation = (productId, data) => {
  const formData = new FormData();

  // Solo agregar la descripción si existe y no es undefined
  if (data.description_product_installation !== undefined) {
    formData.append("description_product_installation", data.description_product_installation);
  }

  // Solo agregar la imagen si es un File (nuevo upload)
  if (data.img_product_installation instanceof File) {
    formData.append("img_product_installation", data.img_product_installation);
  }

  formData.append("_method", "PUT");

  return api.post(`/products/${productId}/installation`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


// -------- WHAT INCLUDES --------

// Listar WhatIncludes
export const getWhatIncludes = (productId) => {
  return api.get(`/products/${productId}/installation/what-includes`);
};

// Agregar item
export const addWhatInclude = (productId, item) => {
  return api.post(`/products/${productId}/installation/what-includes`, { item });
};

// Actualizar item
export const updateWhatInclude = (productId, index, item) => {
  return api.put(`/products/${productId}/installation/what-includes/${index}`, { item });
};

// Eliminar item
export const deleteWhatInclude = (productId, index) => {
  return api.delete(`/products/${productId}/installation/what-includes/${index}`);
};