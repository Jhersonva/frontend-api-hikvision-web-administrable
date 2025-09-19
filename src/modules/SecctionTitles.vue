<!-- src/modules/SecctionTitles.vue -->
<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Títulos de Secciones
      </h2>

      <!-- Tabla -->
      <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table class="w-full text-sm text-left text-gray-600">
          <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th class="px-6 py-3">#</th>
              <th class="px-6 py-3">Nombre de la Sección</th>
              <th class="px-6 py-3">Descripción</th>
              <th class="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(section, index) in sections"
              :key="section.id"
              class="border-b hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-3">{{ index + 1 }}</td>
              <td class="px-6 py-3 font-medium text-gray-900">
                <input
                  v-model="section.section_name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 outline-none"
                />
              </td>
              <td class="px-6 py-3">
                <input
                  v-model="section.description"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 outline-none"
                  placeholder="Sin descripción"
                />
              </td>
              <td class="px-6 py-3 text-center">
                <button
                  @click="updateSection(section)"
                  class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                         text-white px-5 py-2 rounded-lg shadow-md font-medium 
                         transition-all duration-200"
                >
                  💾 Guardar
                </button>
              </td>
            </tr>

            <!-- Si no hay registros -->
            <tr v-if="sections.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                No hay títulos de secciones disponibles.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
import sectionTitlesService from "../api/sectionTitlesService";

export default {
  name: "SecctionTitles",
  data() {
    return {
      sections: [],
      message: "",
    };
  },
  methods: {
    async fetchSections() {
      try {
        const { data } = await sectionTitlesService.getAll();
        this.sections = data;
      } catch (error) {
        console.error("Error al obtener los títulos:", error);
      }
    },
    async updateSection(section) {
      try {
        await sectionTitlesService.update(section.id, {
          section_name: section.section_name,
          description: section.description,
        });
        this.message = `Sección ${section.id} actualizada correctamente`;
        setTimeout(() => (this.message = ""), 3000);
      } catch (error) {
        console.error("Error al actualizar sección:", error);
      }
    },
  },
  mounted() {
    this.fetchSections();
  },
};
</script>
