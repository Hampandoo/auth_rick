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
    async createNewConversation({ commit }, payload) {
      const newChat = await addDoc(collection(firestore, "chats"), {
        conversation: [],
        users: [localStorage.getItem('email'), payload.email]
      })
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
        console.log(e)
        console.log('Send new message Error')
      }
    },

    async loadConversations({ commit, dispatch, state }, payload) {
      try {
        await dispatch('findRoomID', payload)

        const finall = await getDoc(doc(firestore, "chats", state.currentRoomID))

        if (finall) {
          return finall.data().conversation
        } else {
          console.log('aa')
          return
        }
      } catch (e) {
        console.log("Error 0")
      }
    },

    async findRoomID({ commit }, payload) {
      try {
        const user1 = await getDocs(query(
          collection(firestore, "chats"),
          where("users", "array-contains-any", [payload.email.toLowerCase()])))

        const user2 = await getDocs(query(
          collection(firestore, "chats"),
          where("users", "array-contains-any", [localStorage.getItem('email').toLowerCase()])))

        const chatRooms = []

        user1.forEach(doc => {
          chatRooms.push(doc.id)
        })
        user2.forEach(doc => {
          chatRooms.push(doc.id)
        })

        chatRooms.sort()

        let roomID = ""

        for (let i = 0; i < chatRooms.length; i++) {
          if (chatRooms[i] === chatRooms[i + 1]) {
            roomID = chatRooms[i]
          }
        }

        commit('SET_CURRENT_ROOM_ID', roomID)
      } catch (e) {
        console.log('Room ID Error')
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
        console.log('Search by email Error')
      }
    }
  },
  getters: {}
}