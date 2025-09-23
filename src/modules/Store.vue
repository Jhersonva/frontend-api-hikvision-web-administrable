<template>
  <div class="p-6">
    <div
      class="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6"
    >
      <!-- Encabezado -->
      <h2
        class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2"
      >
        <span class="inline-block w-2 h-8 bg-purple-600 rounded"></span>
        Configuración de Tienda
      </h2>

      <!-- Formulario -->
      <form @submit.prevent="saveStore" class="space-y-4">
        <!-- Imagen -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Imagen de Descuento</label
          >
          <input
            type="file"
            @change="onImageChange"
            class="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                   file:border-0 file:text-sm file:font-semibold
                   file:bg-purple-50 file:text-purple-600
                   hover:file:bg-purple-100
                   cursor-pointer text-sm text-gray-500"
          />
          <div v-if="previewImage || store.img_store_discount" class="mt-3">
            <img
              :src="previewImage || store.img_store_discount"
              alt="Imagen de descuento"
              class="w-40 h-40 object-cover rounded-lg border shadow-sm"
            />
          </div>
        </div>

        <!-- Rango de Precios -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Precio Inicial</label
            >
            <input
              v-model="form.range_price_start"
              type="number"
              min="0"
              class="w-full px-3 py-2 border rounded-lg shadow-sm 
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                     transition-all duration-200 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Precio Final</label
            >
            <input
              v-model="form.range_price_end"
              type="number"
              min="0"
              class="w-full px-3 py-2 border rounded-lg shadow-sm 
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                     transition-all duration-200 outline-none"
            />
          </div>
        </div>

        <!-- Botón Guardar -->
        <button
          type="submit"
          class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 
                 text-white px-6 py-2 rounded-lg shadow-md font-medium 
                 transition-all duration-200"
        >
          💾 Guardar Configuración
        </button>
      </form>

      <!-- Mensaje -->
      <div
        v-if="message"
        class="mt-4 p-3 rounded-lg bg-green-100 text-green-800 shadow-md border border-green-300"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import storeService from "../api/storeService";

export default {
  name: "Store",
  data() {
    return {
      store: {
        id: null,
        img_store_discount: null,
        range_price_start: 0,
        range_price_end: 0,
      },
      form: {
        img_store_discount: null,
        range_price_start: 0,
        range_price_end: 0,
      },
      previewImage: null,
      message: "",
    };
  },
  methods: {
    async fetchStore() {
      try {
        const { data } = await storeService.getStore();
        this.store = data;
        this.form.range_price_start = data.range_price_start;
        this.form.range_price_end = data.range_price_end;
      } catch (error) {
        console.error("Error al obtener la configuración de la tienda:", error);
      }
    },
    onImageChange(e) {
      const file = e.target.files[0];
      this.form.img_store_discount = file;
      this.previewImage = URL.createObjectURL(file);
    },
    async saveStore() {
      try {
        const response = await storeService.updateStore(this.form);
        this.message = response.data.message;
        this.store = response.data.store;
        this.previewImage = null;
      } catch (error) {
        console.error("Error al actualizar la tienda:", error);
        this.message = "Error al actualizar configuración";
      }
    },
  },
  mounted() {
    this.fetchStore();
  },
};
</script>
