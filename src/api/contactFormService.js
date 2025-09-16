import api from "./api";

// Obtener todos los formularios de contacto
export const getContactForms = async () => {
  try {
    const { data } = await api.get("/contact-forms");
    return data;
  } catch (error) {
    console.error("Error al obtener formularios de contacto:", error);
    throw error;
  }
};

// Eliminar un formulario de contacto
export const deleteContactForm = async (id) => {
  try {
    const { data } = await api.delete(`/contact-forms/${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar formulario:", error);
    throw error;
  }
};