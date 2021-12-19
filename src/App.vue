<template>
  <html-head>
    <component :is="layout + '-layout'" v-if="layout">
      <router-view />
    </component>
  </html-head>
</template>

<script>
import UserLayout from "./layouts/UserLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import HtmlHead from "./components/HtmlHead.vue";

export default {
  components: {
    UserLayout,
    AuthLayout,
    HtmlHead,
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style></style>
