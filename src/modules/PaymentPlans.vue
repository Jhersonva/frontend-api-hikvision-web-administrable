<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Planes de Pago
      </h2>
      <button
        @click="showCreateForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
      >
        ➕ Nuevo Plan
      </button>
    </div>

    <!-- Formulario -->
    <div
      v-if="isFormVisible"
      class="bg-white p-6 rounded-2xl shadow-md border mb-6"
    >
      <h3 class="text-lg font-semibold mb-4">
        {{ isEditing ? "Editar Plan" : "Agregar Plan" }}
      </h3>
      <form
        @submit.prevent="handleSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          v-model="form.name_plan"
          type="text"
          placeholder="Nombre del plan"
          class="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <input
          v-model="form.price_plan"
          type="number"
          placeholder="Precio"
          step="0.01"
          class="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <!-- Campo de listas -->
        <textarea
          v-model="listInput"
          @input="updateList"
          placeholder="Lista de beneficios (uno por línea)"
          rows="3"
          class="col-span-2 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>

        <!-- Campo de imagen -->
        <div class="col-span-2">
          <label class="block mb-2 font-semibold text-gray-700">Icono del Plan</label>
          <input
            type="file"
            @change="handleFileChange"
            class="col-span-2 border px-4 py-2 rounded-lg"
            />
          <div v-if="previewImage" class="mt-3">
            <img
              :src="previewImage"
              alt="preview"
              class="h-20 rounded-md shadow-md"
            />
          </div>
        </div>

        <div class="col-span-2 flex gap-3 mt-4">
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
    <div class="overflow-x-auto bg-white rounded-2xl shadow-md border">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 border-b">ID</th>
            <th class="px-6 py-3 border-b">Nombre</th>
            <th class="px-6 py-3 border-b">Precio</th>
            <th class="px-6 py-3 border-b">Beneficios</th>
            <th class="px-6 py-3 border-b">Icono</th>
            <th class="px-6 py-3 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="plan in paymentPlans"
            :key="plan.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-3 border-b">{{ plan.id }}</td>
            <td class="px-6 py-3 border-b font-medium text-gray-800">
              {{ plan.name_plan }}
            </td>
            <td class="px-6 py-3 border-b font-semibold text-green-600">
              $ {{ plan.price_plan }}
            </td>
            <td class="px-6 py-3 border-b">
              <ul class="list-disc list-inside text-gray-700">
                <li v-for="(item, i) in plan.list_plan" :key="i">{{ item }}</li>
              </ul>
            </td>
            <td class="px-6 py-3 border-b">
              <img
                v-if="plan.icon_img_payment_plan"
                :src="plan.icon_img_payment_plan"
                alt="icono"
                class="h-12 w-12 object-cover rounded-md shadow-md"
              />
              <span v-else class="text-gray-400">Sin icono</span>
            </td>
            <td class="px-6 py-3 border-b text-center space-x-2">
              <button
                @click="editPlan(plan)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg shadow transition-all duration-200"
              >
                ✏️ Editar
              </button>
              <button
                @click="removePlan(plan.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow transition-all duration-200"
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
          <tr v-if="paymentPlans.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-500">
              No hay planes registrados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import paymentPlanService from "../api/paymentPlanService";

const paymentPlans = ref([]);
const selectedFile = ref(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.icon_img_payment_plan = file;
    previewImage.value = URL.createObjectURL(file);
  }
};


const form = ref({
  name_plan: "",
  price_plan: "",
  list_plan: [],
  icon_img_payment_plan: null,
});
const listInput = ref("");
const isEditing = ref(false);
const editingId = ref(null);
const isFormVisible = ref(false);
const previewImage = ref(null);

// Cargar planes
const fetchPlans = async () => {
  try {
    paymentPlans.value = await paymentPlanService.getAll();
  } catch (error) {
    console.error("❌ Error al cargar planes:", error);
  }
};
onMounted(fetchPlans);

// Actualizar lista de beneficios
const updateList = () => {
  form.value.list_plan = listInput.value
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");
};

// Manejo de imagen
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.icon_img_payment_plan = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// Mostrar formulario
const showCreateForm = () => {
  resetForm();
  isFormVisible.value = true;
};

// Guardar o actualizar
const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await paymentPlanService.update(editingId.value, form.value);
    } else {
      await paymentPlanService.create(form.value);
    }

    await fetchPlans();
    cancelForm();
  } catch (error) {
    console.error("❌ Error al guardar plan:", error.response?.data || error);
  }
};

// Editar
const editPlan = (plan) => {
  form.value = {
    name_plan: plan.name_plan,
    price_plan: plan.price_plan,
    list_plan: plan.list_plan,
    icon_img_payment_plan: null,   
  };
  listInput.value = plan.list_plan.join("\n");
  previewImage.value = plan.icon_img_payment_plan;
  isEditing.value = true;
  editingId.value = plan.id;
  isFormVisible.value = true;
};

// Cancelar
const cancelForm = () => {
  resetForm();
  isFormVisible.value = false;
};

// Eliminar
const removePlan = async (id) => {
  if (confirm("¿Seguro que quieres eliminar este plan?")) {
    await paymentPlanService.delete(id);
    await fetchPlans();
  }
};

// Resetear formulario
const resetForm = () => {
  form.value = {
    name_plan: "",
    price_plan: "",
    list_plan: [],
    icon_img_payment_plan: null,
  };
  listInput.value = "";
  previewImage.value = null;
  isEditing.value = false;
  editingId.value = null;
};
</script>
