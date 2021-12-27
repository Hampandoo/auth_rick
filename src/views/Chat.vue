<template>
  <section class="flex-1 p:2 sm:p-6 justify-between flex mx-auto shadow-2xl">
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

      <div class="rounded flex text-white bg-gray-800 p-2 items-center">
        <img
          class="w-20 h-20 rounded-full object-cover"
          src="https://novy.tv/wp-content/uploads/sites/96/2015/09/shrek.jpg"
          alt="user profile photo"
        />
        <h3 class="align-center ml-2 wrap overflow-hidden">User Email</h3>
      </div>

      <div class="rounded flex text-white bg-gray-800 p-2 my-2 items-center">
        <img
          class="w-20 h-20 rounded-full object-cover"
          src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/33/55/df/3355dfdd-55d9-53d4-e19f-5895b0e78664/mza_13237539387869463363.jpg/1200x1200bb.jpg"
          alt="user profile photo"
        />
        <h3 class="align-center ml-2 wrap overflow-hidden">User Email</h3>
      </div>
    </div>
    <app-chat-messages
      v-if="searchedUser"
      :searchedUser="searchedUser"
      :messages="messages"
    />
  </section>
</template>

<script>
import AppSearchedUser from "../components/chatComponents/AppSearchedUser.vue";
import firestore from "../utils/firebase";
import AppChatMessages from "../components/chatComponents/AppChatMessages.vue";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  set,
  setDoc,
} from "@firebase/firestore";
import { mapActions } from "vuex";

export default {
  name: "Chat",
  components: {
    AppChatMessages,
    AppSearchedUser,
  },
  data() {
    return {
      searchField: "",
      searchedUser: {},
      messages: null,
      textUserDoesNotExist: "",
    };
  },
  methods: {
    ...mapActions({
      searchUser: "chat/searchByEmail",
      loadConversations: "chat/loadConversations",
      createNewConversation: "chat/createNewConversation",
    }),

    async createNewChat(searchedUser) {
      const info = await this.createNewConversation(searchedUser);
    },

    async searchByEmail() {
      try {
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
        const conversation = await this.loadConversations(anotherUser);
        if (conversation) {
          this.messages = conversation;
          return;
        } else {
          this.createNewChat(this.searchedUser);
        }
      } catch (e) {
        console.log("Error 1");
      }
    },
  },
};
</script>

<style>
</style>