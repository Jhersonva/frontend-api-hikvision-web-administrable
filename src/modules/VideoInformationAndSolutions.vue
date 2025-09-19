<!-- src/modules/VideoInformationAndSolutions.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-gray-800 text-center">
      Video Información y Soluciones
    </h2>

    <!-- Lista de registros -->
    <div
      v-for="item in videoInfo"
      :key="item.id"
      class="grid lg:grid-cols-2 gap-6 mb-10"
    >
      <!-- Vista previa -->
      <div class="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
          {{ item.name_information_solution }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ item.description }}
        </p>

        <!-- Icono -->
        <div v-if="item.icon_img" class="flex justify-center my-4">
          <img
            :src="item.icon_img"
            alt="Icono"
            class="h-24 w-24 object-contain rounded-lg border border-gray-200"
          />
        </div>

        <!-- Video solo para el primer registro -->
        <div v-if="item.url_video_yt" class="mt-4">
          <iframe
            class="w-full h-64 rounded-lg border"
            :src="embedUrl(item.url_video_yt)"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Formulario de edición -->
      <div class="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h3 class="text-lg font-semibold mb-6 text-gray-700">
          ✏️ Editar Registro #{{ item.id }}
        </h3>
        <form @submit.prevent="updateData(item.id)" enctype="multipart/form-data" class="space-y-4">
          <!-- Solo el registro 1 puede editar url_video_yt -->
          <div v-if="item.id === 1">
            <label class="block font-medium mb-1 text-gray-700">URL Video YouTube</label>
            <input
              v-model="forms[item.id].url_video_yt"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label class="block font-medium mb-1 text-gray-700">Título</label>
            <input
              v-model="forms[item.id].name_information_solution"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Ejemplo: Transformación Digital"
            />
          </div>

          <div>
            <label class="block font-medium mb-1 text-gray-700">Descripción</label>
            <textarea
              v-model="forms[item.id].description"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              rows="3"
              placeholder="Agrega una descripción..."
            ></textarea>
          </div>

          <div>
            <label class="block font-medium mb-1 text-gray-700">Icono (opcional)</label>
            <input
              type="file"
              @change="handleFile($event, item.id)"
              class="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              💾 Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getVideoInfo, updateVideoInfo } from "../api/videoInformationAndSolutionsService.js";

const videoInfo = ref([]);
const forms = ref({});
const files = ref({});

// Cargar datos
const fetchData = async () => {
  try {
    const data = await getVideoInfo();
    videoInfo.value = data;

    // Inicializar formularios por registro
    data.forEach((item) => {
      forms.value[item.id] = {
        url_video_yt: item.url_video_yt || "",
        name_information_solution: item.name_information_solution,
        description: item.description,
      };
      files.value[item.id] = null;
    });
  } catch (error) {
    console.error("Error al cargar información de videos:", error);
  }
};

// Manejar archivos por registro
const handleFile = (event, id) => {
  files.value[id] = event.target.files[0];
};

// Actualizar un registro
const updateData = async (id) => {
  try {
    const formData = new FormData();
    formData.append("name_information_solution", forms.value[id].name_information_solution);
    formData.append("description", forms.value[id].description);

    // Solo el primer registro envía url_video_yt
    if (id === 1) {
      formData.append("url_video_yt", forms.value[id].url_video_yt);
    }

    if (files.value[id]) {
      formData.append("icon_img", files.value[id]);
    }

    const updated = await updateVideoInfo(id, formData);

    // Reemplazar el registro en la lista
    const index = videoInfo.value.findIndex((v) => v.id === id);
    if (index !== -1) {
      videoInfo.value[index] = updated;
    }

    alert("Registro actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("Error al actualizar registro");
  }
};

// Convertir URL de YouTube en embebido
const embedUrl = (url) => {
  const videoId = url?.split("v=")[1]?.split("&")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

onMounted(fetchData);
</script>
