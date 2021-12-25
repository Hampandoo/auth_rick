import firestore from "../../utils/firebase";
import AppChatMessages from "../../components/AppChatMessages.vue";
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

export const chat = {
  namespaced: true,
  state: {
    currentChatMessagesList: [],

  },
  mutations: {},
  actions: {
    createNewConversation({ commit }, payload) {

    },
    loadConversations({ commit }, payload) {

    },
    async searchByEmail({ commit }, payload) {
      try {
        const jojo = await getDocs(
          query(
            collection(firestore, "users"),
            where("email", "==", payload)
          )
        );

        jojo.forEach((doc) => {
          this.anotherUser.name = doc.data().name;
          this.anotherUser.email = doc.data().email;
          this.anotherUser.id = doc.id;
        });

      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {}
}