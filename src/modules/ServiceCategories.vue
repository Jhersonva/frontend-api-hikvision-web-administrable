<!-- src/modules/ServicesCategories.vue -->
<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Categorías de Servicios
        </h2>
        <button
          @click="showCreateForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nueva Categoría
        </button>
      </div>

      <!-- Formulario flotante -->
      <div
        v-if="isCreating || isEditing"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300"
      >
        <form @submit.prevent="isEditing ? updateItem() : createItem()" class="space-y-4">
          <!-- Título -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Título</label>
            <input
              v-model="form.titulo_service_category"
              type="text"
              placeholder="Ejemplo: Consultoría, Desarrollo..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea
              v-model="form.description_service_category"
              placeholder="Describe la categoría..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          <!-- Ícono -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Ícono</label>
            <div class="flex items-center gap-6">
              <div
                class="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.imgPreview"
                  :src="form.imgPreview"
                  alt="icon preview"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-gray-400 text-sm">Sin ícono</span>
              </div>
              <input type="file" @change="handleFileChange" class="text-sm" />
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="cat in serviceCategories"
          :key="cat.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
              <img
                v-if="cat.icon_service_category"
                :src="cat.icon_service_category"
                alt="icon"
                class="w-full h-full object-contain"
              />
              <span v-else class="text-gray-400 text-sm">No Icon</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800">{{ cat.titulo_service_category }}</h3>
          </div>
          <p class="text-gray-600 text-sm mb-4">{{ cat.description_service_category }}</p>
          <div class="flex gap-2 justify-end">
            <button
              @click="editItem(cat)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="removeItem(cat.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
        <div v-if="serviceCategories.length === 0" class="col-span-full text-center text-gray-500 py-10">
          No se encontraron categorías.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../api/serviceCategoriesService.js";

const serviceCategories = ref([]);
const isCreating = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  titulo_service_category: "",
  description_service_category: "",
  icon_service_category: null,
  imgPreview: null,
});

const fetchCategories = async () => {
  try {
    serviceCategories.value = await getServiceCategories();
  } catch (error) {
    console.error("❌ Error al cargar categorías:", error);
  }
};

const showCreateForm = () => {
  resetForm();
  isCreating.value = true;
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.icon_service_category = file;
  form.value.imgPreview = URL.createObjectURL(file);
};

const createItem = async () => {
  try {
    const formData = new FormData();
    formData.append("titulo_service_category", form.value.titulo_service_category);
    formData.append("description_service_category", form.value.description_service_category);
    if (form.value.icon_service_category) {
      formData.append("icon_service_category", form.value.icon_service_category);
    }

    await createServiceCategory(formData);
    await fetchCategories();
    resetForm();
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
  }
};

const editItem = (cat) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = cat.id;
  form.value.titulo_service_category = cat.titulo_service_category;
  form.value.description_service_category = cat.description_service_category;
  form.value.imgPreview = cat.icon_service_category;
  form.value.icon_service_category = null;
};

const updateItem = async () => {
  try {
    const formData = new FormData();
    formData.append("titulo_service_category", form.value.titulo_service_category);
    formData.append("description_service_category", form.value.description_service_category);
    if (form.value.icon_service_category) {
      formData.append("icon_service_category", form.value.icon_service_category);
    }

    await updateServiceCategory(editingId.value, formData);
    await fetchCategories();
    resetForm();
  } catch (error) {
    console.error("❌ Error al actualizar categoría:", error);
  }
};

const removeItem = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;
  try {
    await deleteServiceCategory(id);
    await fetchCategories();
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
  }
};

const resetForm = () => {
  isCreating.value = false;
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    titulo_service_category: "",
    description_service_category: "",
    icon_service_category: null,
    imgPreview: null,
  };
};

onMounted(fetchCategories);
</script>