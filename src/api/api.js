/**
 * api接口统一管理
 */
import { get, post } from './request'

//获取登录状态接口(用于测试)
export const getLoginStatus = () => get('/baseInfo/getLogin',{});

//获取第一次登录时的token
export const getLoginToken = (params) => post('/user/login',params)

export const getUserInfo = () => get('/user/getUserInfo',{})

//根据用户的权限获取路由
export const getRouterList = (param) => get('/router/getList',{role:param})
