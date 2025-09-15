// src/api/counterServiceMainImageService.js
import API from "./api";

// Obtener la imagen principal
export async function getCounterServiceMainImage() {
  const { data } = await API.get("/counter-service-main-image");
  return data;
}

// Actualizar la imagen principal
export async function updateCounterServiceMainImage(formData) {
  formData.append("_method", "PUT");
  const { data } = await API.post("/counter-service-main-image/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}