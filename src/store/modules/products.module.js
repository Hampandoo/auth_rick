import axios from 'axios';
import router from '../../router';

export const products = {
  namespaced: true,
  state: {
    characters: [],
    filtered: [],
    page: 1,
    card: null
  },
  mutations: {
    LOAD_CHARACTERS(state, characters) {
      state.characters.push(...characters)
    },
    GET_FILTER(state, checked) {
      state.filtered = checked;
    },
    CHANGE_PAGE(state, page) {
      state.page = page
    },
    CHARACTER_ID(state, item) {
      state.card = item
    }
  },
  actions: {
    async load({ commit }) {
      let loadPage = "https://rickandmortyapi.com/api/character?page=1"

      while (loadPage !== null) {
        await axios
        .get(loadPage)
        .then(response => {
          commit('LOAD_CHARACTERS', response.data.results)
          loadPage = response.data.info.next
        })
      }
    },
    filterList({ commit }, checked) {
      commit("GET_FILTER", checked);
    },
    changePage({commit}, page) {
      commit("CHANGE_PAGE", page)
    },
  },
  getters: {
    getCharacters(state) {
      return state.characters;
    },
    getFilteredCharacters(state) {
      return state.characters.filter((item) => {
          return Object.keys(state.filtered).every(el => {
           if(state.filtered[el].length === 0 || state.filtered[el].includes(item[el])) return true
         })
      })
    },
    getPaginationCharacters(state, getters) {
      const start = (state.page - 1) * 7;
      const end = state.page * 7;

      router.push({name: 'Products', params: {page: state.page}})

      return getters.getFilteredCharacters.slice(start, end)
    },
    pageCount(state, getters) {
      return Math.ceil(getters.getFilteredCharacters.length / 7)
    },
    getPage(state) {
      return state.page
    },
    getCard(state) {
      return state.card
    }
  },
};
