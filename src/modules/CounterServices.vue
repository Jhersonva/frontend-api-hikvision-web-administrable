<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Counter Services
      </h2>

      <!-- Main image (sección independiente) -->
      <div class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 mb-6">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-32 h-20 overflow-hidden rounded-lg border">
              <img
                v-if="mainImage?.main_img_url"
                :src="mainImage.main_img_url"
                alt="Main image"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                Sin imagen principal
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold">Imagen principal de Counter Services</h3>
              <p class="text-sm text-gray-500">Se muestra la imagen que aparece como fondo o principal de la sección.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="toggleEditMain"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              {{ isEditingMain ? "✖️ Cancelar" : "✏️ Editar imagen" }}
            </button>
          </div>
        </div>

        <!-- Formulario para actualizar main image -->
        <div v-if="isEditingMain" class="mt-4 border-t pt-4">
          <div class="flex items-center gap-4">
            <div class="w-40 h-28 rounded-lg border-2 border-dashed bg-gray-50 overflow-hidden flex items-center justify-center">
              <img v-if="mainForm.mainPreview" :src="mainForm.mainPreview" class="w-full h-full object-cover" />
              <span v-else class="text-gray-400 text-sm">Sin preview</span>
            </div>
            <div class="flex-1">
              <input type="file" @change="handleMainFile" class="mb-3" />
              <div class="flex gap-2">
                <button @click="updateMainImage" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  💾 Guardar imagen
                </button>
                <button @click="cancelEditMain" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Listado en cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="counter in counterServices"
          :key="counter.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-3">
            <!-- Icono -->
            <div class="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
              <img
                v-if="counter.icon_img"
                :src="counter.icon_img"
                alt="icon"
                class="w-full h-full object-contain"
              />
              <span v-else class="text-gray-400 text-sm">No Icon</span>
            </div>

            <h3 class="text-lg font-bold text-gray-800">{{ counter.name_counter_services }}</h3>
          </div>

          <!-- Contador -->
          <p class="text-2xl font-semibold text-blue-600 mb-2">{{ counter.counter }}</p>

          <!-- Botón Editar -->
          <button
            @click="editItem(counter)"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-all duration-200 w-full"
          >
            ✏️ Editar
          </button>
        </div>
      </div>

      <!-- Formulario flotante para editar un counter -->
      <div v-if="isEditing" class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mt-8">
        <h3 class="text-xl font-semibold mb-4">Editar Counter Service</h3>
        <form @submit.prevent="updateItem" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input
              v-model="form.name_counter_services"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Contador -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Contador</label>
            <input
              v-model="form.counter"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Icono -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Icono</label>
            <div class="flex items-center gap-6">
              <div
                class="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.iconPreview"
                  :src="form.iconPreview"
                  alt="icon preview"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-gray-400 text-sm">Sin icono</span>
              </div>
              <input type="file" @change="handleIconFile" class="text-sm" />
            </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-end gap-2">
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-200">
              ✔️ Guardar
            </button>
            <button type="button" @click="resetForm" class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200">
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getCounterServices,
  updateCounterService,
} from "../api/counterServicesService.js";

import {
  getCounterServiceMainImage,
  updateCounterServiceMainImage,
} from "../api/counterServiceMainImageService.js";

const counterServices = ref([]);
const mainImage = ref(null);

const isEditing = ref(false);
const editingId = ref(null);

const isEditingMain = ref(false);
const mainForm = ref({
  main_img: null,
  mainPreview: null,
});

const form = ref({
  name_counter_services: "",
  counter: "",
  icon_img: null,
  iconPreview: null,
});

// Cargar counters + main image
const fetchCounters = async () => {
  try {
    counterServices.value = await getCounterServices();
  } catch (error) {
    console.error("❌ Error al cargar counter services:", error);
    counterServices.value = [];
  }
};

const fetchMainImage = async () => {
  try {
    mainImage.value = await getCounterServiceMainImage();
    // El API devuelve { id, main_img_url }
    if (mainImage.value && mainImage.value.main_img_url) {
      mainForm.value.mainPreview = mainImage.value.main_img_url;
    } else {
      mainForm.value.mainPreview = null;
    }
  } catch (error) {
    console.error("❌ Error al cargar main image:", error);
    mainImage.value = null;
    mainForm.value.mainPreview = null;
  }
};

onMounted(async () => {
  await fetchCounters();
  await fetchMainImage();
});

// ---- MAIN IMAGE ----
const toggleEditMain = () => {
  isEditingMain.value = !isEditingMain.value;
  if (!isEditingMain.value) {
    // cancelar edición: restaurar preview desde mainImage
    mainForm.value.main_img = null;
    mainForm.value.mainPreview = mainImage.value?.main_img_url || null;
  } else {
    mainForm.value.main_img = null;
  }
};

const handleMainFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  mainForm.value.main_img = file;
  mainForm.value.mainPreview = URL.createObjectURL(file);
};

const updateMainImage = async () => {
  try {
    if (!mainForm.value.main_img) {
      alert("Selecciona una imagen antes de guardar.");
      return;
    }
    const fd = new FormData();
    fd.append("main_img", mainForm.value.main_img);
    // La función del servicio ya agrega _method, pero no hace daño si lo doble, así que lo dejamos en el servicio.
    await updateCounterServiceMainImage(fd);
    await fetchMainImage();
    isEditingMain.value = false;
    mainForm.value.main_img = null;
    mainForm.value.mainPreview = mainImage.value?.main_img_url || null;
  } catch (error) {
    console.error("❌ Error actualizando main image:", error);
  }
};

const cancelEditMain = () => {
  isEditingMain.value = false;
  mainForm.value.main_img = null;
  mainForm.value.mainPreview = mainImage.value?.main_img_url || null;
};

// ---- COUNTER ITEM ----
const editItem = (counter) => {
  isEditing.value = true;
  editingId.value = counter.id;
  form.value.name_counter_services = counter.name_counter_services;
  form.value.counter = counter.counter;
  form.value.iconPreview = counter.icon_img;
  form.value.icon_img = null;
};

const handleIconFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  form.value.icon_img = file;
  form.value.iconPreview = URL.createObjectURL(file);
};

const updateItem = async () => {
  try {
    const fd = new FormData();
    fd.append("name_counter_services", form.value.name_counter_services);
    fd.append("counter", form.value.counter);
    if (form.value.icon_img) fd.append("icon_img", form.value.icon_img);
    // updateCounterService expects (id, formData) and appends _method internally
    await updateCounterService(editingId.value, fd);
    await fetchCounters();
    resetForm();
  } catch (error) {
    console.error("❌ Error al actualizar counter service:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    name_counter_services: "",
    counter: "",
    icon_img: null,
    iconPreview: null,
  };
};
</script>
