import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import Login from '../views/Login'

const routes = [
  {
    name: "Home",
    path: "/",
    component: UserLayout,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      layout: 'auth-layout'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
