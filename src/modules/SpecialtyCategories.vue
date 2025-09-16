<!-- modules/SpecialtyCategories.vue -->
<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Categorías de Especialidad
      </h2>
      <button
        @click="showCreateForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
      >
        ➕ Nueva Especialidad
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="isFormVisible" class="bg-white p-6 rounded-2xl shadow-md border mb-6">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEditing ? "Editar Especialidad" : "Agregar Especialidad" }}
      </h3>
      <form @submit.prevent="handleSubmit" class="flex gap-4 items-center">
        <input
          v-model="form.specialty_name"
          type="text"
          placeholder="Nombre de la especialidad"
          class="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition-all duration-200"
        >
          {{ isEditing ? "Actualizar" : "Agregar" }}
        </button>
        <button
          type="button"
          @click="cancelForm"
          class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow transition-all duration-200"
        >
          Cancelar
        </button>
      </form>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
      <table class="w-full text-sm text-left text-gray-600">
        <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th class="px-6 py-3">#</th>
            <th class="px-6 py-3">Especialidad</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(category, index) in categories"
            :key="category.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3 font-medium text-gray-900">
              {{ category.specialty_name }}
            </td>
            <td class="px-6 py-3 text-center space-x-2">
              <button
                @click="editCategory(category)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg shadow transition-all duration-200"
              >
                ✏️ Editar
              </button>
              <button
                @click="removeCategory(category.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow transition-all duration-200"
              >
                🗑 Eliminar
              </button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-500">
              No hay especialidades registradas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import {
  getSpecialtyCategories,
  createSpecialtyCategory,
  updateSpecialtyCategory,
  deleteSpecialtyCategory,
} from "../api/specialtyCategoriesService.js";

const categories = ref([]);
const form = ref({ specialty_name: "" });
const isEditing = ref(false);
const editingId = ref(null);
const isFormVisible = ref(false);

// Obtener todas las especialidades al montar
const fetchCategories = async () => {
  try {
    categories.value = await getSpecialtyCategories();
  } catch (error) {
    console.error("❌ Error al cargar especialidades:", error);
  }
};
onMounted(fetchCategories);

// Mostrar formulario
const showCreateForm = () => {
  resetForm();
  isFormVisible.value = true;
};

// Guardar o actualizar especialidad
const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateSpecialtyCategory(editingId.value, form.value);
    } else {
      await createSpecialtyCategory(form.value);
    }
    await fetchCategories();
    cancelForm();
  } catch (error) {
    console.error("❌ Error al guardar especialidad:", error);
  }
};

// Editar
const editCategory = (category) => {
  form.value.specialty_name = category.specialty_name;
  isEditing.value = true;
  editingId.value = category.id;
  isFormVisible.value = true;
};

// Cancelar
const cancelForm = () => {
  resetForm();
  isFormVisible.value = false;
};

// Eliminar
const removeCategory = async (id) => {
  if (confirm("¿Seguro que quieres eliminar esta especialidad?")) {
    await deleteSpecialtyCategory(id);
    await fetchCategories();
  }
};

// Resetear formulario
const resetForm = () => {
  form.value = { specialty_name: "" };
  isEditing.value = false;
  editingId.value = null;
};
</script>
