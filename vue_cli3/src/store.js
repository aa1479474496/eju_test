import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: [],
    isFold: true
  },
  mutations: {
    setStatus(state, status) {
        state.status = status;
    },

    setFold(state, isFold) {
        state.isFold = isFold;
    }
  },
  actions: {
    setStatus({ commit }, status) {
        console.log('status', status);
        commit('setStatus', status);
    },

    setFold({ commit }, isFold) {
        commit('setFold', isFold);
    }
  }
})
