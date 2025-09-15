// src/services/informationContactService.js
import api from "./api"; 

const API_URL = "/information-contact";

export const getInformationContact = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de contacto", error);
    throw error;
  }
};

export const updateInformationContact = async (formData) => {
  try {
    const response = await api.post(`${API_URL}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información de contacto", error);
    throw error;
  }
};
