import api from "./api";

const getPartners = async () => {
  try {
    const res = await api.get("/partners");
    return res.data;
  } catch (error) {
    console.error("Error al obtener partners:", error);
    throw error;
  }
};

const createPartner = async (partner) => {
  try {
    const formData = new FormData();
    formData.append("name_partner", partner.name_partner);
    if (partner.img_partner) {
      formData.append("img_partner", partner.img_partner);
    }

    const res = await api.post("/partners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear partner:", error);
    throw error;
  }
};

const updatePartner = async (id, partner) => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name_partner", partner.name_partner);
    if (partner.img_partner) {
      formData.append("img_partner", partner.img_partner);
    }

    const res = await api.post(`/partners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error al actualizar partner:", error);
    throw error;
  }
};

const deletePartner = async (id) => {
  try {
    const res = await api.delete(`/partners/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar partner:", error);
    throw error;
  }
};

export default {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
};