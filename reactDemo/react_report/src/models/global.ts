import {Reducer, Effect } from 'umi';

export interface GlobalModelState {
  theme: string;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    changeTheme: Effect;
  };
  reducers: {
    changeTheme: Reducer<GlobalModelState>
  }
}

const GlobalModel: GlobalModelType = {
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