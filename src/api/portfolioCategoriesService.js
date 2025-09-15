import API from "./api";

// Obtener todas las categorías
export async function getPortfolioCategories() {
  const { data } = await API.get("/portfolio-categories");
  return data;
}

// Crear una nueva categoría
export async function createPortfolioCategory(payload) {
  const { data } = await API.post("/portfolio-categories", payload);
  return data;
}

// Actualizar una categoría existente
export async function updatePortfolioCategory(id, payload) {
  const { data } = await API.put(`/portfolio-categories/${id}`, payload);
  return data;
}

// Eliminar una categoría
export async function deletePortfolioCategory(id) {
  const { data } = await API.delete(`/portfolio-categories/${id}`);
  return data;
}