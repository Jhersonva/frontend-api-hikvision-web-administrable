// src/api/videoInformationAndSolutionsService.js
import api from "./api";

// Obtener información de VideoInformationAndSolutions (lista de 2 registros)
export const getVideoInfo = async () => {
  const { data } = await api.get("/video-information-and-solution");
  return data;
};

// Actualizar un registro por ID (form-data con _method=PUT)
export const updateVideoInfo = async (id, formData) => {
  formData.append("_method", "PUT");
  const { data } = await api.post(
    `/video-information-and-solution/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};
