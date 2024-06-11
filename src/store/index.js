import { createStore } from "vuex";
import orders from "./Order";

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
    logout({ commit }) {
      commit("setAuthentication", { isAuthenticated: false, token: null });
    },
  },
  modules: {
    orders,
  },
});
