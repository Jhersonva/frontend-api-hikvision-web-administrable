<template>
  <div class="p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Productos
        </h2>
        <button
          @click="openForm()"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          ➕ Agregar Producto
        </button>
      </div>

      <!-- Formulario (Crear/Editar) -->
      <div
        v-if="showForm"
        class="mb-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
      >
        <h3 class="text-xl font-semibold mb-4">
          {{ editMode ? "Editar Producto" : "Agregar Producto" }}
        </h3>
        <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              v-model="form.name_product"
              type="text"
              required
              class="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

        <!-- Categoría -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Categoría</label>
            <select
                v-model="form.category_product_id"
                required
                class="w-full mt-1 px-3 py-2 border rounded-lg"
            >
                <!-- Opción por defecto "Seleccione categoría" -->
                <option disabled value="">Seleccione categoría</option>
                <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
                >
                {{ cat.name_category_products }}
                </option>
            </select>
        </div>

          <!-- Estado oferta -->
        <div class="col-span-2 flex items-center gap-2 mt-2">
        <input
            type="checkbox"
            v-model="form.state_offer"
            true-value="true"
            false-value="false"
        />
        <label class="text-sm font-medium text-gray-700">Está en oferta</label>
        </div>

        <!-- Precio Normal -->
        <div>
        <label class="block text-sm font-medium text-gray-700">Precio Normal</label>
        <input
            v-model="form.not_offer_price"
            type="number"
            step="0.01"
            required
            class="w-full mt-1 px-3 py-2 border rounded-lg"
        />
        </div>

        <!-- Precio Oferta -->
        <div>
        <label class="block text-sm font-medium text-gray-700">Precio Oferta</label>
        <input
            v-model="form.offer_price"
            type="number"
            step="0.01"
            :required="form.state_offer === 'true'"
            :disabled="form.state_offer === 'false'"
            :placeholder="form.state_offer === 'true' ? 'Ingrese precio oferta' : 'No aplica'"
            class="w-full mt-1 px-3 py-2 border rounded-lg"
        />
        </div>

          <!-- Calidad -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Calidad ⭐</label>
            <select
              v-model="form.star_quality"
              required
              class="w-full mt-1 px-3 py-2 border rounded-lg"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <!-- Imagen -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700">Imagen</label>
            <input
              type="file"
              @change="handleImageUpload"
              class="w-full mt-1"
            />
            <div v-if="formPreview" class="mt-2">
              <img :src="formPreview" class="w-32 h-32 object-cover rounded-lg border" />
            </div>
          </div>

          <!-- Botones -->
          <div class="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              @click="closeForm"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              💾 Guardar
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
              <th class="px-6 py-3">Imagen</th>
              <th class="px-6 py-3">Nombre</th>
              <th class="px-6 py-3">Categoría</th>
              <th class="px-6 py-3">Precio Normal</th>
              <th class="px-6 py-3">Precio Oferta</th>
              <th class="px-6 py-3">Calidad ⭐</th>
              <th class="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-6 py-3">{{ index + 1 }}</td>
              <td class="px-6 py-3">
                <img
                  v-if="product.img_product"
                  :src="product.img_product"
                  alt="Imagen Producto"
                  class="w-16 h-16 object-cover rounded-lg border"
                />
                <span v-else class="text-gray-400">Sin imagen</span>
              </td>
              <td class="px-6 py-3 font-medium text-gray-900">
                {{ product.name_product }}
              </td>
              <td class="px-6 py-3">{{ product.category_product }}</td>
              <td class="px-6 py-3">S/ {{ product.not_offer_price }}</td>
              <td class="px-6 py-3 text-green-600 font-semibold">
               <span v-if="product.state_offer === 'true'">S/ {{ product.offer_price }}</span>
               <span v-else class="text-gray-400">No aplica</span>
              </td>

              <td class="px-6 py-3">{{ product.star_quality }} ⭐</td>
              <td class="px-6 py-3 text-center flex justify-center gap-2">
                <button
                    @click="editProduct(product)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-1 py-1 rounded-lg"
                >
                    ✏ Editar
                </button>
                <button
                    @click="deleteProduct(product.id)"
                    class="bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded-lg"
                >
                    🗑 Eliminar
                </button>

                <!-- Nuevo botón Ver Detalle -->
                <router-link
                    :to="{
                    name: 'productDetail',
                    params: { id: product.id },
                    query: { name: product.name_product }
                    }"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 rounded-lg"
                >
                    🔍 Ver Detalle
                </router-link>
                <router-link
                    :to="{ name: 'productInstallation', params: { id: product.id }, query: { name: product.name_product } }"
                    class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg"
                    >
                    ⚙️ Ver Instalación
                </router-link>
                </td>
            </tr>

            <!-- Mensaje si no hay productos -->
            <tr v-if="products.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                No hay productos disponibles.
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
import ProductsService from "../api/productsService";
import ProductCategoriesService from "../api/productCategoriesService";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      categories: [],
      message: "",
      showForm: false,
      editMode: false,
      form: {
        id: null,
        name_product: "",
        category_product_id: "",
        not_offer_price: "",
        offer_price: "",
        star_quality: 1,
        state_offer: "false",
        img_product: null,
      },
      formPreview: null,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await ProductsService.getAll();
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    async fetchCategories() {
      try {
        this.categories = await ProductCategoriesService.getAll();
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.form.img_product = file;
      this.formPreview = URL.createObjectURL(file);
    },
    openForm() {
      this.resetForm();
      this.showForm = true;
      this.editMode = false;
    },
    closeForm() {
      this.showForm = false;
      this.resetForm();
    },
    editProduct(product) {
      this.form = {
        id: product.id,
        name_product: product.name_product,
        category_product_id: this.categories.find(
          (cat) => cat.name_category_products === product.category_product
        )?.id || null,
        not_offer_price: product.not_offer_price,
        offer_price: product.offer_price,
        star_quality: product.star_quality,
        state_offer: product.state_offer,
        img_product: null,
      };
      this.formPreview = product.img_product;
      this.showForm = true;
      this.editMode = true;
    },
    async submitForm() {
    try {
        if (this.form.state_offer === "true" && (!this.form.not_offer_price || !this.form.offer_price)) {
        alert("Debe ingresar Precio Normal y Precio Oferta porque el producto está en oferta.");
        return;
        }

        if (this.form.state_offer === "false") {
        this.form.offer_price = null; 
        }

        if (this.editMode) {
        await ProductsService.update(this.form.id, this.form);
        this.message = "Producto actualizado correctamente";
        } else {
        await ProductsService.create(this.form);
        this.message = "Producto creado correctamente";
        }

        this.fetchProducts();
        this.closeForm();
    } catch (error) {
        console.error("Error al guardar producto:", error);
    }
    },
    async deleteProduct(id) {
      if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
      try {
        const response = await ProductsService.delete(id);
        this.message = response.message;
        this.fetchProducts();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    },
    resetForm() {
      this.form = {
        id: null,
        name_product: "",
        category_product_id: "",
        not_offer_price: "",
        offer_price: "",
        star_quality: 1,
        state_offer: "false",
        img_product: null,
      };
      this.formPreview = null;
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>