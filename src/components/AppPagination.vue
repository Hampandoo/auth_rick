<template>
  <ul
    class="flex mx-auto my-2 border-l-2 border-cyan-500"
    v-if="nicePagination.length > 0"
  >
    <li
      v-for="num in nicePagination"
      :key="num"
      @click="changePage(num)"
      class="child mx-1 p-2 rounded-full cursor-pointer"
      :class="this.page === num ? 'bg-cyan-500' : ''"
    >
      <span class="text-gray-800 text-lg font-bold select-none">
        {{ num }}
      </span>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      pageCount: "products/pageCount",
      page: "products/getPage",
    }),
    nicePagination() {
      let jojo = [];
      for (let i = 1; i <= this.pageCount; i++) {
        jojo.push(i);
      }
      return jojo.filter((item) => {
        if (
          item === 1 ||
          Math.abs(this.page - item) < 2 ||
          item === this.pageCount
        ) {
          return true;
        }
      });
    },
  },
  methods: {
    ...mapActions({
      changePage: "products/changePage",
    }),
  },
  watch: {
    pageCount() {
      if (this.$route.params.page > this.pageCount) {
        this.changePage(this.pageCount);
      } else if (this.$route.params.page < 1) {
        this.changePage(1);
      }
    },
  },
};
</script>

<style scoped>
.child:first-child {
  margin-right: 0.75rem;
}
.child:last-child {
  margin-left: 0.75rem;
}
</style>