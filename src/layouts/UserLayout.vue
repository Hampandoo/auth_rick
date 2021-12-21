<template>
  <div class="container mx-auto">
    <the-navbar />
    <slot />
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";

export default {
  name: "UserLayout",
  components: {
    TheNavbar,
  },
};
</script>
