<!--Navbar.vue-->
<template>
  <header class="bg-white shadow-md p-4 flex items-center justify-between md:justify-end">
    <!-- Botón hamburguesa (solo móvil) -->
    <button
      @click="$emit('toggleSidebar')"
      class="md:hidden text-gray-700 focus:outline-none"
    >
      ☰
    </button>

    <!-- Usuario -->
    <div class="flex items-center space-x-2">
      <span class="font-medium text-gray-700">Admin</span>
      <img src="https://scontent.fjau1-1.fna.fbcdn.net/v/t39.30808-1/451816202_2169412136763470_1188529948543286866_n.jpg?stp=c0.21.689.689a_dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHUik4JM3FNU7UauCExI36FP6MUstZok5A_oxSy1miTkN8mU-YD-EKtU8r1ljyC_xCx5xpHluBLfs90ptPqEqQU&_nc_ohc=t8yi3INo3bAQ7kNvwHq0C0_&_nc_oc=Adnb5Fytihz2KW9Neu-Vr7FhW-iGLtejP8RagUDwyzdbcVf1-Qi5yWGXCmGztTqN7D8&_nc_zt=24&_nc_ht=scontent.fjau1-1.fna&_nc_gid=0vbxQ0AJwz78vZK-xHymkA&oh=00_AfacJgyhB4yKKBQhOXFdkAU9YDDriUNAt8S9ChsxmkcPng&oe=68C9DA97" alt="avatar" class="w-8 h-8 rounded-full border" />
    </div>
  </header>
</template>
