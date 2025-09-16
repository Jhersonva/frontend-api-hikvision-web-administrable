   <!-- Carousels -->
<template>
  <div class="p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Carousels
        </h2>
        <button
          @click="showCreateForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nuevo Carousel
        </button>
      </div>

      <!-- Formulario flotante -->
      <div
        v-if="isEditing || isCreating"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300"
      >
        <form @submit.prevent="isEditing ? updateItem() : createItem()" class="space-y-4">
          <!-- Subtítulo -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Subtítulo</label>
            <input
              v-model="form.sub_titulo"
              type="text"
              placeholder="Subtítulo del carousel"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Título principal -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Título principal</label>
            <input
              v-model="form.main_title"
              type="text"
              placeholder="Título principal del carousel"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea
              v-model="form.descripcion"
              rows="3"
              placeholder="Escribe una breve descripción"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Imagen</label>
            <div class="flex items-center gap-6">
              <div
                class="w-32 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.imgPreview"
                  :src="form.imgPreview"
                  alt="preview"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-gray-400 text-sm">Sin imagen</span>
              </div>
              <input type="file" @change="handleFileChange" class="w-full mt-1" />
            </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-end gap-2">
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
            >
              {{ isEditing ? "✏️ Actualizar" : "✔️ Crear" }}
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

      <!-- Listado en cards -->
        <div class="space-y-6">
        <div
            v-for="carousel in carousels"
            :key="carousel.id"
            class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-transform duration-300 flex flex-col"
        >
            <div>
            <img
                :src="carousel.img_carousel"
                alt="imagen"
                class="w-250 h-60 object-cover rounded-lg mb-3"
            />
            <h3 class="text-xl font-bold text-gray-800">{{ carousel.main_title }}</h3>
            <p class="text-sm text-gray-500">{{ carousel.sub_titulo }}</p>
            <p class="text-xs text-gray-400 mt-2">{{ carousel.descripcion }}</p>
            </div>
            <div class="flex gap-2 justify-end mt-4">
            <button
                @click="editCarousel(carousel)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
                ✏️ Editar
            </button>
            <button
                @click="removeCarousel(carousel.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
                🗑 Eliminar
            </button>
            </div>
        </div>
        <div v-if="carousels.length === 0" class="text-center text-gray-500 py-10">
            No se encontraron carousels.
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getCarousels,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} from "../api/carouselService.js";

const carousels = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const editingId = ref(null);

const form = ref({
  sub_titulo: "",
  main_title: "",
  descripcion: "",
  img_carousel: null,
  imgPreview: null,
});

const fetchCarousels = async () => {
  carousels.value = await getCarousels();
};

const showCreateForm = () => {
  resetForm(); 
  isCreating.value = true; 
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.img_carousel = file;
  form.value.imgPreview = URL.createObjectURL(file);
};

const createItem = async () => {
  try {
    const formData = new FormData();
    formData.append("sub_titulo", form.value.sub_titulo);
    formData.append("main_title", form.value.main_title);
    formData.append("descripcion", form.value.descripcion);
    if (form.value.img_carousel) formData.append("img_carousel", form.value.img_carousel);

    await createCarousel(formData);
    await fetchCarousels();
    resetForm();
  } catch (error) {
    console.error("Error creando carousel:", error);
  }
};

const editCarousel = (carousel) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = carousel.id;
  form.value.sub_titulo = carousel.sub_titulo;
  form.value.main_title = carousel.main_title;
  form.value.descripcion = carousel.descripcion;
  form.value.imgPreview = carousel.img_carousel;
  form.value.img_carousel = null;
};

const updateItem = async () => {
  try {
    const formData = new FormData();
    formData.append("sub_titulo", form.value.sub_titulo);
    formData.append("main_title", form.value.main_title);
    formData.append("descripcion", form.value.descripcion);
    if (form.value.img_carousel) formData.append("img_carousel", form.value.img_carousel);

    await updateCarousel(editingId.value, formData);
    await fetchCarousels();
    resetForm();
  } catch (error) {
    console.error("Error actualizando carousel:", error);
  }
};

const removeCarousel = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este carousel?")) return;
  try {
    await deleteCarousel(id);
    await fetchCarousels();
  } catch (error) {
    console.error("Error eliminando carousel:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  isCreating.value = false;
  editingId.value = null;
  form.value = {
    sub_titulo: "",
    main_title: "",
    descripcion: "",
    img_carousel: null,
    imgPreview: null,
  };
};

onMounted(fetchCarousels);
</script>