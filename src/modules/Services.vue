<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Servicios
        </h2>
        <button
          @click="showCreateForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nuevo Servicio
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
              v-model="form.name_services"
              type="text"
              placeholder="Ejemplo: Desarrollo Web, Consultoría..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea
              v-model="form.description_services"
              placeholder="Describe el servicio..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Categoría</label>
            <select
              v-model="form.service_category_id"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option disabled value="">Seleccione una categoría</option>
              <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.titulo_service_category }}
              </option>
            </select>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Imagen/Icono</label>
            <div class="flex items-center gap-6">
              <div
                class="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.imgPreview"
                  :src="form.imgPreview"
                  alt="preview"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-gray-400 text-sm">Sin imagen</span>
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
          v-for="srv in services"
          :key="srv.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
              <img
                v-if="srv.icon_service"
                :src="srv.icon_service"
                alt="icon"
                class="w-full h-full object-contain"
              />
              <span v-else class="text-gray-400 text-sm">No Icon</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800">{{ srv.name_services }}</h3>
          </div>
          <p class="text-gray-600 text-sm mb-2">{{ srv.description_services }}</p>
          <p class="text-xs text-gray-500 mb-4">
            Categoría: {{ srv.category?.titulo_service_category || "Sin categoría" }}
          </p>
          <div class="flex gap-2 justify-end">
            <button
              @click="editItem(srv)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="removeItem(srv.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
        <div v-if="services.length === 0" class="col-span-full text-center text-gray-500 py-10">
          No se encontraron servicios.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import serviceApi from "../api/servicesService.js";
import { getServiceCategories } from "../api/serviceCategoriesService.js";

const services = ref([]);
const categories = ref([]);
const isCreating = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name_services: "",
  description_services: "",
  service_category_id: "",
  icon_service: null,
  imgPreview: null,
});

const fetchServices = async () => {
  try {
    services.value = await serviceApi.getServices();
  } catch (error) {
    console.error("Error al cargar servicios:", error);
  }
};

const fetchCategories = async () => {
  try {
    categories.value = await getServiceCategories();
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

const showCreateForm = () => {
  resetForm();
  isCreating.value = true;
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.icon_service = file;
  form.value.imgPreview = URL.createObjectURL(file);
};

const createItem = async () => {
  try {
    const formData = new FormData();
    formData.append("name_services", form.value.name_services);
    formData.append("description_services", form.value.description_services);
    formData.append("service_category_id", form.value.service_category_id);
    if (form.value.icon_service) {
      formData.append("icon_service", form.value.icon_service);
    }

    await serviceApi.createService(formData);
    await fetchServices();
    resetForm();
  } catch (error) {
    console.error("Error al crear servicio:", error);
  }
};

const editItem = (srv) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = srv.id;
  form.value.name_services = srv.name_services;
  form.value.description_services = srv.description_services;
  form.value.service_category_id = srv.service_category_id;
  form.value.imgPreview = srv.icon_service;
  form.value.icon_service = null;
};

const updateItem = async () => {
  try {
    const formData = new FormData();
    formData.append("name_services", form.value.name_services);
    formData.append("description_services", form.value.description_services);
    formData.append("service_category_id", form.value.service_category_id);
    if (form.value.icon_service) {
      formData.append("icon_service", form.value.icon_service);
    }

    await serviceApi.updateService(editingId.value, formData);
    await fetchServices();
    resetForm();
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
  }
};

const removeItem = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este servicio?")) return;
  try {
    await serviceApi.deleteService(id);
    await fetchServices();
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
  }
};

const resetForm = () => {
  isCreating.value = false;
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    name_services: "",
    description_services: "",
    service_category_id: "",
    icon_service: null,
    imgPreview: null,
  };
};

onMounted(() => {
  fetchServices();
  fetchCategories();
});
</script>
