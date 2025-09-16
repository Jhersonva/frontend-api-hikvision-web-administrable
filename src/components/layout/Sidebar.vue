<!-- Sidebar.vue -->
<template>
  <div
    :class="[ 
      'bg-gray-950 text-gray-200 w-64 flex flex-col shadow-xl transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-64',
      'fixed md:static inset-y-0 left-0 z-50 md:translate-x-0 h-screen'
    ]"
  >
    <!-- Logo / Branding -->
    <div class="flex flex-col items-center justify-center py-8 border-b border-gray-800">
      <div class="w-20 h-20 flex items-center justify-center rounded-full border-4 border-blue-500 bg-gray-800 shadow-md">
        <img
          src="https://scontent.fjau1-1.fna.fbcdn.net/v/t39.30808-1/514250673_122121261242932985_5564641991239268251_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGHY74BaBGrRH6K9WOTQbbk7E8jKWpudYzsTyMpam51jAeLIRpFdAeB-aB9lOL2GWnVrrg3YmUHr1dn8mWpserU&_nc_ohc=jh6dqAhjZ1MQ7kNvwFCLfzi&_nc_oc=AdmuyRHZcJQCKmFSdaQo4a06t8aG0ddNIpmjXd512pv_2IXMa--iJBtU9evxix9wCCY&_nc_zt=24&_nc_ht=scontent.fjau1-1.fna&_nc_gid=1vNo8-GPMeKGCQgHP9SamQ&oh=00_Afa0DFFQdUasqu2cX0gfhNXlyH-xwWqLmyYdMtz7oztyQA&oe=68CDE24E"
          alt="logo"
          class="w-18 h-18 rounded-full border-2 border-white object-cover"
        />
      </div>
      <h1 class="mt-3 text-lg font-semibold text-gray-100">HikVision</h1>
      <p class="text-xs text-gray-400">Panel Administrativo</p>
    </div>

    <!-- Menú -->
    <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      <div v-for="item in menu" :key="item.label">
        <!-- Grupo con subsecciones siempre visibles -->
        <div v-if="item.group">
          <p class="px-3 py-2 text-gray-400 uppercase text-xs tracking-wider">
            {{ item.label }}
          </p>
          <div class="ml-2 space-y-1 border-l border-gray-700 pl-3">
            <router-link
              v-for="child in item.children"
              :key="child.path"
              :to="`/app/${child.path}`"
              class="block px-3 py-2 rounded-md text-sm transition hover:bg-gray-800"
              active-class="bg-blue-600 text-white font-semibold shadow-md"
            >
              {{ child.label }}
            </router-link>
          </div>
        </div>

        <!-- Item simple -->
        <router-link
          v-else
          :to="`/app/${item.path}`"
          class="block px-3 py-2 rounded-md font-medium transition hover:bg-gray-800"
          active-class="bg-blue-600 text-white font-semibold shadow-md"
        >
          {{ item.label }}
        </router-link>
      </div>
    </nav>

    <!-- Botón Salir fijo -->
    <div class="p-4 bg-gray-950 border-t border-gray-800 sticky bottom-0">
      <button
        @click="logout"
        class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-white font-semibold shadow-md"
      >
        Salir
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ isOpen: Boolean });
defineEmits(["toggle"]);

const logout = () => {
  alert("Cerrando sesión... 🚪");
};

const menu = [
  { path: "dashboard", label: "Panel" },
  {
    group: true,
    label: "Sección de Empleados",
    children: [{ path: "users", label: "Usuarios" }],
  },
  {
    group: true,
    label: "Información de la Empresa",
    children: [
      { path: "contact_information_company", label: "Datos de Contacto" },
      { path: "social_networks", label: "Redes Sociales" },
    ],
  },
  {
    group: true,
    label: "Servicios",
    children: [
      { path: "service_categories", label: "Categorías de Servicios" },
      { path: "services", label: "Servicios" },
      { path: "counter_services", label: "Counter Services" },
    ],
  },
  {
    group: true,
    label: "Portafolio",
    children: [
      { path: "portfolio_categories", label: "Categorías" },
      { path: "portfolios", label: "Proyectos" },
    ],
  },
  {
    group: true,
    label: "Productos",
    children: [
      { path: "category_products", label: "Categorías" },
      { path: "products", label: "Productos" },
      { path: "product_details", label: "Detalles" },
      { path: "product_installations", label: "Instalaciones" },
    ],
  },
  {
    group: true,
    label: "Nuestro Equipo",
    children: [
      { path: "specialty_categories", label: "Categorías de Especialidad" },
      { path: "our_teams", label: "Miembros del Equipo" },
    ],
  },
  {
    group: true,
    label: "Más Secciones",
    children: [
      { path: "information_contact", label: "Información Contacto" },
      { path: "carousels", label: "Carousels" },
      { path: "features", label: "Features" },
      { path: "about_us", label: "Sobre Nosotros" },
      { path: "video_information_and_solutions", label: "Video Informativo y Soluciones" },
      { path: "payment_plan", label: "Planes de Pago" },
      { path: "choose_us", label: "¿Por qué elegirnos?" },
      { path: "testimonials", label: "Testimonios" },
      { path: "section_titles", label: "Títulos" },
      { path: "partners", label: "Colaboradores" },
      { path: "faqs", label: "Preguntas Frecuentes" },
      { path: "banner_pages", label: "Banners" },
      { path: "blogs", label: "Blogs" },
      { path: "stores", label: "Tienda" },
      { path: "contacts", label: "Contactos" },
      { path: "contact_forms", label: "Formularios" },
      { path: "image_categories", label: "Galería de Imágenes" },
    ],
  },
];
</script>
