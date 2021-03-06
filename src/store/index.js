import { createStore } from "vuex";
import { auth } from './modules/auth.module'
import { user } from './modules/user.module'
import { products } from './modules/products.module'
import { chat } from './modules/chat.module'

export default createStore({
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
    user,
    products,
    chat
  },
});
