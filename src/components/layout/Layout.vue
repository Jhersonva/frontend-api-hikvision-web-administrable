<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar :isOpen="isOpen" @toggle="toggleSidebar" />
    <!-- Contenido principal -->
    <div class="flex-1 bg-gray-100">
        <!-- Navbar -->
        <Navbar @toggleSidebar="toggleSidebar" />

      <!-- Aquí se muestra el contenido (dashboard, users, etc.) -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

const isOpen = ref(false);
const toggleSidebar = () => (isOpen.value = !isOpen.value);
</script>
