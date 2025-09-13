<!--src/modules/ContactInformationCompany.vue-->
<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Información de la Empresa
      </h2>

      <!-- Formulario -->
      <form
        @submit.prevent="updateInfo"
        class="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <!-- Logo -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Logo de la Empresa</label>
          <div class="flex items-center gap-6">
            <div class="w-24 h-24 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden">
              <img
                v-if="logoUrl || previewLogo"
                :src="previewLogo || logoUrl"
                alt="logo"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-gray-400 text-sm">Sin logo</span>
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

        <!-- Descripción -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Descripción</label>
          <textarea
            v-model="form.description_company"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Escribe una breve descripción de la empresa"
          ></textarea>
        </div>

        <!-- Dirección -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Dirección</label>
          <input
            v-model="form.address"
            type="text"
            placeholder="Ej: Av. Siempre Viva 742"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Celular</label>
          <input
            v-model="form.cell_phone_number"
            type="text"
            placeholder="+51 999 888 777"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="correo@empresa.com"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Horario -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Horario de atención</label>
          <input
            v-model="form.open_time"
            type="text"
            placeholder="Lun - Vie: 9:00 AM - 6:00 PM"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
  getContactInformationCompany,
  updateContactInformationCompany,
} from "../api/contactInformationCompany.js";

const form = ref({
  id: null,
  company_logo: "",
  description_company: "",
  address: "",
  cell_phone_number: "",
  email: "",
  open_time: "",
});

const loading = ref(false);
const previewLogo = ref(null); // 👈 Previsualización inmediata

// Validación de File
const isFile = (value) => typeof File !== "undefined" && value instanceof File;
const logoUrl = computed(() => {
  if (!form.value.company_logo) return null;
  return isFile(form.value.company_logo) ? null : form.value.company_logo;
});

onMounted(async () => {
  try {
    const data = await getContactInformationCompany();
    form.value = { ...data };
  } catch (error) {
    console.error("❌ Error al cargar datos:", error);
  }
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.company_logo = file;
    previewLogo.value = URL.createObjectURL(file); // 👈 Mostrar imagen seleccionada
  }
};

const updateInfo = async () => {
  loading.value = true;
  try {
    const updated = await updateContactInformationCompany(form.value);
    form.value = { ...updated };
    alert("✅ Información actualizada correctamente");
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    alert("Error al actualizar");
  } finally {
    loading.value = false;
  }
};
</script>
