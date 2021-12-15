import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import UserLayout from './layouts/UserLayout'
import AuthLayout from './layouts/AuthLayout'

Vue.component('user-layout', UserLayout)
Vue.component('auth-layout', AuthLayout)

createApp(App).use(store).use(router).mount("#app");
