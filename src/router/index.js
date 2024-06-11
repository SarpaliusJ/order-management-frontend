import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "@/components/auth/LoginComponent.vue";
import OrderList from "@/components/order/OrderList.vue";
import OrderForm from "@/components/order/OrderForm.vue";
import OrderEdit from "@/components/order/OrderEdit.vue";
import OrderView from "@/components/order/OrderView.vue";
import store from "@/store";

const routes = [
  { path: "/login", component: LoginComponent },
  { path: "/", component: OrderList, meta: { requiresAuth: true } },
  { path: "/new", component: OrderForm, meta: { requiresAuth: true } },
  {
    path: "/:id/edit",
    name: "OrderEdit",
    component: OrderEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/:id",
    name: "OrderView",
    component: OrderView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
