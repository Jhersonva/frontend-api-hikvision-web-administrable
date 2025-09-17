// src/api/productDetailService.js
import api from "./api";

// -------- PRODUCT DETAIL --------

// Obtener detalle de un producto
export const getProductDetail = (productId) => {
  return api.get(`/products/${productId}/detail`);
};

// Crear ProductDetail
export const createProductDetail = (productId, data) => {
  return api.post(`/products/${productId}/detail`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar ProductDetail (con _method=PUT)
export const updateProductDetail = (detailId, formData) => {
  formData.append("_method", "PUT");
  return api.post(`/products/${detailId}/detail`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// -------- WHAT INCLUDES --------

// Listar WhatIncludes
export const getWhatIncludes = (productId) => {
  return api.get(`/products/${productId}/detail/what-includes`);
};

// Crear WhatIncludes
export const addWhatInclude = (productId, item) => {
  return api.post(`/products/${productId}/detail/what-includes`, { item });
};

// Actualizar WhatIncludes
export const updateWhatInclude = (productId, index, item) => {
  return api.put(`/products/${productId}/detail/what-includes/${index}`, { item });
};

// Eliminar WhatIncludes
export const deleteWhatInclude = (productId, index) => {
  return api.delete(`/products/${productId}/detail/what-includes/${index}`);
};