<!-- src/modules/Blog.vue -->
<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Blogs
      </h2>

      <!-- Botón crear -->
    <div v-if="!isEditing && !isCreating" class="mt-6 flex justify-end">
        <button
            @click="isCreating = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200"
        >
            ➕ Crear Nuevo Blog
        </button>
    </div>
    <br>

      <!-- Formulario flotante -->
      <div
        v-if="isEditing || isCreating"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mt-8"
      >
        <h3 class="text-xl font-semibold mb-4">
          {{ isCreating ? "Crear Blog" : "Editar Blog" }}
        </h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Título</label>
            <input
              v-model="form.name_blog"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <!-- Usuario -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Usuario</label>
            <input
              v-model="form.user_blog"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <!-- Fecha -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Fecha</label>
            <input
              v-model="form.date_blog"
              type="date"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea
              v-model="form.description_blog"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="3"
              required
            ></textarea>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Imagen</label>
            <div class="flex items-center gap-6">
              <div
                class="w-48 h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.preview"
                  :src="form.preview"
                  alt="preview"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-gray-400 text-sm">Sin imagen</span>
              </div>
              <input type="file" @change="handleFile" class="text-sm" />
            </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-end gap-2">
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-200"
            >
              ✔️ Guardar
            </button>
            <button
              type="button"
              @click="resetForm"
              class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
      <br>

      <!-- Listado en tarjetas -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <!-- Imagen -->
          <div class="w-full h-48 flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden border mb-3">
            <img
              v-if="blog.img_blog"
              :src="blog.img_blog"
              alt="blog"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-gray-400 text-sm">Sin imagen</span>
          </div>

          <!-- Contenido -->
          <h3 class="text-lg font-bold text-gray-800 mb-2">{{ blog.name_blog }}</h3>
          <p class="text-sm text-gray-600 mb-1">👤 {{ blog.user_blog }}</p>
          <p class="text-sm text-gray-500 mb-2">📅 {{ blog.date_blog }}</p>
          <p class="text-gray-700 text-sm flex-1">{{ blog.description_blog }}</p>

          <!-- Botones -->
          <div class="flex gap-2 mt-4">
            <button
              @click="editItem(blog)"
              class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="deleteItem(blog.id)"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../api/blogService.js";

const blogs = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const editingId = ref(null);

const form = ref({
  name_blog: "",
  user_blog: "",
  date_blog: "",
  description_blog: "",
  img_blog: null,
  preview: null,
});

const fetchBlogs = async () => {
  try {
    blogs.value = await getBlogs();
  } catch (error) {
    console.error("Error al obtener blogs:", error);
  }
};

onMounted(fetchBlogs);

const handleFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  form.value.img_blog = file;
  form.value.preview = URL.createObjectURL(file);
};

const handleSubmit = async () => {
  try {
    if (isCreating.value) {
      await createBlog(form.value);
    } else if (isEditing.value) {
      await updateBlog(editingId.value, form.value);
    }
    await fetchBlogs();
    resetForm();
  } catch (error) {
    console.error("Error al guardar blog:", error);
  }
};

const editItem = (blog) => {
  isEditing.value = true;
  editingId.value = blog.id;
  form.value = {
    name_blog: blog.name_blog,
    user_blog: blog.user_blog,
    date_blog: blog.date_blog,
    description_blog: blog.description_blog,
    img_blog: null,
    preview: blog.img_blog,
  };
};

const deleteItem = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este blog?")) return;
  try {
    await deleteBlog(id);
    await fetchBlogs();
  } catch (error) {
    console.error("Error al eliminar blog:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  isCreating.value = false;
  editingId.value = null;
  form.value = {
    name_blog: "",
    user_blog: "",
    date_blog: "",
    description_blog: "",
    img_blog: null,
    preview: null,
  };
};
</script>