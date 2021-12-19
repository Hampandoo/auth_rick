import axios from 'axios'
import { error } from '../../utils/error'

const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="

export const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('jwt'),
    localId: localStorage.getItem('localId')
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('jwt', token)
    },
    REMOVE_TOKEN(state) {
      state.token = null,
      localStorage.removeItem('jwt')
    },
    SET_LOCAL_ID(state, localId) {
      state.localId = localId
      localStorage.setItem('localId', localId)
    },
    REMOVE_LOCAL_ID(state) {
      state.localId = null
      localStorage.removeItem('localId')
    }
  },
  actions: {
    async login({commit}, payload) {
      try {
        const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_BACKEND_API_KEY}`
        const { data } = await axios.post(API_URL, {...payload, returnSecureToken: true})
        commit('SET_TOKEN', data.idToken)
        commit('SET_LOCAL_ID', data.localId)
        
      } catch(e) {
        throw error(e.response.data.error.message)
      }
    },
    async register({commit}, payload) {
      try {
        const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_BACKEND_API_KEY}`
        await axios.post(API_URL, payload)
      } catch (e) {
        throw error(e.response.data.error.message)
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    localId(state) {
      return state.localId
    },
    isAuthenticated(state) {
      return !!state.token
    },
  }
}