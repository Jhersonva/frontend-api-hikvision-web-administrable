import { createRouter, createWebHistory } from "vue-router";

import ImageCategories from "../modules/ImageCategories.vue";
import SocialNetworks from "../modules/SocialNetworks.vue";
import ContactInformationCompany from "../modules/ContactInformationCompany.vue";
import ModulePlaceholder from "../components/common/ModulePlaceholder.vue";
import Dashboard from "../views/Dashboard.vue";
import Layout from "../components/layout/Layout.vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

import Users from "../modules/Users.vue";

const moduleRoutes = [
  "users","contact_information_company", "social_networks","carousels","features","about_us",
  "video_information_and_solutions","service_categories","services","counter_services",
  "portfolio_categories","portfolios","information_contact","payment_plan","choose_us",
  "testimonials","section_titles","specialty_categories","our_teams","partners","faqs",
  "banner_pages","blogs","category_products","products","product_details","product_installations",
  "stores","contacts","contact_forms", "image_categories"
];

const children = [
  { path: "dashboard", component: Dashboard, meta: { title: "Dashboard" } },

  {
    path: "contact_information_company",
    component: ContactInformationCompany,
    meta: { title: "Contact Information Company" }
  },
  {
    path: "social_networks",
    component: SocialNetworks,
    meta: { title: "Social Networks" }
  },
  {
    path: "image_categories",
    component: ImageCategories,
    meta: { title: "Categorías de Imágenes" }
  },

  // El resto con placeholder
  ...moduleRoutes
    .filter(p => !["contact_information_company", "social_networks"].includes(p))
    .map(p => ({
      path: p,
      component: ModulePlaceholder,
      meta: {
        title: p.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      },
    })),
];

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginForm },
  { path: "/register", component: RegisterForm },
  { path: "/app", component: Layout, children }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
