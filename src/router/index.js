import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login'
import Products from '../views/Products'
import store from '../store'


const routes = [
  {
    name: "Home",
    path: "/",
    component: Products,
    meta: {
      layout: "user",
      auth: true
    }
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      layout: "auth",
      auth: false
    }
  },
  {
    name: "Register",
    path: "/register",
    component: () => import('../views/Register'),
    meta: {
      layout: "auth",
      auth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach( (to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('login?message=auth')
  } else {
    next()
  }
})

export default router;
