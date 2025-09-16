<template>
  <div class="p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-green-600 rounded"></span>
          Features
        </h2>
        <button
          @click="showCreateForm"
          class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nuevo Feature
        </button>
      </div>

      <!-- Formulario flotante -->
      <div
        v-if="isEditing || isCreating"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300"
      >
        <form @submit.prevent="isEditing ? updateItem() : createItem()" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input
              v-model="form.name_feature"
              type="text"
              placeholder="Nombre del feature"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Escribe una descripción"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Ícono / Imagen</label>
            <div class="flex items-center gap-6">
              <div
                class="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
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
              class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
            >
              {{ isEditing ? "✏️ Actualizar" : "✔️ Crear" }}
            </button>
            <button
              type="button"
              @click="closeForm"
              class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Listado -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-transform duration-300 flex flex-col items-center text-center"
        >
          <img
            :src="feature.icon_img_feature"
            alt="icono"
            class="w-20 h-20 object-cover mb-3"
          />
          <h3 class="text-xl font-bold text-gray-800">{{ feature.name_feature }}</h3>
          <p class="text-sm text-gray-500">{{ feature.description }}</p>

          <div class="flex gap-2 justify-center mt-4">
            <button
              @click="editFeature(feature)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="removeFeature(feature.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      </div>

      <div v-if="features.length === 0" class="text-center text-gray-500 py-10">
        No se encontraron features.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../api/featureService.js";

const features = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const editingId = ref(null);

const form = ref({
  name_feature: "",
  description: "",
  icon_img_feature: null,
  imgPreview: null,
});

const fetchFeatures = async () => {
  features.value = await getFeatures();
};

const showCreateForm = () => {
  resetForm();
  isCreating.value = true;
};

const closeForm = () => {
  isEditing.value = false;
  isCreating.value = false;
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.icon_img_feature = file;
  form.value.imgPreview = URL.createObjectURL(file);
};

const createItem = async () => {
  try {
    const formData = new FormData();
    formData.append("name_feature", form.value.name_feature);
    formData.append("description", form.value.description);
    if (form.value.icon_img_feature)
      formData.append("icon_img_feature", form.value.icon_img_feature);

    await createFeature(formData);
    await fetchFeatures();
    closeForm();
  } catch (error) {
    console.error("Error creando feature:", error);
  }
};

const editFeature = (feature) => {
  resetForm();
  isEditing.value = true;
  editingId.value = feature.id;
  form.value.name_feature = feature.name_feature;
  form.value.description = feature.description;
  form.value.imgPreview = feature.icon_img_feature;
  form.value.icon_img_feature = null;
};

const updateItem = async () => {
  try {
    const formData = new FormData();
    formData.append("name_feature", form.value.name_feature);
    formData.append("description", form.value.description);
    if (form.value.icon_img_feature)
      formData.append("icon_img_feature", form.value.icon_img_feature);

    await updateFeature(editingId.value, formData);
    await fetchFeatures();
    closeForm();
  } catch (error) {
    console.error("Error actualizando feature:", error);
  }
};

const removeFeature = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este feature?")) return;
  try {
    await deleteFeature(id);
    await fetchFeatures();
  } catch (error) {
    console.error("Error eliminando feature:", error);
  }
};

const resetForm = () => {
  editingId.value = null;
  form.value = {
    name_feature: "",
    description: "",
    icon_img_feature: null,
    imgPreview: null,
  };
};

onMounted(fetchFeatures);
</script>