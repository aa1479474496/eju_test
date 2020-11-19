import {Reducer, Effect } from 'umi';
import Api from '@/api/common';

export interface GlobalModelState {
  theme: string;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    changeTheme: Effect;
    loadData: Effect;
  };
  reducers: {
    changeTheme: Reducer<GlobalModelState>,
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
    },

    *loadData(_, { call ,put }) {
      let payload = {
        id: 131035, 
        token: '15c2e331a5546cf3bde84e4637c2100b'
      }
      let res = yield call(Api.loadReport, payload);
      console.log('loadData', res);
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