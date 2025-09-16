<template>
  <div class="p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Partners
        </h2>
        <button
          @click="showCreateForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nuevo Partner
        </button>
      </div>

      <!-- Formulario flotante -->
      <div
        v-if="isEditing || isCreating"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300"
      >
        <form @submit.prevent="isEditing ? updatePartner() : createPartner()" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Nombre del Partner</label>
            <input
              v-model="form.name_partner"
              type="text"
              placeholder="Google, Facebook..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Logo</label>
            <div class="flex items-center gap-6">
              <div
                class="w-24 h-24 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.imgPreview"
                  :src="form.imgPreview"
                  alt="preview"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-gray-400 text-sm">Sin logo</span>
              </div>
              <div class="flex flex-col gap-2">
                <input type="file" @change="handleFileUpload" />
                <p class="text-xs text-gray-500 mt-1">Formatos: JPG, PNG</p>
              </div>
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
              v-if="isEditing || isCreating"
              type="button"
              @click="resetForm"
              class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Listado en Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="partner in partners"
          :key="partner.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
        >
          <div class="flex items-center justify-center mb-3">
            <div class="w-80 h-40 flex items-center justify-center bg-gray-50 overflow-hidden">
              <img
                :src="partner.img_partner"
                alt="partner logo"
                class="w-80 h-20"
              />
            </div>
          </div>
          <h3 class="text-lg font-bold text-center text-gray-800 mb-4">{{ partner.name_partner }}</h3>
          <div class="flex gap-2 justify-center">
            <button
              @click="editPartner(partner)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="deletePartner(partner.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
        <div v-if="partners.length === 0" class="col-span-full text-center text-gray-500 py-10">
          No se encontraron partners.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import partnerService from "../api/partnerService";

// State
const partners = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const editingId = ref(null);

const form = ref({
  name_partner: "",
  img_partner: null,
  imgPreview: null,
});

// Fetch
const fetchPartners = async () => {
  try {
    partners.value = await partnerService.getPartners();
  } catch (error) {
    console.error("❌ Error fetching partners:", error);
  }
};

// Actions
const showCreateForm = () => {
  isCreating.value = true;
  isEditing.value = false;
  form.value = { name_partner: "", img_partner: null, imgPreview: null };
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.img_partner = file;
    form.value.imgPreview = URL.createObjectURL(file);
  }
};

const createPartner = async () => {
  try {
    await partnerService.createPartner(form.value);
    await fetchPartners();
    resetForm();
  } catch (error) {
    console.error("❌ Error creating partner:", error);
  }
};

const editPartner = (partner) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = partner.id;
  form.value.name_partner = partner.name_partner;
  form.value.img_partner = null;
  form.value.imgPreview = partner.img_partner;
};

const updatePartner = async () => {
  try {
    await partnerService.updatePartner(editingId.value, form.value);
    await fetchPartners();
    resetForm();
  } catch (error) {
    console.error("Error updating partner:", error);
  }
};

const deletePartner = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este partner?")) return;
  try {
    await partnerService.deletePartner(id);
    await fetchPartners();
  } catch (error) {
    console.error("Error deleting partner:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  isCreating.value = false;
  editingId.value = null;
  form.value = { name_partner: "", img_partner: null, imgPreview: null };
};

// Mounted
onMounted(() => {
  fetchPartners();
});
</script>
