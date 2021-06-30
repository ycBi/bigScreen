/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import {Message, Notification} from 'element-ui';
import store from '../store/index'
import config from './config'
import { getToken } from '@/utils/auth' // get token from cookie

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL =  config.baseUrl;
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL =  config.baseUrl;
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL =  config.baseUrl;
}

//序列化post请求参数
let serializePostParams = (obj) => {
  let temp = [];
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  Object.keys(obj).map(key => {
    if (obj[key] || obj[key] == 0) {
      temp.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  });
  return temp.join('&');
};

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//POST请求格式为'application/json'的API白名单
let postJsonApiWhiteList = ['/user/login','/router/updateRoutes']


// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = getToken()
    console.log(getToken())
    // token && (config.headers.Authorization = token);
    config.headers.token = token

    //针对put,post请求，处理提交的数据
    if (config.method === 'post' || config.method === 'put') {
      if (postJsonApiWhiteList.includes(config.url)) {
        config.headers['Content-Type'] = 'application/json';
      } else {
        config.data = serializePostParams(config.data);
      }
    }
    return config;
  },
  error => {
    return Promise.error(error);
  })


// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: '登录过期，请重新登录',
            duration: 1000,
          });
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            duration: 1500,
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            duration: 1500,
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url,params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
