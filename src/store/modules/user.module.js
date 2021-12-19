import axios from 'axios'
// await axios.post(`https://rick-backend-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}.json?auth=${token}`, username)

export const user = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    CHANGE_USER(state, user) {
      state.user = user
    }
  },
  actions: {
   async getProfile({commit}) {
    const data = await axios.get(`https://rick-backend-default-rtdb.europe-west1.firebasedatabase.app/users/${localStorage.getItem('localId')}.json?auth=${localStorage.getItem('jwt')}`)
    commit('CHANGE_USER', data.data)
   },

   async changeProfile({commit}, data) {
     await axios.patch(`https://rick-backend-default-rtdb.europe-west1.firebasedatabase.app/users/${localStorage.getItem('localId')}.json?auth=${localStorage.getItem('jwt')}`, data)
   }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  }
}