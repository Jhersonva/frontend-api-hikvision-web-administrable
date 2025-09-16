// api/paymentPlanService.js
import api from "./api";

const ENDPOINT = "/payment-plans";

export default {
  async getAll() {
    const response = await api.get(ENDPOINT);
    return response.data;
  },

  async create(plan) {
    if (plan.icon_img_payment_plan instanceof File) {
      const formData = new FormData();
      formData.append("name_plan", plan.name_plan);
      formData.append("price_plan", plan.price_plan);
      plan.list_plan.forEach(item => formData.append("list_plan[]", item));
      formData.append("icon_img_payment_plan", plan.icon_img_payment_plan);

      const response = await api.post(ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }

    const response = await api.post(ENDPOINT, plan);
    return response.data;
  },

  async update(id, plan) {
    if (plan.icon_img_payment_plan instanceof File) {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name_plan", plan.name_plan);
      formData.append("price_plan", plan.price_plan);
      plan.list_plan.forEach(item => formData.append("list_plan[]", item));
      formData.append("icon_img_payment_plan", plan.icon_img_payment_plan);

      const response = await api.post(`${ENDPOINT}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }

    const response = await api.put(`${ENDPOINT}/${id}`, plan);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  },
};