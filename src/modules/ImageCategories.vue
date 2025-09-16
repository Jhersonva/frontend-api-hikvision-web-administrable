<!--src/modules/ImageCategories.vue-->
<template> 
  <div class="p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Encabezado de Categorías -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-green-600 rounded"></span>
          Categorías de Imágenes
        </h2>
        <button
          @click="showCreateForm"
          class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nueva Categoría
        </button>
      </div>

      <!-- Formulario de Categoría -->
      <div v-if="isEditing || isCreating" class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300">
        <form @submit.prevent="isEditing ? updateCategory() : createCategory()" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input v-model="form.name" type="text" placeholder="Ej: Iconos de Redes Sociales"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" required />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea v-model="form.description" rows="3" placeholder="Breve descripción de la categoría"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2">
              {{ isEditing ? "💾 Guardar Cambios" : "✔️ Crear" }}
            </button>
            <button v-if="isEditing || isCreating" type="button" @click="resetForm"
              class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200">
              ✖️ Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Listado de Categorías con Imágenes -->
        <div class="flex flex-col gap-6 mt-6">
        <div
            v-for="cat in categories"
            :key="cat.id"
            class="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-transform duration-300 w-full"
        >
            <!-- Título y descripción -->
            <div class="flex items-center justify-between mb-2">
            <div>
                <h3 class="text-xl font-bold text-gray-800">{{ cat.name }}</h3>
                <p class="text-gray-600 text-sm">{{ cat.description }}</p>
            </div>

            <!-- Botones Editar y Eliminar categoría -->
            <div class="flex gap-2">
                <button
                @click="editCategory(cat)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
                >
                ✏️ Editar
                </button>
                <button
                @click="deleteCategory(cat.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
                >
                🗑 Eliminar
                </button>
            </div>
            </div>

            <!-- Formulario de subida de imagen -->
            <div class="mb-4 flex flex-col sm:flex-row gap-2 items-center">
            <input
                v-if="imageForms[cat.id]"
                v-model="imageForms[cat.id].title"
                type="text"
                placeholder="Título de la imagen"
                class="border-2 border-gray-300 focus:border-green-500 focus:outline-none rounded-lg px-3 py-2"
            />
            <input
                type="file"
                @change="(e) => handleImageFile(e, cat.id)"
                class="border border-gray-300 rounded-xl px-4 py-2"
            />
            <button
                @click="createCategoryImage(cat.id)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
            >
                ➕ Subir Imagen
            </button> <!--Tamaño ideal 128 px-->
            </div>

            <!-- Galería de imágenes -->
            <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            <div v-if="imageForms[cat.id]?.preview"
                class="relative cursor-pointer overflow-hidden rounded-lg border-2 border-green-500 shadow-sm flex flex-col items-center justify-center">
                <span class="text-xs text-gray-600 mb-1">Visualizando</span>
                <img
                    :src="imageForms[cat.id].preview"
                    alt="Preview"
                    class="w-20 h-16 object-contain"
                />
            </div>

            <div
                v-for="img in images.filter(i => i.category === cat.name).slice().reverse()"
                :key="img.id"
                class="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md flex flex-col items-center"
                @click="openImageModal(img.file_url)"
            >
                <img
                    :src="img.file_url"
                    alt=""
                    class="w-20 h-20 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <span class="text-xs text-gray-700 mt-1 text-center">{{ img.title }}</span>

                <button
                    @click.stop="deleteCategoryImage(img.id)"
                    class="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    X
                </button>
            </div>
            </div>
        </div>
        </div>

      <div v-if="categories.length === 0" class="col-span-full text-center text-gray-500 py-10">
        No se encontraron categorías.
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getImageCategories,
  createImageCategory,
  updateImageCategory,
  deleteImageCategory,
} from "../api/imageCategories";

import { getImages, createImage, deleteImage as apiDeleteImage } from "../api/images";

const categories = ref([]);
const images = ref([]);
const isEditing = ref(false);
const isCreating = ref(false); 
const editingId = ref(null);

const form = ref({
  name: "",
  description: "",
});

// Cada categoría tendrá su propio estado de imagen
const imageForms = ref({});

const fetchCategories = async () => {
  try {
    const { data } = await getImageCategories();
    categories.value = data;

    // Inicializamos imageForms para cada categoría
    data.forEach(cat => {
      if (!imageForms.value[cat.id]) {
        imageForms.value[cat.id] = { title: "", file: null, preview: null };
      }
    });

  } catch (error) {
    console.error("Error al obtener categorías:", error);
  }
};


const fetchImages = async () => {
  try {
    const { data } = await getImages();
    images.value = data;
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
  }
};

const showCreateForm = () => {
  isCreating.value = true;
  isEditing.value = false;
  form.value = { name: "", description: "" };
};

const createCategory = async () => {
  try {
    await createImageCategory(form.value);
    await fetchCategories();
    resetForm();
  } catch (error) {
    console.error("Error al crear categoría:", error);
  }
};

const editCategory = (cat) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = cat.id;
  form.value = { ...cat };
};

const updateCategory = async () => {
  try {
    await updateImageCategory(editingId.value, form.value);
    await fetchCategories();
    resetForm();
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
  }
};

const deleteCategory = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;
  try {
    await deleteImageCategory(id);
    await fetchCategories();
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
  }
};

const handleImageFile = (e, categoryId) => {
  const file = e.target.files[0];
  if (!file) return;

  const newForms = { ...imageForms.value };

  if (!newForms[categoryId]) {
    newForms[categoryId] = { title: "", file: null, preview: null };
  }

  newForms[categoryId].file = file;
  newForms[categoryId].preview = URL.createObjectURL(file);

  imageForms.value = newForms; 
};


const createCategoryImage = async (categoryId) => {
  const imageForm = imageForms.value[categoryId];
  if (!imageForm || !imageForm.file || !imageForm.title) {
    alert("Debe agregar un título y un archivo");
    return;
  }
  try {
    const formData = new FormData();
    formData.append("image_category_id", categoryId);
    formData.append("title", imageForm.title);
    formData.append("file", imageForm.file);
    await createImage(formData);
    await fetchImages();
    imageForms.value[categoryId] = { title: "", file: null, preview: null }; 
  } catch (error) {
    console.error("Error al crear imagen:", error);
  }
};

const deleteCategoryImage = async (imageId) => {
  if (!confirm("¿Eliminar imagen?")) return;
  try {
    await apiDeleteImage(imageId);
    await fetchImages();
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  isCreating.value = false;
  editingId.value = null;
  form.value = { name: "", description: "" };
};

onMounted(() => {
  fetchCategories();
  fetchImages();
});
</script>