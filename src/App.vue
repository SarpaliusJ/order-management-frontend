<template>
  <div id="app">
    <button v-if="isAuthenticated" @click="logout" class="logout">
      Logout
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const isAuthenticated = computed(() => store.state.isAuthenticated);

    const checkAuth = () => {
      const requiresAuth = route.matched.some(
        (record) => record.meta.requiresAuth
      );
      if (requiresAuth && !isAuthenticated.value) {
        router.push("/login");
      }
    };

    const logout = () => {
      // Perform logout actions, such as clearing authentication state and redirecting to login page
      store.dispatch("logout");
      router.push("/login");
    };

    watch(route, checkAuth);
    checkAuth();

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
.logout {
  float: right;
}
</style>
