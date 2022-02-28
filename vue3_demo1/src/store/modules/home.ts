let count = 1;
export interface AItem {
    iAutoID: number;
    iSort: number;
    sName: string;
}
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

const mutations = {
    setGroup(state:HomeState, group:typeof state.group) {
        state.group = group
    },
    updateUserName(state:HomeState, group:typeof state.group) {
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