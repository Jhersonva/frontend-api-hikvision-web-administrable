import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin/contact-information-company";

// Obtiene el token desde localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getContactInformationCompany = async () => {
  const { data } = await axios.get(API_URL, getAuthHeaders());
  return data;
};

export const updateContactInformationCompany = async (form) => {
  const formData = new FormData();
  formData.append("id", form.id);
  formData.append("description_company", form.description_company);
  formData.append("address", form.address);
  formData.append("cell_phone_number", form.cell_phone_number);
  formData.append("email", form.email);
  formData.append("open_time", form.open_time);

  if (form.company_logo instanceof File) {
    formData.append("company_logo", form.company_logo);
  }

  // Laravel lo detecta como PUT
  formData.append("_method", "PUT");

  const { data } = await axios.post(`${API_URL}/update`, formData, {
    ...getAuthHeaders(),
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers, 
    },
  });

  return data;
};