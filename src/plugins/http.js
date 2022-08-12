import axios from 'axios'
import { getCookie } from '@/utils/cookies.js';
import { ElMessage } from 'element-plus'
//import {router} from "@/router/index.js"
// API链接
let baseURL = 'http://127.0.0.1:8000';
//let baseURL='/////';
// 实例化请求器
const instance = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 150000
});

// 请求拦截器
// 因为getCookie('result')存储的是一个json字符串所以这里要用JSON.parse转成json
// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
instance.interceptors.request.use(config => {
    const cookie = JSON.parse(getCookie('result'))
    if (cookie) {
        config.headers.Authorization = cookie.token_type + ' ' + cookie.access_token //JSON.parse(getCookie('result'))
    }
    return config
},
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code === 200) {
            return response.data
        } else if (response.data.code === 500) {
            ElMessage({
                showClose: true,
                message: response.data.message,
                type: 'error',
            })
            return response.data
        }
        else {
            ElMessage({
                showClose: true,
                message: '请求成功！返回错误！' + response.status + '  ' + response.statusText,
                type: 'error',
            })
        }
    } else {
        ElMessage({
            message: '请求失败！请刷新重试！' + response.status + '  ' + response.statusText,
            type: 'error'
        })
    }
},
    error => {
        if (error.toString().includes('timeout')) {
            ElMessage({
                showClose: true,
                message: '请求超时，请刷新重试! ',
                type: 'error'
            })
        } else {
            if (!window.navigator.onLine) {
                //断网处理:可以跳转到断网页面,
                //router.push('/refresh')
                //store.commit('changeNetworkSuccess', false);
            }
        }
        // return Promise.reject(new Error(error))
    }
)
export default instance;