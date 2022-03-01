let count = 1;

import { AItem } from '/@/api/model/homeModel'
interface HomeState {
    userName: string;
    group: {
        aData: AItem[];
        hashWithId: any;
        hashWithLetter: any;
        allSnames: string;
    }
}




const state:HomeState = {
    userName: 'xxx',
    group: {
        aData: [], // 企业分组
        hashWithId: {},
        hashWithLetter: {},
        allSnames: ''
    }

}

export type GroupType = typeof state.group


const mutations = {
    setGroup(state:HomeState, group:GroupType) {
        state.group = group
    },
    updateUserName(state:HomeState, group:GroupType) {
        state.userName = state.userName + ++count

    }
}

const actions = {
    setGroup({ commit }, group: GroupType) {
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