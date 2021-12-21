<template>
  <section class="mx-auto border-b-2">
    <form action="" class="py-4 px-4 flex justify-center">
      <div class="mx-6">
        <h3 class="font-bold text-lg text-gray-500">Status:</h3>
        <div
          v-for="field in filter.status"
          :key="field"
          class="ml-2 text-black font-semibold"
        >
          <input
            v-model="checked.status"
            :value="field"
            type="checkbox"
            :id="field"
            class="cursor-pointer"
          />
          <label class="pl-1 cursor-pointer" :for="field">{{ field }}</label>
        </div>
      </div>
      <div class="mx-6">
        <h3 class="font-bold text-lg text-gray-500">Gender:</h3>
        <div
          v-for="field in filter.gender"
          :key="field"
          class="ml-2 text-black font-semibold"
        >
          <input
            v-model="checked.gender"
            :value="field"
            type="checkbox"
            :id="field"
            class="cursor-pointer"
          />
          <label class="pl-1 cursor-pointer" :for="field">{{ field }}</label>
        </div>
      </div>
      <div class="mx-6">
        <h3 class="font-bold text-lg text-gray-500">Species:</h3>
        <div
          v-for="field in filter.species"
          :key="field"
          class="ml-2 text-black font-semibold"
        >
          <input
            v-model="checked.species"
            :value="field"
            type="checkbox"
            :id="field"
            class="cursor-pointer"
          />
          <label class="pl-1 cursor-pointer" :for="field">{{ field }}</label>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      checked: {
        status: [],
        gender: [],
        species: [],
      },
      filter: {
        status: {
          alive: "Alive",
          dead: "Dead",
        },
        gender: {
          male: "Male",
          female: "Female",
          genderless: "Genderless",
        },
        species: {
          human: "Human",
          alien: "Alien",
          humanoid: "Humanoid",
          poopybutthole: "Poopybutthole",
          mythologicalCreature: "Mythological Creature",
          animal: "Animal",
          robot: "Robot",
          cronenberg: "Cronenberg",
          disease: "Disease",
        },
      },
    };
  },
  methods: {
    ...mapActions({
      filtering: "products/filterList",
    }),
  },
  mounted() {
    this.filtering(this.checked);
  },
};
</script>