<template>
   <div class="flex flex-col mt-12">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <div
        class="shadow-xl w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg border border-cyan-500"
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Profile
        </h2>

          <div class="mt-4" v-if="getUser">
              <h3
              class="block text-s font-semibold text-gray-600"
              >Username: <span class="text-black">{{getUser.username}}</span> </h3
            >

            <h3
              class="block mt-2 text-s font-semibold text-gray-600"
              >Another info: <span class="text-black">{{getUser.another}}</span></h3
            >
          </div>
          <div v-if="!profileForm" class="pt-6 flex justify-center">
            <button 
              @click="profileForm = !profileForm"
              class="inline-block bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded border border-cyan-500">Change your profile?</button>
          </div>
          <the-profile-change v-else></the-profile-change>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TheProfileChange from '../components/TheProfileChange.vue'

export default {
  data() {
    return {
      profileForm: false
    }
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser"
    })
  },
  methods: {
    ...mapActions({
      getProfile: "user/getProfile"
    }),
  },
    components: {
    TheProfileChange
  },
  mounted() {
   this.getProfile()
  },
}
</script>

<style>

</style>