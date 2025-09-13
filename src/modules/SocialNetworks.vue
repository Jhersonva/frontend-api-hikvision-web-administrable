<!-- src/modules/SocialNetworks.vue -->
<template>
  <div class="p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Redes Sociales
        </h2>
        <button
          @click="showCreateForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          ➕ Nueva Red Social
        </button>
      </div>

      <!-- Formulario flotante -->
      <div
        v-if="isEditing || isCreating"
        class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-6 transition-all duration-300"
      >
        <form @submit.prevent="isEditing ? updateNetwork() : createNetwork()" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Nombre</label>
            <input
              v-model="form.name_social_networks"
              type="text"
              placeholder="Facebook, Instagram..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- URL -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">URL del perfil</label>
            <input
              v-model="form.profile_url"
              type="url"
              placeholder="https://example.com"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Icono -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Ícono</label>
            <div class="flex items-center gap-6">
              <div
                class="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
              >
                <img
                  v-if="form.iconPreview"
                  :src="form.iconPreview"
                  alt="icon preview"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-gray-400 text-sm">Sin ícono</span>
              </div>
              <div class="flex flex-col gap-2">
                <button
                  type="button"
                  class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg"
                  @click="showImagePicker = true"
                >
                  📂 Elegir imagen existente
                </button>
                <p class="text-xs text-gray-500 mt-1">Formatos: JPG, PNG, SVG</p>
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

      <!-- Listado de redes sociales en cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="network in socialNetworks"
          :key="network.id"
          class="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
              <img
                :src="network.icon_img_url"
                alt="icon"
                class="w-full h-full object-contain"
              />
            </div>
            <h3 class="text-lg font-bold text-gray-800">{{ network.name_social_networks }}</h3>
          </div>
          <p class="text-gray-600 text-sm break-all mb-4">{{ network.profile_url }}</p>
          <div class="flex gap-2 justify-end">
            <button
              @click="editNetwork(network)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              ✏️ Editar
            </button>
            <button
              @click="deleteNetwork(network.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
        <div v-if="socialNetworks.length === 0" class="col-span-full text-center text-gray-500 py-10">
          No se encontraron redes sociales.
        </div>
      </div>
    </div>

    <!-- Modal para elegir imagen existente -->
    <div v-if="showImagePicker" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-3xl w-full overflow-auto max-h-[80vh]">
        <h3 class="text-lg font-bold mb-4">Selecciona una imagen</h3>

        <div v-for="cat in imageCategories" :key="cat.id" class="mb-4">
          <h4 class="font-semibold mb-2">{{ cat.name }}</h4>
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="img in categoryImages.filter(i => i.category === cat.name)"
              :key="img.id"
              class="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg"
              @click="selectIcon(img.file_url)"
            >
              <img :src="img.file_url" class="w-full h-20 object-cover" />
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button @click="showImagePicker = false" class="bg-red-500 text-white px-4 py-2 rounded-lg">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getSocialNetworks,
  createSocialNetwork,
  updateSocialNetwork,
  deleteSocialNetwork,
} from "../api/socialNetworks";
import { getImageCategories } from "../api/imageCategories";
import { getImages } from "../api/images";

// Redes sociales
const socialNetworks = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const editingId = ref(null);
const form = ref({
  name_social_networks: "",
  profile_url: "",
  icon_file: null,
  iconPreview: null,
});

// Categorías e imágenes
const imageCategories = ref([]);
const categoryImages = ref([]);
const showImagePicker = ref(false);

// Fetch data
const fetchNetworks = async () => {
  try {
    const { data } = await getSocialNetworks();
    socialNetworks.value = data;
  } catch (error) {
    console.error("❌ Error fetching social networks:", error);
  }
};

const fetchImageCategoriesAndImages = async () => {
  try {
    const { data: categories } = await getImageCategories();
    imageCategories.value = categories;
    const { data: images } = await getImages();
    categoryImages.value = images;
  } catch (error) {
    console.error("❌ Error fetching images/categories:", error);
  }
};

// Form actions
const showCreateForm = () => {
  isCreating.value = true;
  isEditing.value = false;
  form.value = { name_social_networks: "", profile_url: "", icon_file: null, iconPreview: null };
};

const selectIcon = (url) => {
  form.value.iconPreview = url;
  form.value.icon_file = null; 
  showImagePicker.value = false;
};

const createNetwork = async () => {
  try {
    const formData = new FormData();
    formData.append("name_social_networks", form.value.name_social_networks);
    formData.append("profile_url", form.value.profile_url);
    if (form.value.icon_file) formData.append("icon_img", form.value.icon_file);
    else if (form.value.iconPreview) formData.append("icon_url", form.value.iconPreview);
    await createSocialNetwork(formData);
    await fetchNetworks();
    resetForm();
  } catch (error) {
    console.error("❌ Error creating social network:", error);
  }
};

const editNetwork = (network) => {
  isEditing.value = true;
  isCreating.value = false;
  editingId.value = network.id;
  form.value.name_social_networks = network.name_social_networks;
  form.value.profile_url = network.profile_url;
  form.value.iconPreview = network.icon_img_url;
  form.value.icon_file = null;
};

const updateNetwork = async () => {
  try {
    const formData = new FormData();
    formData.append("name_social_networks", form.value.name_social_networks);
    formData.append("profile_url", form.value.profile_url);
    if (form.value.icon_file) formData.append("icon_img", form.value.icon_file);
    else if (form.value.iconPreview) formData.append("icon_url", form.value.iconPreview);
    await updateSocialNetwork(editingId.value, formData);
    await fetchNetworks();
    resetForm();
  } catch (error) {
    console.error("❌ Error updating social network:", error);
  }
};

const deleteNetwork = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar esta red social?")) return;
  try {
    await deleteSocialNetwork(id);
    await fetchNetworks();
  } catch (error) {
    console.error("❌ Error deleting social network:", error);
  }
};

const resetForm = () => {
  isEditing.value = false;
  isCreating.value = false;
  editingId.value = null;
  form.value = { name_social_networks: "", profile_url: "", icon_file: null, iconPreview: null };
};

onMounted(() => {
  fetchNetworks();
  fetchImageCategoriesAndImages();
});
</script>
