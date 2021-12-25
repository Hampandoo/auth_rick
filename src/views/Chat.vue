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
    <app-chat-messages />
  </section>
</template>

<script>
import firestore from "../utils/firebase";
import AppChatMessages from "../components/AppChatMessages.vue";
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

export default {
  name: "Chat",
  components: {
    AppChatMessages,
  },
  data() {
    return {
      messages: [],
      searchField: "",
      anotherUser: {},
      roomId: null,
    };
  },
  methods: {
    async searchByEmail() {
      try {
        const jojo = await getDocs(
          query(
            collection(firestore, "users"),
            where("email", "==", this.searchField)
          )
        );

        jojo.forEach((doc) => {
          this.anotherUser.name = doc.data().name;
          this.anotherUser.email = doc.data().email;
          this.anotherUser.id = doc.id;
        });

        // const key = localStorage.getItem("localId");
        // await setDoc(doc(firestore, "chats/", key), {
        //   email: "SomeLikeIt@gg.com",
        //   name: "Jotaro",
        // });
      } catch (e) {
        console.log(e);
      }
    },
    async createChat() {
      // const room = await setDoc(
      //   doc(firestore, "chats/", key + this.anotherUser.id),
      //   {
      //     email: "SomeLikeIt@gg.com",
      //     name: "Jotaro",
      //   }
      // );
      console.log(this.anotherUser.id);
    },
  },
};
</script>

<style>
</style>