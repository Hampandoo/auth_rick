<template>
  <section class="flex-1 p:2 sm:p-6 flex mx-auto shadow-2xl">
    <div class="my-4 bg-gray-300 p-4 rounded flex flex-col w-60">
      <form action="submit" @keypress.enter.prevent="searchByEmail">
        <input
          type="email"
          class="my-2 rounded leading-6 p-2"
          placeholder="search: email"
          v-model="searchField"
        />
      </form>

      <div
        class="p-1 border border-gray-600 rounded my-1 self-center"
        v-if="textUserDoesNotExist"
      >
        <p>{{ textUserDoesNotExist }}</p>
      </div>

      <app-searched-user
        :searchedUser="searchedUser"
        v-if="searchedUser.email"
        @click="loadOrCreateNewChat(searchedUser)"
      />
    </div>

    <app-chat-messages
      v-if="!loading"
      :searchedUser="searchedUser"
      :messages="getMessages"
    />
    <app-loader :class="'mx-auto'" v-else />
  </section>
</template>

<script>
import AppSearchedUser from "../components/chatComponents/AppSearchedUser.vue";
import AppChatMessages from "../components/chatComponents/AppChatMessages.vue";
import AppLoader from "../components/AppLoader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Chat",
  components: {
    AppChatMessages,
    AppSearchedUser,
    AppLoader,
  },
  data() {
    return {
      searchField: "",
      searchedUser: {},
      textUserDoesNotExist: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      getMessages: "chat/getMessages",
    }),
  },
  methods: {
    ...mapActions({
      searchUser: "chat/searchByEmail",
      loadConversations: "chat/loadConversations",
      createNewConversation: "chat/createNewConversation",
      clearMessageList: "chat/clearMessageList",
    }),

    async createNewChat(searchedUser) {
      await this.createNewConversation(searchedUser);
    },

    async searchByEmail() {
      try {
        this.clearMessageList();

        if (this.searchField === localStorage.getItem("email")) {
          this.searchField = "";
          return;
        }

        this.textUserDoesNotExist = "";
        const user = await this.searchUser(this.searchField);
        if (user.email) {
          this.searchedUser = user;
        } else {
          this.textUserDoesNotExist = "This user does not exist";
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.searchField = "";
      }
    },

    async loadOrCreateNewChat(anotherUser) {
      try {
        this.loading = true;
        await this.loadConversations(anotherUser);
      } catch (e) {
        this.createNewChat(this.searchedUser);
        this.loadOrCreateNewChat(anotherUser);
      } finally {
        this.loading = false;
      }
    },
  },
  unmounted() {
    this.clearMessageList();
    this.searchedUser = {};
  },
};
</script>

<style>
</style>