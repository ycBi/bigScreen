/**
 * api接口统一管理
 */
import { get, post } from './request'
//获取登录状态接口(用于测试)
export const getLoginStatus = () => get('/baseInfo/getLogin',{});

//获取第一次登录时的token
export const getLoginToken = (params)=>post('/user/login',params)

export const getRouterList = () => get('/user/getRouteList',{})
