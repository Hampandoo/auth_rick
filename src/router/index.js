import { createRouter, createWebHistory } from "vue-router";
import store from '../store'


const routes = [
  {
    name: "Products",
    path: "/products/:page",
    component: () => import('../views/Products'),
    meta: {
      layout: "user",
      auth: true
    },
  },
  {
    name: "Profile",
    path: "/profile",
    alias: "/",
    component: () => import('../views/Profile'),
    meta: {
      layout: "user",
      auth: true
    },
    children: [
      {
        path: "edit",
        component: () => import('../components/TheProfileChange')
      },
    ]
  },
  {
    name: "Login",
    path: "/login",
    component: () => import('../views/Login'),
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
  linkActiveClass: 'border-b-4 border-cyan-500',
  linkExactActiveClass: 'border-b-4 border-cyan-500'
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('login?message=auth')
  } else if (!requireAuth && store.getters['auth/isAuthenticated']) {
    next('/')
  } else {
    next()
  }
})

export default router;
