<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <ModuleCard :to="route.fullPath" :title="title" subtitle="Vista del módulo (placeholder)" iconBg="bg-gray-700">
        <template #icon>
          <span class="text-white text-sm">M</span>
        </template>
      </ModuleCard>

      <div class="mt-6 bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Módulo: {{ title }}</h2>
        <p class="text-gray-600">Aquí implementa la lista, creación, edición y eliminación (CRUD) usando los endpoints de tu backend.</p>
        <p class="mt-4 text-sm text-gray-500">Ruta actual: <span class="font-mono">{{ route.fullPath }}</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import ModuleCard from "./ModuleCard.vue";

const route = useRoute();
const title = route.meta.title || "Módulo";
</script>
