<template>
  <div
    :class="[ 
      'bg-gray-900 text-white w-64 p-4 space-y-4 transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-64',
      'fixed md:static inset-y-0 left-0 z-50 md:translate-x-0'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center mb-6">
      <div class="w-14 h-14 flex items-center justify-center rounded-full border-4 border-red-600 bg-gray-700">
        <img
          src="https://scontent.fjau1-1.fna.fbcdn.net/v/t39.30808-1/451816202_2169412136763470_1188529948543286866_n.jpg?stp=c0.21.689.689a_dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHUik4JM3FNU7UauCExI36FP6MUstZok5A_oxSy1miTkN8mU-YD-EKtU8r1ljyC_xCx5xpHluBLfs90ptPqEqQU&_nc_ohc=t8yi3INo3bAQ7kNvwHq0C0_&_nc_oc=Adnb5Fytihz2KW9Neu-Vr7FhW-iGLtejP8RagUDwyzdbcVf1-Qi5yWGXCmGztTqN7D8&_nc_zt=24&_nc_ht=scontent.fjau1-1.fna&_nc_gid=0vbxQ0AJwz78vZK-xHymkA&oh=00_AfacJgyhB4yKKBQhOXFdkAU9YDDriUNAt8S9ChsxmkcPng&oe=68C9DA97"
          alt="logo"
          class="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
      </div>
    </div>

    <!-- Menú -->
    <nav class="space-y-2">
      <router-link
        v-for="item in menu"
        :key="item.path"
        :to="`/app/${item.path}`"
        class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        active-class="bg-red-600 text-white"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
defineProps({ isOpen: Boolean });
defineEmits(["toggle"]);

const menu = [
  { path: "dashboard", label: "Dashboard" },
  { path: "users", label: "Users" },
  { path: "contact_information_company", label: "Contact Information" },
  { path: "social_networks", label: "Social Networks" },
  { path: "carousels", label: "Carousels" },
  { path: "features", label: "Features" },
  { path: "about_us", label: "About Us" },
  { path: "video_information_and_solutions", label: "Video Info & Solutions" },
  { path: "service_categories", label: "Service Categories" },
  { path: "services", label: "Services" },
  { path: "counter_services", label: "Counter Services" },
  { path: "portfolio_categories", label: "Portfolio Categories" },
  { path: "portfolios", label: "Portfolios" },
  { path: "information_contact", label: "Information Contact" },
  { path: "payment_plan", label: "Payment Plan" },
  { path: "choose_us", label: "Choose Us" },
  { path: "testimonials", label: "Testimonials" },
  { path: "section_titles", label: "Section Titles" },
  { path: "specialty_categories", label: "Specialty Categories" },
  { path: "our_teams", label: "Our Teams" },
  { path: "partners", label: "Partners" },
  { path: "faqs", label: "FAQs" },
  { path: "banner_pages", label: "Banner Pages" },
  { path: "blogs", label: "Blogs" },
  { path: "category_products", label: "Category Products" },
  { path: "products", label: "Products" },
  { path: "product_details", label: "Product Details" },
  { path: "product_installations", label: "Product Installations" },
  { path: "stores", label: "Stores" },
  { path: "contacts", label: "Contacts" },
  { path: "contact_forms", label: "Contact Forms" }
];
</script>
