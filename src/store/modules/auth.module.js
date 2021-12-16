import axios from 'axios'
import { error } from '../../utils/error'

const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="

export const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('jwt')
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('jwt', token)
    },
    REMOVE_TOKEN(state) {
      state.token = null,
      localStorage.removeItem('jwt')
    }
  },
  actions: {
    async login({commit}, payload) {
      try {
        const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_BACKEND_API_KEY}`
        const { data } = await axios.post(API_URL, {...payload, returnSecureToken: true})
        commit('SET_TOKEN', data.idToken)
      } catch(e) {
        throw error(e.response.data.error.message)
      }
    },
    async register({commit}, payload) {
      try {
        const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_BACKEND_API_KEY}`
        const response = await axios.post(API_URL, payload)
        console.log(response)
      } catch (e) {
        console.dir(e)
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    }
  }
}