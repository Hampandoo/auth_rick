import { createStore, createLogger } from "vuex";
import { auth } from './modules/auth.module'
import { user } from './modules/user.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state: {
    layout: 'auth',
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload
    }
  },
  actions: {},
  getters: {
    layout(state) {
      return state.layout
    }
  },
  modules: {
    auth,
    user
  },
});
