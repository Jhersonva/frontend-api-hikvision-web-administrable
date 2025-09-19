import { createRouter, createWebHistory } from "vue-router";

import SecctionTitles from "../modules/SecctionTitles.vue";
import ProductDetail from "../modules/ProductDetail.vue";
import Products from "../modules/Products.vue";
import ProductCategories from "../modules/ProductCategories.vue";
import FormContact from "../modules/FormContact.vue";
import Contact from "../modules/Contact.vue";
import Blog from "../modules/Blog.vue";
import BannerPage from "../modules/BannerPage.vue";
import Faqs from "../modules/Faqs.vue";
import Partners from "../modules/Partners.vue";
import OurTeam from "../modules/OurTeam.vue";
import SpecialtyCategories from "../modules/SpecialtyCategories.vue";
import Testimonials from "../modules/Testimonials.vue";
import ChooseUs from "../modules/ChooseUs.vue";
import PaymentPlans from "../modules/PaymentPlans.vue";
import InformationContact from "../modules/InformationContact.vue";
import Portfolios from "../modules/Portfolios.vue";
import PortfolioCategories from "../modules/PortfolioCategories.vue";
import CounterServices from "../modules/CounterServices.vue";
import Services from "../modules/Services.vue";
import ServiceCategories from "../modules/ServiceCategories.vue";
import VideoInformationAndSolutions from "../modules/VideoInformationAndSolutions.vue";
import AboutUs from "../modules/AboutUs.vue";
import Features from "../modules/Features.vue";
import Carousels from "../modules/Carousels.vue";
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
    path: "section_titles",
    component: SecctionTitles,
    meta: { title: "section_titles" }
  },
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
    path: "carousels",
    component: Carousels,
    meta: { title: "Carousel" }
  },
  {
    path: "features",
    component: Features,
    meta: { title: "Features" }
  },
  {
    path: "about_us",
    component: AboutUs,
    meta: { title: "AboutUs" }
  },
  {
    path: "video_information_and_solutions",
    component: VideoInformationAndSolutions,
    meta: { title: "VideoInformationAndSolutions" }
  },
  {
    path: "service_categories",
    component: ServiceCategories,
    meta: { title: "service_categories" }
  },
  {
    path: "services",
    component: Services,
    meta: { title: "services" }
  },
  {
    path: "counter_services",
    component: CounterServices,
    meta: { title: "counter_services" }
  },
  {
    path: "portfolio_categories",
    component: PortfolioCategories,
    meta: { title: "portfolio_categories" }
  },
  {
    path: "portfolios",
    component: Portfolios,
    meta: { title: "portfolios" }
  },
  {
    path: "information_contact",
    component: InformationContact,
    meta: { title: "information_contact" }
  },
  {
    path: "payment_plan",
    component: PaymentPlans,
    meta: { title: "payment_plan" }
  },
  {
    path: "choose_us",
    component: ChooseUs,
    meta: { title: "choose_us" }
  },
  {
    path: "testimonials",
    component: Testimonials,
    meta: { title: "testimonials" }
  },
  {
    path: "specialty_categories",
    component: SpecialtyCategories,
    meta: { title: "specialty_categories" }
  },
  {
    path: "our_teams",
    component: OurTeam,
    meta: { title: "our_teams" }
  },
  {
    path: "partners",
    component: Partners,
    meta: { title: "partners" }
  },
  {
    path: "faqs",
    component: Faqs,
    meta: { title: "faqs" }
  },
  {
    path: "banner_pages",
    component: BannerPage,
    meta: { title: "banner_pages" }
  },
  {
    path: "blogs",
    component: Blog,
    meta: { title: "blogs" }
  },
  {
    path: "category_products",
    component: ProductCategories,
    meta: { title: "category_products" }
  },
  {
    path: "products",
    component: Products,
    meta: { title: "products" }
  },
  {
    path: "products/:id/detail",
    name: "productDetail",
    component: ProductDetail,
    props: route => ({
      productId: Number(route.params.id),   
      productName: route.query.name || "" 
    }),
    meta: { title: "product_details" }
  },
  {
    path: "products/:id/installation",
    name: "productInstallation",
    component: () => import("../modules/ProductInstallation.vue"),
    props: route => ({
      productId: Number(route.params.id),
      productName: route.query.name || ""
    }),
    meta: { title: "product_installation" }
  },
  {
    path: "contacts",
    component: Contact,
    meta: { title: "contacts" }
  },
  {
    path: "contact_forms",
    component: FormContact,
    meta: { title: "contact_forms" }
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
