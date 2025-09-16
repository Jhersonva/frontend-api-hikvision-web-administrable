<!-- modules/FormContact.vue-->
<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-purple-600 rounded"></span>
        Formularios de Contacto
      </h2>

      <!-- Tabla -->
      <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table class="w-full text-sm text-left text-gray-600">
          <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th class="px-6 py-3">#</th>
              <th class="px-6 py-3">Nombre</th>
              <th class="px-6 py-3">Email</th>
              <th class="px-6 py-3">Asunto</th>
              <th class="px-6 py-3">Mensaje</th>
              <th class="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(form, index) in contactForms"
              :key="form.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-6 py-3">{{ index + 1 }}</td>
              <td class="px-6 py-3 font-medium text-gray-900">{{ form.customer_name }}</td>
              <td class="px-6 py-3">{{ form.email }}</td>
              <td class="px-6 py-3">{{ form.affair }}</td>
              <td class="px-6 py-3">{{ form.message }}</td>
              <td class="px-6 py-3 text-center">
                <button
                  @click="deleteForm(form.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow transition-all duration-200"
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
            <tr v-if="contactForms.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No hay formularios de contacto disponibles.
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
import { getContactForms, deleteContactForm } from "../api/contactFormService";

export default {
  name: "FormContact",
  data() {
    return {
      contactForms: [],
      message: "",
    };
  },
  methods: {
    async fetchForms() {
      try {
        this.contactForms = await getContactForms();
      } catch (error) {
        console.error("Error al cargar formularios:", error);
      }
    },
    async deleteForm(id) {
      if (confirm("¿Estás seguro de eliminar este formulario?")) {
        try {
          const response = await deleteContactForm(id);
          this.message = response.message;
          this.fetchForms();
        } catch (error) {
          console.error("Error al eliminar formulario:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchForms();
  },
};
</script>
