<!-- src/modules/InformationContact.vue -->
<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Información de Contacto
      </h2>

      <!-- Formulario -->
      <form
        @submit.prevent="updateInfo"
        class="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <!-- Imagen -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Imagen de Contacto</label>
          <div class="flex items-center gap-6">
            <div
              class="w-32 h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
            >
              <img
                v-if="imageUrl || previewImage"
                :src="previewImage || imageUrl"
                alt="imagen contacto"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-gray-400 text-sm">Sin imagen</span>
            </div>
            <div>
              <input
                type="file"
                @change="onFileChange"
                class="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100 cursor-pointer"
              />
              <p class="text-xs text-gray-500 mt-1">Formatos: JPG, PNG, SVG</p>
            </div>
          </div>
        </div>

        <!-- Título -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Título Principal</label>
          <input
            v-model="form.main_title"
            type="text"
            placeholder="Ej: Contáctanos"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Descripción -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Descripción</label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Escribe aquí la descripción para la sección de contacto"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Botón -->
        <div class="text-right">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
            :disabled="loading"
          >
            {{ loading ? "Guardando..." : "💾 Guardar cambios" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getInformationContact,
  updateInformationContact,
} from "../api/informationContactService.js";

const form = ref({
  id: null,
  main_title: "",
  description: "",
  img_information_contact: "",
});

const loading = ref(false);
const previewImage = ref(null);

// Validación de File
const isFile = (value) => typeof File !== "undefined" && value instanceof File;
const imageUrl = computed(() => {
  if (!form.value.img_information_contact) return null;
  return isFile(form.value.img_information_contact)
    ? null
    : form.value.img_information_contact;
});

// Cargar información al montar
onMounted(async () => {
  try {
    const data = await getInformationContact();
    form.value = { ...data };
  } catch (error) {
    console.error("❌ Error al cargar información de contacto:", error);
  }
});

// Previsualizar imagen seleccionada
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.img_information_contact = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// Actualizar información
const updateInfo = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("main_title", form.value.main_title);
    formData.append("description", form.value.description);
    if (isFile(form.value.img_information_contact)) {
      formData.append("img_information_contact", form.value.img_information_contact);
    }
    formData.append("_method", "PUT");

    const updated = await updateInformationContact(formData);
    form.value = { ...updated.data };
    alert("✅ Información de contacto actualizada correctamente");
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    alert("Error al actualizar");
  } finally {
    loading.value = false;
  }
};
</script>
