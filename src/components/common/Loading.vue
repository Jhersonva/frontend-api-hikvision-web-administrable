<template>
  <div class="flex items-center justify-center h-screen bg-gray-950 text-white text-xl font-bold">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: "Cargando..." }
});
</script>