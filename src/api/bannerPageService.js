import api from "./api";

// Obtener todos los banners
export const getBannerPages = async () => {
  try {
    const response = await api.get("/banner-pages");
    return response.data;
  } catch (error) {
    console.error("Error fetching banner pages:", error);
    throw error;
  }
};

// Actualizar un banner (ya recibe un FormData listo)
export const updateBannerPage = async (id, formData) => {
  try {
    const response = await api.post(`/banner-pages/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating banner page:", error);
    throw error;
  }
};
