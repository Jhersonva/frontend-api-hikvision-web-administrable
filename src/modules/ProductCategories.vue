<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Categorías de Productos
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
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <input
            v-model="form.name_category_products"
            type="text"
            placeholder="Nombre de la categoría"
            class="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          <!-- Botones -->
          <div class="flex gap-2 justify-end">
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
          </div>
        </form>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table class="w-full text-sm text-left text-gray-600">
          <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th class="px-6 py-3">#</th>
              <th class="px-6 py-3">Nombre de Categoría</th>
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
                {{ category.name_category_products }}
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
                No hay categorías registradas.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mensaje -->
      <div v-if="message" class="mt-4 p-3 rounded-lg bg-green-100 text-green-800">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import productCategoriesService from "../api/productCategoriesService";

export default {
  name: "ProductCategories",
  data() {
    return {
      categories: [],
      form: { name_category_products: "" },
      isFormVisible: false,
      isEditing: false,
      currentId: null,
      message: "",
    };
  },
  methods: {
    async fetchCategories() {
      this.categories = await productCategoriesService.getAll();
    },
    showCreateForm() {
      this.resetForm();
      this.isFormVisible = true;
    },
    editCategory(category) {
      this.form.name_category_products = category.name_category_products;
      this.currentId = category.id;
      this.isEditing = true;
      this.isFormVisible = true;
    },
    async handleSubmit() {
      if (this.isEditing) {
        await productCategoriesService.update(this.currentId, this.form);
        this.message = "Categoría actualizada correctamente";
      } else {
        await productCategoriesService.create(this.form);
        this.message = "Categoría agregada correctamente";
      }
      this.fetchCategories();
      this.cancelForm();
    },
    async removeCategory(id) {
      if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
        await productCategoriesService.delete(id);
        this.message = "Categoría eliminada correctamente 🗑";
        this.fetchCategories();
      }
    },
    cancelForm() {
      this.isFormVisible = false;
      this.isEditing = false;
      this.form = { name_category_products: "" };
      this.currentId = null;
    },
    resetForm() {
      this.form = { name_category_products: "" };
      this.isEditing = false;
      this.currentId = null;
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
