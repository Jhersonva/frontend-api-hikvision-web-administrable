import api from "./api";

class ProductCategoriesService {
  // Listar todas las categorías
  async getAll() {
    const response = await api.get("/category-products");
    return response.data;
  }

  // Crear categoría
  async create(data) {
    const response = await api.post("/category-products", data);
    return response.data;
  }

  // Actualizar categoría
  async update(id, data) {
    const response = await api.put(`/category-products/${id}`, data);
    return response.data;
  }

  // Eliminar categoría
  async delete(id) {
    const response = await api.delete(`/category-products/${id}`);
    return response.data;
  }
}

export default new ProductCategoriesService();