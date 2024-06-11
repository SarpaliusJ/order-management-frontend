import { createStore } from "vuex";
import orders from "./Order";
import AxiosService from "@/services/AxiosService";

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    setAuthentication(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      if (payload.isAuthenticated) {
        localStorage.setItem("token", payload.token);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
  actions: {
    async login({ commit }, payload) {
      const response = await AxiosService.post("/login", {
        email: payload.email,
        password: payload.password,
      });
      commit("setAuthentication", response.data);
    },
    async logout({ commit }) {
      await AxiosService.post("/logout");
      commit("setAuthentication", { isAuthenticated: false, token: null });
    },
  },
  modules: {
    orders,
  },
});
