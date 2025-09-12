import { defineStore } from "pinia";
import { login, register } from "../api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async loginUser(credentials) {
      const res = await login(credentials);
      this.token = res.token;
      localStorage.setItem("token", res.token);
    },
    async registerUser(userData) {
      return await register(userData);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
