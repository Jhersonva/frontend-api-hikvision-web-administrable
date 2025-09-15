<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Video Información y Soluciones</h2>

    <!-- Vista previa -->
    <div v-if="videoInfo" class="mb-6 bg-white shadow p-4 rounded-lg">
      <h3 class="text-xl font-semibold">{{ videoInfo.name_information_solution }}</h3>
      <p class="text-gray-600">{{ videoInfo.description }}</p>

      <!-- Icono -->
      <div v-if="videoInfo.icon_img" class="my-4">
        <img :src="videoInfo.icon_img" alt="Icono" class="h-20 w-20 object-contain" />
      </div>

      <!-- Video de YouTube -->
      <div class="mt-4">
        <iframe
          v-if="videoInfo.url_video_yt"
          class="w-full h-64 rounded"
          :src="embedUrl(videoInfo.url_video_yt)"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- Formulario -->
    <div class="bg-white shadow p-6 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">Editar Información</h3>
      <form @submit.prevent="updateData" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="block font-medium">Título</label>
          <input
            v-model="form.name_information_solution"
            type="text"
            class="w-full border rounded p-2"
          />
        </div>

        <div class="mb-3">
          <label class="block font-medium">Descripción</label>
          <textarea
            v-model="form.description"
            class="w-full border rounded p-2"
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="block font-medium">URL Video YouTube</label>
          <input
            v-model="form.url_video_yt"
            type="text"
            class="w-full border rounded p-2"
          />
        </div>

        <div class="mb-3">
          <label class="block font-medium">Icono (opcional)</label>
          <input type="file" @change="handleFile" class="w-full" />
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getVideoInfo, updateVideoInfo } from "../api/videoInformationAndSolutionsService.js";

const videoInfo = ref(null);
const form = ref({
  id: "",
  url_video_yt: "",
  name_information_solution: "",
  description: "",
});
const file = ref(null);

const fetchData = async () => {
  try {
    const data = await getVideoInfo();
    videoInfo.value = data;

    // Cargar en formulario
    form.value = {
      id: data.id,
      url_video_yt: data.url_video_yt,
      name_information_solution: data.name_information_solution,
      description: data.description,
    };
  } catch (error) {
    console.error("Error al cargar información del video:", error);
  }
};

const handleFile = (event) => {
  file.value = event.target.files[0];
};

const updateData = async () => {
  try {
    const formData = new FormData();
    formData.append("id", form.value.id);
    formData.append("url_video_yt", form.value.url_video_yt);
    formData.append("name_information_solution", form.value.name_information_solution);
    formData.append("description", form.value.description);
    if (file.value) {
      formData.append("icon_img", file.value);
    }

    const updated = await updateVideoInfo(formData);
    videoInfo.value = updated;
    alert("Información actualizada correctamente ✅");
  } catch (error) {
    console.error("Error al actualizar información del video:", error);
    alert("Error al actualizar");
  }
};

// Convertir URL de YouTube en embebido
const embedUrl = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

onMounted(fetchData);
</script>