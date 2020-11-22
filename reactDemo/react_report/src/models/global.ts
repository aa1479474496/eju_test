import {Reducer, Effect } from 'umi';
import Api from '@/api/common';
import { DetailDataType, SourceDatasType} from './connect';

// export interface DetailDataType {
//   attr: object;
//   pages: Array<object>;
// }
export interface GlobalModelState {
  theme: string;
  data: DetailDataType; // 
  dbs: object;
  info: object;
  maps: SourceDatasType[];
  tables: SourceDatasType[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    changeTheme: Effect;
    loadData: Effect;
    changeInfo: Effect;
  };
  reducers: {
    changeTheme: Reducer<GlobalModelState>,
    save: Reducer<GlobalModelState>,
    changeInfo: Reducer<GlobalModelState>
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    theme: 'light',
    data: {
      attr: [],
      pages: []
    },
    dbs: {},
    info: {},
    maps: [],
    tables: []
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
      }
      let res = yield call(Api.loadReport, payload);
      if (res.status) {
        let {data, dbs, info, maps, tables} = res.data;
        yield put({
          type: 'save',
          payload: res.data
        });
        console.log('loadData', res);
      }
    },

    changeInfo({ payload }, { put, select }) {
      put({
        type: 'changeInfo',
        payload
      })
    }
  },

  reducers: {

    save(state, { payload }) {
      return {
        ...(state as GlobalModelState),
        ...payload
      }
    },

    changeTheme(state, { payload }) {
      return {
        ...(state as GlobalModelState),
        theme:payload
      }
    },

    changeInfo(state, { payload }) {
      return {
        ...(state as GlobalModelState),
        info: {
          ...state.info,
          ...payload
        }
      }
    }
  }
}

export default GlobalModel;