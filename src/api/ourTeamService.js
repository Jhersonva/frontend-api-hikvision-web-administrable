// src/api/ourTeamService.js
import api from "./api";

export const getOurTeam = async () => {
  try {
    const response = await api.get("/our-team");
    return response.data;
  } catch (error) {
    console.error("Error fetching Our Team:", error);
    throw error;
  }
};

export const createOurTeamMember = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name_employee", data.name_employee);
    formData.append("id_specialty_category", data.specialty_category_id);
    formData.append("contact_value_whatsapp", data.whatsapp); // 👈 directo
    formData.append("contact_value_celular", data.celular);   // 👈 directo

    if (data.img_our_team instanceof File) {
      formData.append("img_our_team", data.img_our_team);
    }

    const response = await api.post("/our-team", formData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating team member:", error.response?.data || error);
    throw error;
  }
};

export const updateOurTeamMember = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name_employee", data.name_employee);
    formData.append("id_specialty_category", data.specialty_category_id);
    formData.append("contact_value_whatsapp", data.whatsapp);
    formData.append("contact_value_celular", data.celular);

    if (data.img_our_team instanceof File) {
      formData.append("img_our_team", data.img_our_team);
    }

    const response = await api.post(`/our-team/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating team member:", error.response?.data || error);
    throw error;
  }
};

export const deleteOurTeamMember = async (id) => {
  try {
    const response = await api.delete(`/our-team/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting team member:", error);
    throw error;
  }
};
