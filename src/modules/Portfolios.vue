<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Portfolios
        </h2>
        <button
          @click="showCreateForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nuevo Portfolio
        </button>
      </div>

      <!-- Formulario flotante -->
      <div
        v-if="isCreating || isEditing"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300"
      >
        <form @submit.prevent="isEditing ? updateItem() : createItem()" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input
              v-model="form.name_portfolio"
              type="text"
              placeholder="Ejemplo: Proyecto Web, Instalación CCDA..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Categoría</label>
            <select
              v-model="form.portfolio_category_id"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option disabled value="">Seleccione una categoría</option>
              <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.title_portfolio_category }}
              </option>
            </select>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Imagen</label>
            <div class="flex items-center gap-6">
              <div
                class="w-32 h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.imgPreview"
                  :src="form.imgPreview"
                  alt="preview"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-gray-400 text-sm">Sin imagen</span>
              </div>
              <input type="file" @change="handleFileChange" class="text-sm" />
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
              type="button"
              @click="resetForm"
              class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Listado en cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in portfolios"
          :key="item.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
        >
          <div class="mb-3">
            <img
              v-if="item.img_portfolio"
              :src="item.img_portfolio"
              alt="portfolio"
              class="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 class="text-lg font-bold text-gray-800">{{ item.name_portfolio }}</h3>
          </div>
          <p class="text-xs text-gray-500 mb-4">
            Categoría: {{ item.category?.title_portfolio_category || "Sin categoría" }}
          </p>
          <div class="flex gap-2 justify-end">
            <button
              @click="editItem(item)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="removeItem(item.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
        <div v-if="portfolios.length === 0" class="col-span-full text-center text-gray-500 py-10">
          No se encontraron portfolios.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import portfolioService from "../api/portfolioService.js";
import { getPortfolioCategories } from "../api/portfolioCategoriesService.js";

const portfolios = ref([]);
const categories = ref([]);
const isCreating = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name_portfolio: "",
  portfolio_category_id: "",
  img_portfolio: null,
  imgPreview: null,
});

const fetchPortfolios = async () => {
  try {
    portfolios.value = await portfolioService.getPortfolios();
  } catch (error) {
    console.error("Error al cargar portfolios:", error);
  }
};

const fetchCategories = async () => {
  try {
    categories.value = await getPortfolioCategories();
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

const showCreateForm = () => {
  resetForm();
  isCreating.value = true;
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.img_portfolio = file;
  form.value.imgPreview = URL.createObjectURL(file);
};

const createItem = async () => {
  try {
    const formData = new FormData();
    formData.append("name_portfolio", form.value.name_portfolio);
    formData.append("portfolio_category_id", form.value.portfolio_category_id);
    if (form.value.img_portfolio) {
      formData.append("img_portfolio", form.value.img_portfolio);
    }

    await portfolioService.createPortfolio(formData);
    await fetchPortfolios();
    resetForm();
  } catch (error) {
    console.error("Error al crear portfolio:", error);
  }
};

const editItem = (item) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = item.id;
  form.value.name_portfolio = item.name_portfolio;
  form.value.portfolio_category_id = item.portfolio_category_id;
  form.value.imgPreview = item.img_portfolio;
  form.value.img_portfolio = null;
};

const updateItem = async () => {
  try {
    const formData = new FormData();
    formData.append("name_portfolio", form.value.name_portfolio);
    formData.append("portfolio_category_id", form.value.portfolio_category_id);
    if (form.value.img_portfolio) {
      formData.append("img_portfolio", form.value.img_portfolio);
    }
    await portfolioService.updatePortfolio(editingId.value, formData);
    await fetchPortfolios();
    resetForm();
  } catch (error) {
    console.error("Error al actualizar portfolio:", error);
  }
};

const removeItem = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este portfolio?")) return;
  try {
    await portfolioService.deletePortfolio(id);
    await fetchPortfolios();
  } catch (error) {
    console.error("Error al eliminar portfolio:", error);
  }
};

const resetForm = () => {
  isCreating.value = false;
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    name_portfolio: "",
    portfolio_category_id: "",
    img_portfolio: null,
    imgPreview: null,
  };
};

onMounted(() => {
  fetchPortfolios();
  fetchCategories();
});
</script>