<template>
  <section class="mx-auto border-b-2">
    <div class="p-4 px-4 flex justify-center items-end">
      <div class="mx-6">
        <h3 class="font-bold text-lg text-gray-500">Status:</h3>
        <select
          name="gender"
          id="gender"
          v-model="checked.status"
          class="border border-gray-800 rounded-lg px-1 py-0.5"
        >
          <option selected class="ml-2 text-black font-semibold"></option>
          <option
            v-for="field in filter.status"
            :key="field"
            class="ml-2 text-black font-semibold"
          >
            {{ field }}
          </option>
        </select>
      </div>
      <div class="mx-6">
        <h3 class="font-bold text-lg text-gray-500">Gender:</h3>
        <select
          name="gender"
          id="gender"
          v-model="checked.gender"
          class="border border-gray-800 rounded-lg px-1 py-0.5"
        >
          <option selected class="ml-2 text-black font-semibold"></option>
          <option
            v-for="field in filter.gender"
            :key="field"
            class="ml-2 text-black font-semibold"
          >
            {{ field }}
          </option>
        </select>
      </div>
      <div class="mx-6">
        <h3 class="font-bold text-lg text-gray-500">Species:</h3>

        <select
          name="species"
          id="species"
          v-model="checked.species"
          class="border border-gray-800 rounded-lg px-1 py-0.5"
        >
          <option selected class="ml-2 text-black font-semibold"></option>
          <option
            v-for="field in filter.species"
            :key="field"
            class="ml-2 text-black font-semibold"
          >
            {{ field }}
          </option>
        </select>
      </div>
      <button
        class="
          border-2 border-cyan-500
          px-2
          py-1
          rounded
          font-semibold
          bg-gray-200
        "
        @click="loadCharacters(checked), $emit('loadByFilter')"
      >
        Filtering
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  emits: ["loadByFilter"],
  data() {
    return {
      checked: {
        status: "",
        gender: "",
        species: "",
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
      setFilter: "products/setFilterList",
      changePage: "products/changePage",
    }),
    loadCharacters(checked) {
      this.setFilter(checked);
      this.changePage(1);
    },
  },
  mounted() {
    this.setFilter(this.checked);
  },
};
</script>