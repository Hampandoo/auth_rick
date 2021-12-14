import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout";

const routes = [
  {
    name: "Home",
    path: "/",
    component: AuthLayout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
