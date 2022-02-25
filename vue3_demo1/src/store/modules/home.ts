let count = 1;
const state = {
    userName: 'xxx',
    group: {
        aData: [], // 企业分组
        hashWithId: {},
        hashWithLetter: {},
        allSnames: ''
    }

}

const mutations = {
    setGroup(state, group) {
        state.group = group
    },
    updateUserName(state, group) {
        state.userName = state.userName + ++count
        console.log('3');

    }
}

const actions = {
    setGroup({ commit }, group) {
        commit('setGroup', group)
    },
    updateUserName({ commit }) {
        console.log('2');
        commit('updateUserName')

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}