<!--Dashboard.vue-->
<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Panel de Control</h1>
          <p class="text-sm text-gray-500">Bienvenido — selecciona un módulo para comenzar</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ModuleCard
          v-for="m in modules"
          :key="m.path"
          :to="`/app/${m.path}`"
          :title="m.label"
          :subtitle="m.subtitle"
          :iconBg="m.color"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ModuleCard from "../components/common/ModuleCard.vue";

const modules = [
  { path: "users", label: "Users", subtitle: "Usuarios del sistema", color: "bg-red-600" },
  { path: "contact_information_company", label: "Contact Information Company", subtitle: "Datos de contacto", color: "bg-gray-700" },
  { path: "social_networks", label: "Social Networks", subtitle: "Redes sociales", color: "bg-blue-600" },
  { path: "carousels", label: "Carousels", subtitle: "Carruseles", color: "bg-gray-300" },
  { path: "features", label: "Features", subtitle: "Características", color: "bg-red-600" },
  { path: "about_us", label: "About Us", subtitle: "Acerca de", color: "bg-gray-700" },
  { path: "video_information_and_solutions", label: "Video Info & Solutions", subtitle: "Videos informativos", color: "bg-blue-600" },
  { path: "service_categories", label: "Service Categories", subtitle: "Categorías de servicio", color: "bg-gray-300" },
  { path: "services", label: "Services", subtitle: "Servicios", color: "bg-red-600" },
  { path: "counter_services", label: "Counter Services", subtitle: "Contadores", color: "bg-gray-700" },
  { path: "portfolio_categories", label: "Portfolio Categories", subtitle: "Categorías", color: "bg-blue-600" },
  { path: "portfolios", label: "Portfolios", subtitle: "Portafolios", color: "bg-gray-300" },
  { path: "information_contact", label: "Information Contact", subtitle: "Info de contacto", color: "bg-red-600" },
  { path: "payment_plan", label: "Payment Plan", subtitle: "Planes de pago", color: "bg-gray-700" },
  { path: "choose_us", label: "Choose Us", subtitle: "Por qué elegirnos", color: "bg-blue-600" },
  { path: "testimonials", label: "Testimonials", subtitle: "Testimonios", color: "bg-gray-300" },
  { path: "section_titles", label: "Section Titles", subtitle: "Títulos de secciones", color: "bg-red-600" },
  { path: "specialty_categories", label: "Specialty Categories", subtitle: "Categorias de especialidad", color: "bg-gray-700" },
  { path: "our_teams", label: "Our Teams", subtitle: "Nuestro equipo", color: "bg-blue-600" },
  { path: "partners", label: "Partners", subtitle: "Aliados", color: "bg-gray-300" },
  { path: "faqs", label: "FAQs", subtitle: "Preguntas frecuentes", color: "bg-red-600" },
  { path: "banner_pages", label: "Banner Pages", subtitle: "Banners", color: "bg-gray-700" },
  { path: "blogs", label: "Blogs", subtitle: "Entradas", color: "bg-blue-600" },
  { path: "category_products", label: "Category Products", subtitle: "Categorías de productos", color: "bg-gray-300" },
  { path: "products", label: "Products", subtitle: "Productos", color: "bg-red-600" },
  { path: "product_details", label: "Product Details", subtitle: "Detalles", color: "bg-gray-700" },
  { path: "product_installations", label: "Product Installations", subtitle: "Instalaciones", color: "bg-blue-600" },
  { path: "stores", label: "Stores", subtitle: "Tiendas", color: "bg-gray-300" },
  { path: "contacts", label: "Contacts", subtitle: "Contactos", color: "bg-red-600" },
  { path: "contact_forms", label: "Contact Forms", subtitle: "Formularios", color: "bg-gray-700" }
];
</script>
