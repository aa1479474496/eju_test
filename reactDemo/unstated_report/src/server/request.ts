import axios from "axios";
import Config from "@/server/env";
import { getQueryString } from "@/utils/utils";
import { message } from 'antd';


let myHttp = axios.create({
  baseURL: Config.apiPath,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
    // "Content-Type": "application/x-www-form-urlencoded"
    // 'fjdpversion': process.env.VUE_APP_ENVS
  },
  withCredentials: false
});
const CancelToken = axios.CancelToken;

// 添加请求拦截器
myHttp.interceptors.request.use(
  function(config) {
    // debugger
    let data = config.data || {};
    if (data.iExportFlag) {
      // console.log('下载的');
      // 下载文件操作
      config.responseType = "blob";
    }

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myHttp.interceptors.response.use(
  function(response) {
    // console.log("response", response);
    //token过期

    if (response.config.responseType !== "blob") {
      if (typeof response.data.status != "undefined" && !response.data.status) {
        let tipText = response.data.data || "出现错误，请稍后再试";
        // bi.message({
        //   tipText,
        //   type:'error'
        // });
        message.error(tipText);
        return {status:false}
      }
      if (typeof response.data.iError != "undefined" && response.data.iError !== 0){
        let tipText = response.data.data || "出现错误，请稍后再试";
        // bi.message({
        //   tipText,
        //   type:'error'
        // });
        message.error(tipText);

        return {status:false}
      }
    }
    // 对响应数据做点什么
    if (response.status != 200) {
      console.error(response.config);
    }
    // 如果status=-1则表示用户登录已过期
    if (response.data.status == -1) {
        // bi.message({
        //   tipText: '用户登录信息已过期,请重新登录',
        //   type: 'error'
        // });
        message.error('用户登录信息已过期,请重新登录');

        return {status:false}
    }
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

type BeforeParamsType = {
  customfilter?: any;
  rid?: any;
  token?: string | number;
}

export default class MYHTTP {
  static before(url = '', params: BeforeParamsType, config = {}) {
    if (!params.token) {
      params.token = getQueryString('token') || localStorage.getItem('token') || '';
    }

    if (url === '/bi/report/query' || url === '/bi/report/mapquery'
        || url === '/bi/report/param' || url === '/bi/report/mapparam'
        && params.customfilter == undefined) {
      params.customfilter = localStorage.getItem(params.rid+'customfilter') || '';
    }
    if (sessionStorage.getItem('debug')) {
      if (url.includes('?')) {
        url += '&';
      } else {
        url += '?';
      }
      url += 'debug=' + encodeURIComponent(sessionStorage.getItem('debug') || '');
    }

    return url;
  }

  static cancelToken() {
    let cancelToken = new CancelToken(function executor(c) {
      // bi.axiosCancel.push(c);
    });
    return cancelToken;
  }

  static get({ url = "", params = {}, config = {} }) {
    url = MYHTTP.before(url, params, config);
    let cancelToken = MYHTTP.cancelToken();

    Object.assign(config, { cancelToken });
    return myHttp.get(
      url,
      Object.assign(
        {},
        {
          params: params
        },
        config
      )
    );
  }

  static post({ url = "", params = {}, config = {} }) {
    url = MYHTTP.before(url, params, config);
    let cancelToken = MYHTTP.cancelToken();
    Object.assign(config, { cancelToken });
    return myHttp.post(url, params, config);
  }

  static upload({ url = "", params = {}, config = {} }) {
    return myHttp.post(
      url,
      params,
      Object.assign(
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        config
      )
    );
  }


}
