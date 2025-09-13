<!--Layout.vue-->
<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar con scroll propio -->
    <div class="h-full overflow-y-auto">
      <Sidebar :isOpen="isOpen" @toggle="toggleSidebar" />
    </div>

    <!-- Contenido principal con scroll propio -->
    <div class="flex-1 flex flex-col bg-gray-100 overflow-hidden">
      <!-- Navbar fijo -->
      <Navbar @toggleSidebar="toggleSidebar" />

      <!-- Contenido scrolleable -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
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
