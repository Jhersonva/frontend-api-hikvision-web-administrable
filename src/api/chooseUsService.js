import api from "./api";

const ENDPOINT = "/choose-us";

export default {
  // Obtener toda la información
  async getInfo() {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
  },

  // Actualizar toda la información (incluye imágenes)
  async update(data) {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("main_title", data.main_title);
    formData.append("description", data.description);
    formData.append("note", data.note);

    formData.append("list_choose_us", JSON.stringify(data.list_choose_us || []));
    formData.append("note_list", JSON.stringify(data.note_list || []));

    if (data.icon_img_choose_us instanceof File) {
      formData.append("icon_img_choose_us", data.icon_img_choose_us);
    }
    if (data.img_choose_us instanceof File) {
      formData.append("img_choose_us", data.img_choose_us);
    }

    const response = await api.post(`${ENDPOINT}/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // CRUD lista Choose Us
  async getList() {
    const response = await api.get(`${ENDPOINT}/list`);
    return response.data;
  },
  async addListItem(item) {
    const response = await api.post(`${ENDPOINT}/list`, { item });
    return response.data;
  },
  async updateListItem(index, item) {
    const response = await api.put(`${ENDPOINT}/list/${index}`, { item });
    return response.data;
  },
  async deleteListItem(index) {
    const response = await api.delete(`${ENDPOINT}/list/${index}`);
    return response.data;
  },

  // CRUD note_list
  async getNoteList() {
    const response = await api.get(`${ENDPOINT}/note-list`);
    return response.data;
  },
  async addNoteItem(item) {
    const response = await api.post(`${ENDPOINT}/note-list`, { item });
    return response.data;
  },
  async updateNoteItem(index, item) {
    const response = await api.put(`${ENDPOINT}/note-list/${index}`, { item });
    return response.data;
  },
  async deleteNoteItem(index) {
    const response = await api.delete(`${ENDPOINT}/note-list/${index}`);
    return response.data;
  },
};
