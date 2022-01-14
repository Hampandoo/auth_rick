<template>
  <section class="my-12 py-8 bg-white rounded-lg shadow-md lg:shadow-lg px-4">
    <button
      @click="$router.go(-1)"
      class="
        px-4
        py-2
        mr-4
        lg:ml-12
        mb-8
        bg-gray-800
        rounded-sm
        font-medium
        text-white
        uppercase
        focus:outline-none
      "
    >
      Go back
    </button>
    <div
      class="
        flex flex-row
        overflow-hidden
        bg-white
        rounded-lg
        shadow-md
        lg:w-2/3
        md:w-100
        sm:w-100
        mx-auto
        border border-cyan-500
      "
    >
      <div class="lg:h-96 w-2/3">
        <img
          class="inset-0 h-full w-auto object-cover object-center"
          alt="Character img"
          :src="getCard.image"
        />
      </div>
      <div class="w-full py-4 px-6 text-gray-800">
        <h3 class="mt-2 font-bold text-lg text-gray-500">
          Name:
          <span class="font-medium text-black">{{ getCard.name }}</span>
        </h3>
        <h3 class="mt-2 font-bold text-lg text-gray-500">
          Status:
          <span class="font-medium text-black">{{ getCard.status }}</span>
        </h3>
        <h3 class="mt-2 font-bold text-lg text-gray-500">
          Gender:
          <span class="font-medium text-black">{{ getCard.gender }}</span>
        </h3>
        <h3 class="mt-2 font-bold text-lg text-gray-500" v-if="getCard.type">
          Type:
          <span class="font-medium text-black">{{ getCard.type }}</span>
        </h3>
        <h3 class="mt-2 font-bold text-lg text-gray-500">
          Species:
          <span class="font-medium text-black">{{ getCard.species }}</span>
        </h3>
        <h3 class="mt-2 font-bold text-lg text-gray-500">
          Origin:
          <span class="font-medium text-black">{{ getCard.origin.name }}</span>
        </h3>
        <h3 class="mt-2 font-bold text-lg text-gray-500">
          Last known location:
          <span class="font-medium text-black">{{
            getCard.location.name
          }}</span>
        </h3>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getCard: "products/getCard",
    }),
  },
};
</script>

<style>
</style>