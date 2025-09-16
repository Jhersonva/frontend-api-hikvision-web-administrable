<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Información de Contacto
      </h2>

      <!-- Formulario -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Título -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Título</label>
            <input
              v-model="form.main_title"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Descripción</label>
            <textarea
              v-model="form.main_description"
              rows="3"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <!-- Latitud -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Latitud</label>
            <input
              v-model="form.latitud_map"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Longitud -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Longitud</label>
            <input
              v-model="form.longitud_map"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Botones -->
          <div class="flex justify-end gap-2">
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              💾 Guardar
            </button>
          </div>
        </form>
      </div>

      <!-- Mensaje -->
      <div v-if="message" class="mt-4 p-3 rounded-lg bg-green-100 text-green-800">
        {{ message }}
      </div>

      <!-- Mapa -->
      <div v-if="form.latitud_map && form.longitud_map" class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Ubicación en el mapa</h3>
        <iframe
          class="w-full h-80 rounded-xl shadow-md border"
          :src="mapUrl"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { getContact, updateContact } from "../api/contactService";

export default {
  name: "Contact",
  data() {
    return {
      form: {
        main_title: "",
        main_description: "",
        latitud_map: "",
        longitud_map: "",
      },
      message: "",
    };
  },
  computed: {
    mapUrl() {
      if (this.form.latitud_map && this.form.longitud_map) {
        return `https://www.google.com/maps?q=${this.form.latitud_map},${this.form.longitud_map}&hl=es&z=15&output=embed`;
      }
      return "";
    },
  },
  methods: {
    async fetchContact() {
      try {
        const data = await getContact();
        this.form = { ...data };
      } catch (error) {
        console.error("Error al obtener contacto:", error);
      }
    },
    async handleSubmit() {
      try {
        const response = await updateContact(this.form);
        this.message = response.message;
      } catch (error) {
        console.error("Error al actualizar contacto:", error);
      }
    },
  },
  mounted() {
    this.fetchContact();
  },
};
</script>
