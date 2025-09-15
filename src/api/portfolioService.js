import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/portfolios";

// Obtiene el token desde localStorage (ajusta si lo guardas en otro lado)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default {
  async getPortfolios() {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },

  async createPortfolio(formData) {
    const response = await axios.post(API_URL, formData, getAuthHeader());
    return response.data;
  },

  async updatePortfolio(id, formData) {
    formData.append("_method", "PUT");
    const response = await axios.post(`${API_URL}/${id}`, formData, getAuthHeader());
    return response.data;
  },

  async deletePortfolio(id) {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  },
};