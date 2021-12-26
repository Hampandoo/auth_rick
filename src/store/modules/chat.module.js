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
  arrayUnion
} from "@firebase/firestore";

export const chat = {
  namespaced: true,
  state: {
    currentChatMessages: [],
    currentRoomID: ""
  },
  mutations: {
    FILL_CURRENT_CHAT_MESSAGES(state, payload) {
      state.currentChatMessages = payload
    },
    SET_CURRENT_ROOM_ID(state, payload) {
      state.currentRoomID = payload
    }
  },
  actions: {
    createNewConversation({ commit }, payload) {

    },

    sendNewMessage({ commit, state }, payload) {
      try {
        const writeMessage = {
          email: localStorage.getItem('email'),
          message: payload,
          time: Date.now()
        }
        updateDoc(doc(firestore, "chats", state.currentRoomID), {
          conversation: arrayUnion(writeMessage)
        })
      } catch (e) {
        console.log('Error 2')
      }
    },

    async loadConversations({ commit }, payload) {
      try {
        const userOne = await getDocs(query(
          collection(firestore, "chats"),
          where("user1", "in", [payload.email, localStorage.getItem('email')])))
        const userTwo = await getDocs(query(
          collection(firestore, "chats"),
          where("user2", "in", [payload.email, localStorage.getItem('email')])))

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

        console.log(chatRooms)
        const roomID = chatRooms.sort().reduce((prev, curr) => {
          if (prev === curr) {
            return curr
          }
        })

        commit('SET_CURRENT_ROOM_ID', roomID)

        const finall = await getDoc(doc(firestore, "chats", roomID))

        return finall.data().conversation
      } catch (e) {
        console.log("Error 0")
      }
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