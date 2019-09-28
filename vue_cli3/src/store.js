import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: [],
  },
  mutations: {
    setStatus(state, status) {
        state.status = status;
    }
  },
  actions: {
    setStatus({ commit }, status) {
        console.log('status', status);
        commit('setStatus', status);
    }
  }
})
