import api from "./api";

// ✅ Obtener información principal
export const getAboutUs = async () => {
  const { data } = await api.get("/about-us");
  return data;
};

// ✅ Actualizar información principal (incluyendo imagen con form-data)
export const updateAboutUs = async (formData) => {
  formData.append("_method", "PUT");
  const { data } = await api.post("/about-us/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Obtener lista de items
export const getAboutUsList = async () => {
  const { data } = await api.get("/about-us/list");
  return data;
};

// ✅ Agregar item
export const addAboutUsItem = async (item) => {
  const { data } = await api.post("/about-us/list", { item });
  return data;
};

// ✅ Actualizar item por índice
export const updateAboutUsItem = async (index, item) => {
  const { data } = await api.put(`/about-us/list/${index}`, { item });
  return data;
};

// ✅ Eliminar item
export const deleteAboutUsItem = async (index) => {
  const { data } = await api.delete(`/about-us/list/${index}`);
  return data;
};
