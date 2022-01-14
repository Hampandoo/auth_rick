<template>
  <div class="flex flex-col mt-12">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <div
        class="
          shadow-xl
          w-11/12
          p-12
          sm:w-8/12
          md:w-6/12
          lg:w-5/12
          2xl:w-4/12
          px-6
          py-10
          sm:px-10 sm:py-6
          bg-white
          rounded-lg
          shadow-md
          lg:shadow-lg
          border border-cyan-500
        "
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Profile
        </h2>

        <div v-if="!loading">
          <div class="mt-4" v-if="getUser">
            <h3 class="block text-s font-semibold text-gray-600">
              Username: <span class="text-black">{{ getUser.username }}</span>
            </h3>

            <h3 class="block mt-2 text-s font-semibold text-gray-600">
              Another info:
              <span class="text-black">{{ getUser.another }}</span>
            </h3>
          </div>
        </div>

        <app-loader v-else class="my-8" />

        <div class="pt-6 flex justify-center">
          <router-link
            to="/profile/edit"
            :class="[{ 'bg-gray-800': $route.path === '/profile/edit' }]"
            class="
              inline-block
              bg-gray-600
              hover:bg-gray-800
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Edit your profile?
          </router-link>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppLoader from "../components/AppLoader";

export default {
  components: {
    AppLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
  methods: {
    ...mapActions({
      getProfile: "user/getProfile",
      checkChatAccount: "chat/checkChatAccount",
    }),
    loadProfile() {
      this.loading = true;
      this.getProfile().then(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loadProfile();
    this.checkChatAccount();
  },
};
</script>

<style>
</style>