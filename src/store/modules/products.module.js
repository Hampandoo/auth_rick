import axios from 'axios';
import { error } from "../../utils/error"

export const products = {
  namespaced: true,
  state: {
    characters: [],
    filtered: [],
    page: 1,
    card: null,
    cardsPerPage: 20,
    maxPages: 0
  },
  mutations: {
    LOAD_CHARACTERS(state, characters) {
      state.characters = characters
    },
    SET_FILTER(state, checked) {
      state.filtered = checked;
    },
    CHANGE_PAGE(state, page) {
      state.page = page
    },
    CHARACTER_ID(state, item) {
      state.card = item
    },
    SET_MAX_PAGES(state, count) {
      state.maxPages = count
    },
    SET_CARD(state, card) {
      state.card = card
    }
  },
  actions: {
    async load({ commit, state }) {
      let url = `https://rickandmortyapi.com/api/character/?page=${state.page}&status=${state.filtered.status}&gender=${state.filtered.gender}&species=${state.filtered.species}`

      await axios
        .get(url)
        .then(response => {
          commit('LOAD_CHARACTERS', response.data.results)
          commit('SET_MAX_PAGES', response.data.info.pages)
        })
        .catch(e => {
          if (e.response.status === 404) {
            commit('LOAD_CHARACTERS', [])
            commit('SET_MAX_PAGES', 0)
          } else {
            throw error(e.response.status)
          }
        })
    },
    setFilterList({ commit }, checked) {
      commit("SET_FILTER", checked);
    },
    changePage({ commit }, page) {
      commit("CHANGE_PAGE", page)
    },
    setCard({ commit }, card) {
      commit('SET_CARD', card)
    }
  },
  getters: {
    getCharacters(state) {
      return state.characters;
    },
    pageCount(state) {
      return state.maxPages
    },
    getPage(state) {
      return state.page
    },
    getCard(state) {
      return state.card
    }
  },
};
