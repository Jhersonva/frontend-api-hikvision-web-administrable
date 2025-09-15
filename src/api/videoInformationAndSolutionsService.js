import api from "./api";

// Obtener información de VideoInformationAndSolutions
export const getVideoInfo = async () => {
  const { data } = await api.get("/video-information-and-solution");
  return data;
};

// Actualizar VideoInformationAndSolutions (form-data con _method=PUT)
export const updateVideoInfo = async (formData) => {
  formData.append("_method", "PUT");
  const { data } = await api.post(
    "/video-information-and-solution/update",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};