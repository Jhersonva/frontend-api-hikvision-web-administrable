<!--src/components/layout/LoginForm.vue-->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
      <!-- Logo + Título -->
      <div class="text-center mb-6">
        <div class="w-25 h-25 mx-auto mb-3 flex items-center justify-center rounded-full border-4 border-red-600 bg-gray-700 shadow-lg">
          <img src="https://scontent.fjau1-1.fna.fbcdn.net/v/t39.30808-1/514250673_122121261242932985_5564641991239268251_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGHY74BaBGrRH6K9WOTQbbk7E8jKWpudYzsTyMpam51jAeLIRpFdAeB-aB9lOL2GWnVrrg3YmUHr1dn8mWpserU&_nc_ohc=rBaIs_9dfr8Q7kNvwGCEdg6&_nc_oc=AdlNqHuN-DX5KlgXlYmovShz6D5tVlm8mBl78M7psvUCeQ89BKDx_ulwD6AkmFxAYCo&_nc_zt=24&_nc_ht=scontent.fjau1-1.fna&_nc_gid=u3OIE1sNcAeHqm4_SotKig&oh=00_AfYJ8aUNgE_cYc91WDis1pCqJYAf4iblAsfpNKrZtJj0rg&oe=68C9EDCE" alt="Logo" class="w-23 h-23 object-contain rounded-full border-2 border-white" />
        </div>
        <h1 class="text-3xl font-bold text-white">Bienvenido</h1>
        <p class="text-gray-400">Accede a tu panel de administración</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="username"
            type="text"
            placeholder="Usuario"
            class="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
        >
          Iniciar sesión
        </button>
      </form>

      <!-- Link al registro -->
      <p class="mt-6 text-sm text-center text-gray-400">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-blue-500 font-medium hover:underline">
          Regístrate aquí
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    await auth.loginUser({ username: username.value, password: password.value });
    // al tener token, redirigimos al panel
    router.push("/app/dashboard");
  } catch (e) {
    console.error(e);
    alert("❌ Error en login");
  } finally {
    loading.value = false;
  }
};
</script>

