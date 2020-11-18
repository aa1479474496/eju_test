import {Reducer, Effect } from 'umi';

const GlobalModel = {
  namespace: 'global',

  state: {
    theme: 'light'
  },

  effects: {
    changeTheme({ payload }, { put }) {
      put({
        type: 'changeTheme',
        payload
      });
      document.documentElement.setAttribute("data-theme", payload);
    }
  },

  reducers: {
    changeTheme(state, { payload }) {
      return {
        ...state,
        theme: payload
      }
    }
  }
}

export default GlobalModel;