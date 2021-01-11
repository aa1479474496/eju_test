let AMapHandler = {
  success: function (res) {

  }
}
const state = {
  AMapUtil: null,
  AMap: null,

}
const mutations = {
  SET_AMAPUTIL: (state, AMapUtil) => {
    state.AMapUtil = AMapUtil
  },

  SET_AMAP: (state, AMap) => {
    state.AMap = AMap
  }
}
const actions = {
  amapInit({ dispatch, commit }, mapObj) {
    let { AMapUtil, AMap } = mapObj;
    commit('SET_AMAPUTIL', AMapUtil);
    commit('SET_AMAP', AMap);
    AMapHandler.success();
  },

  initEnd({ state }) {
    let resolveHandler;
    let rejectHandler;
    const p = new Promise((resolve, reject) => {
      resolveHandler = resolve;
      rejectHandler = reject
    });
    if (state.AMap) {
      resolveHandler();
    }
    else {
      AMapHandler.success = resolveHandler;
    }
    return p;
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
