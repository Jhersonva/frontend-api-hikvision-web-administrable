// src/api/counterServicesService.js
import API from "./api";

export async function getCounterServices() {
  const { data } = await API.get("/counter-services");
  return data;
}

export async function updateCounterService(id, formData) {
  formData.append("_method", "PUT");
  const { data } = await API.post(`/counter-services/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
