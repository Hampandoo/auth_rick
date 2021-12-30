<template>
  <the-filter @loadByFilter="loadProducts" />
  <app-pagination @loadByPage="loadProducts" />

  <section
    v-if="getCharacters.length && !loading"
    class="py-4 pr-2 bg-white rounded-lg shadow-md lg:shadow-lg"
  >
    <div
      v-for="item in getCharacters"
      :key="item"
      class="
        flex flex-row
        overflow-hidden
        bg-white
        rounded-lg
        shadow-md
        mt-4
        lg:w-1/2
        md:w-2/3
        sm:w-100
        mx-auto
        border border-cyan-500
        h-64
      "
    >
      <div class="h-full w-1/2">
        <img
          class="inset-0 h-full w-auto object-cover object-center"
          alt="Character img"
          :src="item.image"
        />
      </div>
      <div class="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
        <h3 class="font-bold text-xl leading-tight truncate text-gray-800">
          {{ item.name }}
        </h3>
        <p class="mt-2 font-bold text-lg text-gray-500">
          Status: <span class="font-medium text-black">{{ item.status }}</span>
        </p>
        <p class="mt-2 font-bold text-lg text-gray-500">
          Gender: <span class="font-medium text-black">{{ item.gender }}</span>
        </p>
        <p class="mt-2 font-bold text-lg text-gray-500">
          Species:
          <span class="font-medium text-black">{{ item.species }}</span>
        </p>
        <p class="mt-2 font-bold text-lg text-gray-500">
          Last known location:
          <span class="font-medium text-black">{{ item.location.name }}</span>
        </p>
      </div>
    </div>
  </section>

  <section
    v-else-if="!getCharacters.length"
    class="py-4 pr-2 bg-white rounded-lg shadow-md lg:shadow-lg"
  >
    <div
      class="
        flex flex-row
        overflow-hidden
        bg-white
        rounded-lg
        shadow-md
        lg:w-1/2
        md:w-2/3
        sm:w-100
        mx-auto
        p-4
        justify-center
        text-lg
        font-bold
        text-gray-600
        border border-cyan-500
      "
    >
      <p class="">There are nobody here</p>
    </div>
  </section>

  <app-loader v-else class="my-8" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../router";
import AppPagination from "../components/AppPagination.vue";
import TheFilter from "../components/TheFilter.vue";
import AppLoader from "../components/AppLoader";

export default {
  components: {
    AppPagination,
    TheFilter,
    AppLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      getCharacters: "products/getCharacters",
      getPage: "products/getPage",
    }),
  },
  methods: {
    ...mapActions({
      openCharacter: "products/openCharacter",
      load: "products/load",
    }),
    loadProducts() {
      this.loading = true;
      this.load()
        .then(() => {
          router.push({ name: "Products", params: { page: this.getPage } });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>

<style>
</style>

