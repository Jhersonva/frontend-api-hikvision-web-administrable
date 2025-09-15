<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Categorías de Portafolio
      </h2>
      <button
        @click="showCreateForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
      >
        ➕ Nueva Categoría
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="isFormVisible" class="bg-white p-6 rounded-2xl shadow-md border mb-6">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEditing ? "Editar Categoría" : "Agregar Categoría" }}
      </h3>
      <form @submit.prevent="handleSubmit" class="flex gap-4 items-center">
        <input
          v-model="form.title_portfolio_category"
          type="text"
          placeholder="Nombre de la categoría"
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
    <div class="overflow-x-auto bg-white rounded-2xl shadow-md border">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 border-b">ID</th>
            <th class="px-6 py-3 border-b">Título</th>
            <th class="px-6 py-3 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-3 border-b">{{ category.id }}</td>
            <td class="px-6 py-3 border-b font-medium text-gray-800">
              {{ category.title_portfolio_category }}
            </td>
            <td class="px-6 py-3 border-b text-center space-x-2">
              <button
                @click="editCategory(category)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg shadow transition-all duration-200"
              >
                ✏️ Editar
              </button>
              <button
                @click="removeCategory(category.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow transition-all duration-200"
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="text-center py-6 text-gray-500">
              No hay categorías registradas.
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
  getPortfolioCategories,
  createPortfolioCategory,
  updatePortfolioCategory,
  deletePortfolioCategory,
} from "../api/portfolioCategoriesService";

const categories = ref([]);
const form = ref({ title_portfolio_category: "" });
const isEditing = ref(false);
const editingId = ref(null);
const isFormVisible = ref(false);

// Obtener todas las categorías al montar
const fetchCategories = async () => {
  try {
    categories.value = await getPortfolioCategories();
  } catch (error) {
    console.error("❌ Error al cargar categorías:", error);
  }
};
onMounted(fetchCategories);

// Mostrar formulario
const showCreateForm = () => {
  resetForm();
  isFormVisible.value = true;
};

// Guardar o actualizar categoría
const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updatePortfolioCategory(editingId.value, form.value);
    } else {
      await createPortfolioCategory(form.value);
    }
    await fetchCategories();
    cancelForm();
  } catch (error) {
    console.error("❌ Error al guardar categoría:", error);
  }
};

// Editar
const editCategory = (category) => {
  form.value.title_portfolio_category = category.title_portfolio_category;
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
  if (confirm("¿Seguro que quieres eliminar esta categoría?")) {
    await deletePortfolioCategory(id);
    await fetchCategories();
  }
};

// Resetear formulario
const resetForm = () => {
  form.value = { title_portfolio_category: "" };
  isEditing.value = false;
  editingId.value = null;
};
</script>