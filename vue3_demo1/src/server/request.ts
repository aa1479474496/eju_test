/* eslint-disable no-undef */
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Config, { MOCKAPIURL } from "@/server/env";
// import store from '@/store/index.js';
import router from '@/routes/index';
import qs from 'qs'

let myHttp:AxiosInstance = axios.create({
    baseURL: Config.apiPath,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    withCredentials: false
});
const CancelToken = axios.CancelToken;
let requestQueue = <any>[];

let accessCode = [101000001, 1000101, 101000002, 200]

// 请求拦截调用
function handleRequest({ config }) {
    // 提取四个参数用于区分相同的请求
    const { url, method, data = {}, params = {} } = config;
    const jData = JSON.stringify(data), jParams = JSON.stringify(params)

    const panding = requestQueue.filter(item => {
        return item.url === url && item.method === method && item.data === jData && item.params === jParams
    })
    if (panding.length) {
        // 这里是重点，实例化CancelToken时，对参数 c 进行立即调用，即可立即取消当前请求
        config.cancelToken = new CancelToken(c => c(`重复的请求被主动拦截: ${url} + ${jData} + ${jParams}`))
    } else {
        // 如果请求不存在，将数据转为JSON字符串格式，后面比较好对比
        requestQueue.push({
            url,
            data: jData,
            params: jParams,
            method,
        })
    }
}

// 响应拦截调用
function handleResponse({ config }) {
    const { url, data = JSON.stringify({}), params = JSON.stringify({}) } = config
    let reqQueue = requestQueue.filter(item => {
        return item.url !== url && item.data !== data && item.params !== params
    })
    requestQueue = reqQueue
}

// 添加请求拦截器
myHttp.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        handleRequest({ config });

        if (config.headers['Content-Type'] == "application/x-www-form-urlencoded" && config.data) {
            config.data = qs.stringify(config.data)
        }

        let data = config.data || {};

        // 下载文件操作
        if (data.iExportFlag) {
            config.responseType = "blob";
        }
        // 判断是否存在token,如果存在将每个页面header添加token
        // if (store.getters.token && !data.notToken && config.baseURL !== MOCKAPIURL) {
        //     config.headers.common['X-TOKEN'] = store.getters.token
        // }

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
myHttp.interceptors.response.use(
    function (response: AxiosResponse) {
        handleResponse({ config: response.config });

        if (response.config.responseType !== "blob") {
            let { errorCode } = response.data;

            if (errorCode && !accessCode.includes(errorCode)) {
                let message = response.data.errorMsg || "出现错误，请稍后再试";
                // bi.message({
                //     message,
                //     type: 'error'
                // });
                // bi.log('response.data:', response.data)
            }

            // 后台返回提示未登录，并且本地有token, 调用 store.dispatch("user/loginOut")方法

            // if (errorCode == 101000001 && store.getters.token) {
            //     store.dispatch("user/loginOut");
            // }


        }
        return response.data;
    },
    function (error) {

        let url = router.currentRoute.fullPath

        if (error.response && error.response.config) {
            handleResponse({ config: error.response.config });
        }

        if (error && error.response && error.response.status == 401) {

            // store.dispatch("user/loginOut");

            if (url.match('/personal')) {
                router.push('/login')
            }

            return Promise.reject(error)
        }

        return Promise.reject(error);
    }
);
export default class MYHTTP {

    static cancelToken() {
        let cancelToken = new CancelToken(function executor(c) {
            // bi.axiosCancel.push(c);
        });
        return cancelToken;
    }

    static get({ url = "", params = {}, config = {} }) {
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
        let cancelToken = MYHTTP.cancelToken();
        Object.assign(config, { cancelToken });
        return myHttp.post(url, params, config);
    }

    static put({ url = "", params = {}, config = {} }) {
        let cancelToken = MYHTTP.cancelToken();
        Object.assign(config, { cancelToken });
        return myHttp.put(url, params, config);
    }

    static delete({ url = "", params = {}, config = {} }) {
        let cancelToken = MYHTTP.cancelToken();
        Object.assign(config, { cancelToken });

        return myHttp.delete(url, {
            data: params, headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
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
