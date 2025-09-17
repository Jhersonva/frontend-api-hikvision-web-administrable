<template>
  <div class="p-6">
    <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 border">

        <!-- Botón Volver -->
      <div class="mb-4">
        <button
          @click="goBack"
          class="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 5l-7 7 7 7"></path>
          </svg>
          Volver a Productos
        </button>
      </div>

      <!-- Encabezado -->
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Detalle del Producto: {{ productName }}
      </h2>

      <!-- Formulario ProductDetail -->
      <form @submit.prevent="saveProductDetail" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Descripción</label>
          <textarea
            v-model="form.description_product_detail"
            rows="3"
            class="w-full mt-1 px-3 py-2 border rounded-lg"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium">Imagen</label>
          <input type="file" @change="onImageChange" class="w-full mt-1" />
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" class="w-32 h-32 object-cover rounded-lg border" />
          </div>
        </div>

        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          💾 Guardar Detalle
        </button>
      </form>

      <!-- Sección WhatIncludes -->
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-3">What Includes</h3>

        <!-- Form agregar -->
        <div class="flex gap-2 mb-4">
          <input
            v-model="newInclude"
            type="text"
            placeholder="Nuevo item"
            class="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            @click="addInclude"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            ➕ Agregar
          </button>
        </div>

        <!-- Lista de items -->
        <ul class="space-y-2">
          <li
            v-for="(item, index) in whatIncludes"
            :key="index"
            class="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <input
              v-if="editingIndex === index"
              v-model="editValue"
              type="text"
              class="flex-1 px-2 py-1 border rounded-lg"
            />
            <span v-else>{{ item }}</span>

            <div class="flex gap-2 ml-4">
              <button
                v-if="editingIndex === index"
                @click="updateInclude(index)"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
              >
                💾
              </button>
              <button
                v-else
                @click="startEdit(index, item)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
              >
                ✏
              </button>
              <button
                @click="deleteInclude(index)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                🗑
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Mensajes -->
      <div v-if="message" class="mt-4 p-3 rounded-lg bg-green-100 text-green-800">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  createProductDetail,
  updateProductDetail,
  getProductDetail,
  getWhatIncludes,
  addWhatInclude,
  updateWhatInclude,
  deleteWhatInclude,
} from "../api/productDetailService";

export default {
 props: {
    productId: { type: Number, required: true },
    productName: { type: String, default: "" },
  },
  data() {
    return {
      form: {
        id: null,
        description_product_detail: "",
        img_product_detail: null,
      },
      previewImage: null,
      whatIncludes: [],
      newInclude: "",
      editingIndex: null,
      editValue: "",
      message: "",
    };
  },
  methods: {
    async loadProductDetail() {
      try {
        const res = await getProductDetail(this.productId);

        if (res.data) {
          this.form.id = res.data.id;
          this.form.description_product_detail = res.data.description_product_detail || "";
          this.previewImage = res.data.img_product_detail_url || null;
          this.whatIncludes = res.data.what_includes || [];
        }
      } catch (error) {
        console.error("Error al cargar detalle:", error);
      }
    },

    async saveProductDetail() {
      try {
        const formData = new FormData();
        formData.append("description_product_detail", this.form.description_product_detail);
        if (this.form.img_product_detail) {
        formData.append("img_product_detail", this.form.img_product_detail);
        }

        let res;
        if (!this.form.id) {
        res = await createProductDetail(this.productId, formData);
        } else {
        res = await updateProductDetail(this.form.id, formData); 
        }

        this.message = "Detalle guardado correctamente";
        this.form.id = res.data.id;
      } catch (error) {
        console.error(error);
        this.message = "Error al guardar detalle";
      }
    },

    onImageChange(e) {
      const file = e.target.files[0];
      this.form.img_product_detail = file;
      this.previewImage = URL.createObjectURL(file);
    },

    async loadWhatIncludes() {
      try {
        const res = await getWhatIncludes(this.productId);
        this.whatIncludes = res.data.what_includes;
      } catch (error) {
        console.error(error);
      }
    },

    async addInclude() {
      if (!this.newInclude) return;
      try {
        const res = await addWhatInclude(this.productId, this.newInclude);
        this.whatIncludes = res.data.what_includes;
        this.newInclude = "";
      } catch (error) {
        console.error(error);
      }
    },

    startEdit(index, value) {
      this.editingIndex = index;
      this.editValue = value;
    },

    async updateInclude(index) {
      try {
        const res = await updateWhatInclude(this.productId, index, this.editValue);
        this.whatIncludes = res.data.what_includes;
        this.editingIndex = null;
        this.editValue = "";
      } catch (error) {
        console.error(error);
      }
    },

    async deleteInclude(index) {
      try {
        const res = await deleteWhatInclude(this.productId, index);
        this.whatIncludes = res.data.what_includes;
      } catch (error) {
        console.error(error);
      }
    },
        goBack() {
    this.$router.back();
    }
  },
  mounted() {
    this.loadProductDetail(); 
  },
};
</script>