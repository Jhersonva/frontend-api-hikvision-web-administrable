// src/api/blogService.js
import api from "./api";

// Obtener todos los blogs
export const getBlogs = async () => {
  try {
    const response = await api.get("/blogs");
    return response.data;
  } catch (error) {
    console.error("Error al obtener blogs:", error);
    throw error;
  }
};

// Crear un nuevo blog
export const createBlog = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name_blog", data.name_blog);
    formData.append("user_blog", data.user_blog);
    formData.append("date_blog", data.date_blog);
    formData.append("description_blog", data.description_blog);
    if (data.img_blog instanceof File) {
      formData.append("img_blog", data.img_blog);
    }

    const response = await api.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear blog:", error);
    throw error;
  }
};

// Actualizar un blog
export const updateBlog = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name_blog", data.name_blog);
    formData.append("user_blog", data.user_blog);
    formData.append("date_blog", data.date_blog);
    formData.append("description_blog", data.description_blog);

    if (data.img_blog instanceof File) {
      formData.append("img_blog", data.img_blog);
    }

    const response = await api.post(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar blog:", error);
    throw error;
  }
};

// Eliminar un blog
export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar blog:", error);
    throw error;
  }
};