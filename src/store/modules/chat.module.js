import firestore from "../../utils/firebase";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  addDoc,
  getDoc,
  doc,
  get,
  updateDoc,
  deleteDoc,
  set,
  setDoc,
} from "@firebase/firestore";

export const chat = {
  namespaced: true,
  state: {
    currentChatMessages: [],
  },
  mutations: {
    FILL_CURRENT_CHAT_MESSAGES(state, payload) {
      state.currentChatMessages = payload
    }
  },
  actions: {
    createNewConversation({ commit }, payload) {

    },

    async loadConversations({ commit }, payload) {
      const userOne = await getDocs(query(
        collection(firestore, "chats"),
        where("user1", "in", ["loli@base.com", "SomeLikeIt@gg.com"])))
      const userTwo = await getDocs(query(
        collection(firestore, "chats"),
        where("user2", "in", ["loli@base.com", "SomeLikeIt@gg.com"])))

      // Могут быть ошибки, где user1 === user2
      // 
      // 
      // 

      let chatRooms = []

      userOne.forEach(doc => {
        chatRooms.push(doc.id)
      })
      userTwo.forEach(doc => {
        chatRooms.push(doc.id)
      })

      const conversation = chatRooms.sort().reduce((prev, curr) => {
        if (prev === curr) {
          return curr
        }
      })

      const finall = await getDoc(doc(firestore, "chats", conversation))
      return finall.data().conversation
    },

    async searchByEmail({ commit }, payload) {
      try {
        const searchingUser = await getDocs(
          query(
            collection(firestore, "users"),
            where("email", "==", payload)
          )
        );

        const user = {}

        searchingUser.forEach((doc) => {
          user.email = doc.data().email;
          user.id = doc.id;
        });

        return user
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {}
}