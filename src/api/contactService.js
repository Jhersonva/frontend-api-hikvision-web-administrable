import api from "./api";

// Obtener contacto
export const getContact = async () => {
  const response = await api.get("/contact");
  return response.data;
};

// Actualizar contacto
export const updateContact = async (payload) => {
  const response = await api.put("/contact/update", payload);
  return response.data;
};
