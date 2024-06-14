import axios from 'axios';
import store from "@/store/store";

const request = axios.create({
    baseURL: 'http://47.95.177.195:8080',
    timeout: 5000
});

// 获取用户 IP 地址
async function getUserIP() {
    try {
        const response = await axios.get('https://ipinfo.io/json');
        return response.data.ip;
    } catch (error) {
        console.error('Failed to get user IP:', error);
        return null;
    }
}

// request 拦截器
request.interceptors.request.use(async config => {
    console.log("111111111111");
    // 设置请求头
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // 是否需要 token
    const isNeedToken = (config.headers || {}).isNeedToken === false;
    const token = store.state.token; // 从 Vuex 的 store 中获取 token
    const userIP = await getUserIP();

    if (!isNeedToken) {
        if (!token) {
            // 如果没有 token，可以根据实际情况进行处理，比如跳转到登录页面
            // router.push("/login");
        } else {
            config.headers['token'] = token;
        }
    }

    // 在 GET 请求的 params 中加入 id
    if (config.method === 'get' && config.params) {

        config.params.ip = userIP;
    }

    // 在 POST、PUT 和 DELETE 请求的 body 中加入用户 IP 地址
    if ((config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
        //const userIP = await getUserIP();
        if (userIP) {
            config.data = {
                ...config.data,
                ip: userIP
            };
        }
    }
    console.log(config.params)
    delete config.headers['isNeedToken'];
    return config;
}, error => {
    console.log("请求拦截器出错:", error);

    return Promise.reject(error);
});

// response 拦截器
request.interceptors.response.use(
    response => {
        console.log("123");
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
