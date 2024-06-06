import axios from 'axios';
import store from "@/store/store";

const request = axios.create({
    baseURL: 'http://47.95.177.195:8080',
    timeout: 5000
});

/**
 * request 拦截器
 * 可以自请求发送前对请求做一些处理
 * 比如统一加token，对请求参数统一加密
 */
request.interceptors.request.use(config => {
    console.log("111111111111")
    // 设置请求头
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // 是否需要token
    const isNeedToken = (config.headers || {}).isNeedToken === false;
    const token = store.state.token; // 从 Vuex 的store中获取token

    if (!isNeedToken) {
        if (!token) {
            // 如果没有token，可以根据实际情况进行处理，比如跳转到登录页面
            // router.push("/login");
        } else {
            config.headers['token'] = token;
        }
    }
    return config;
}, error => {
    console.log("请求拦截器出错:", error);
    return Promise.reject(error);
});

/**
 * response 拦截器
 * 可以在接口响应后统一处理结果
 */
request.interceptors.response.use(
    response => {
        console.log("123")
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res;
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res;
        }
        return res;
    },
    error => {
        console.log('响应拦截器出错:', error); // for debug
        return Promise.reject(error);
    }
);

export default request;

