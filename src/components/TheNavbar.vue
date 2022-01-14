<template>
  <nav
    class="
      container
      flex
      justify-around
      py-4
      mx-auto
      font-medium
      text-white
      uppercase
      bg-white
      rounded-lg
      shadow-md
      lg:shadow-lg
    "
  >
    <div class="flex items-center">
      <router-link
        to="/products/:page"
        :class="[{ 'border-b-4 border-cyan-500': $route.name === 'Products' }]"
        class="
          px-4
          py-2
          mx-4
          bg-gray-800
          rounded-sm
          font-medium
          text-white
          uppercase
          focus:outline-none
          cursor-pointer
        "
      >
        Products
      </router-link>

      <router-link
        to="/profile"
        :class="[
          {
            'border-b-4 border-cyan-500':
              $route.name === 'Profile' || $route.path === '/profile/edit',
          },
        ]"
        class="
          px-4
          py-2
          mx-4
          bg-gray-800
          rounded-sm
          font-medium
          text-white
          uppercase
          focus:outline-none
          cursor-pointer
        "
      >
        Profile
      </router-link>

      <router-link
        to="/chat"
        :class="[
          {
            'border-b-4 border-cyan-500':
              $route.name === 'Chat' || $route.path === '/chat/:coonversation',
          },
        ]"
        class="
          px-4
          py-2
          mx-4
          bg-gray-800
          rounded-sm
          font-medium
          text-white
          uppercase
          focus:outline-none
          cursor-pointer
        "
      >
        Chat
      </router-link>
    </div>

    <div class="flex items-center space-x-2">
      <button
        @click="logout"
        class="
          px-4
          py-2
          bg-gray-500
          rounded-sm
          font-medium
          text-white
          uppercase
          focus:outline-none
          hover:bg-gray-700
        "
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import router from "../router";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      loginOut: "auth/logout",
    }),
    logout() {
      this.loginOut();
      router.push("/login");
    },
  },
};
</script>
