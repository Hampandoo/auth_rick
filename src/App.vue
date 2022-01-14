<template>
  <component :is="layout + '-layout'" v-if="layout">
    <router-view />
  </component>
</template>

<script>
import UserLayout from "./layouts/UserLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

export default {
  components: {
    UserLayout,
    AuthLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

