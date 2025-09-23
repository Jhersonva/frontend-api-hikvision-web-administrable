import axios from "axios";
import router from "../router";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Interceptor para respuestas
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      router.push({ path: "/loading", query: { message: "Cerrando Sesión..." } });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
    return Promise.reject(error);
  }
);

export default api;