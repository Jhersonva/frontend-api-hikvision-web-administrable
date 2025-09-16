<!-- src/modules/BannerPage.vue -->
<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Banner Pages
      </h2>

      <!-- Formulario flotante para editar un banner -->
      <div
        v-if="isEditing"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mt-8"
      >
        <h3 class="text-xl font-semibold mb-4">Editar Banner Page</h3>
        <form @submit.prevent="updateItem" class="space-y-4">
          <!-- Título -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Título principal</label>
            <input
              v-model="form.main_title"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Imagen del Banner</label>
            <div class="flex items-center gap-6">
              <div
                class="w-48 h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.preview"
                  :src="form.preview"
                  alt="banner preview"
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
              class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-200"
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

      <!-- Listado en cards (una debajo de otra ocupando todo el ancho) -->
      <div class="space-y-6">
        <div
          v-for="banner in banners"
          :key="banner.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <!-- Imagen -->
          <div class="w-full h-84 flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden border mb-3">
            <img
              v-if="banner.img_banner_page"
              :src="banner.img_banner_page"
              alt="banner"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-gray-400 text-sm">Sin imagen</span>
          </div>

          <!-- Título debajo -->
          <h3 class="text-xl font-bold text-gray-800 text-center mb-4">
            {{ banner.main_title }}
          </h3>

          <!-- Botón Editar -->
          <button
            @click="editItem(banner)"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-200 w-full"
          >
            ✏️ Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getBannerPages, updateBannerPage } from "../api/bannerPageService.js";

const banners = ref([]);

const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  main_title: "",
  img_banner_page: null,
  preview: null,
});

// ---- FETCH ----
const fetchBanners = async () => {
  try {
    banners.value = await getBannerPages();
  } catch (error) {
    console.error("Error al cargar banners:", error);
    banners.value = [];
  }
};

onMounted(async () => {
  await fetchBanners();
});

// ---- EDIT ----
const editItem = (banner) => {
  isEditing.value = true;
  editingId.value = banner.id;
  form.value.main_title = banner.main_title;
  form.value.preview = banner.img_banner_page;
  form.value.img_banner_page = null;
};

const handleFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  form.value.img_banner_page = file;
  form.value.preview = URL.createObjectURL(file);
};

const updateItem = async () => {
  try {
    const fd = new FormData();
    fd.append("main_title", form.value.main_title);
    if (form.value.img_banner_page) {
      fd.append("img_banner_page", form.value.img_banner_page);
    }
    fd.append("_method", "PUT");

    await updateBannerPage(editingId.value, fd);
    await fetchBanners();
    resetForm();
  } catch (error) {
    console.error("Error al actualizar banner:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    main_title: "",
    img_banner_page: null,
    preview: null,
  };
};
</script>