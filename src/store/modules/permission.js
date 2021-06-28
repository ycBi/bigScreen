import { asyncRoutes, constantRoutes,filterRouter,manageRoutes } from '@/router'
import {getRouterList} from '@/api/api'
/**
 * Use meta.role to determine if the current user has display
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    //在这里添加管理路由列表，页面上的菜单路由确实可以渲染出来，但是点击菜单发现页面地址栏变化了，但是界面为空白，原因是未能匹配到路由的组件
    // state.routes = constantRoutes.concat(routes).concat(manageRoutes)

  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []

      //从路由文件里取
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      // let role = roles.trim().replace('[','').replace(']','')
      let role = JSON.parse(roles)[0]
      getRouterList(role).then((res)=>{
        let accessedRoutesTemp = JSON.parse(res.data)
        accessedRoutes = filterRouter(accessedRoutesTemp)
        accessedRoutes = accessedRoutes.concat(manageRoutes)
        console.log('accessedRoutes',accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        //放到外面会因为异步的原因导致路由跳转但是无法匹配到组件跳到空白页中去
        resolve(accessedRoutes)
      })

      // let accessedRoutesTemp1 = "[{\"path\":\"/display\",\"component\":\"Layout\",\"redirect\":\"/display/page\",\"alwaysShow\":true,\"name\":\"Permission\",\"meta\":{\"title\":\"大屏展示\",\"icon\":\"lock\",\"roles\":[\"admin\",\"editor\"]},\"children\":[{\"path\":\"page\",\"component\":\"() => import('@/views/display/role')\",\"name\":\"PagePermission\",\"meta\":{\"title\":\"一号大厅展示\",\"src\":\"http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/\",\"roles\":[\"admin\"]}},{\"path\":\"directive1\",\"component\":\"() => import('@/views/display/role')\",\"name\":\"DirectivePermission1\",\"meta\":{\"title\":\"二号大厅展示\",\"roles\":[\"admin\"],\"src\":\"http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/\"}},{\"path\":\"role\",\"component\":\"() => import('@/views/display/role')\",\"name\":\"RolePermission\",\"meta\":{\"title\":\"三号大厅展示\",\"src\":\"http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/\",\"roles\":[\"admin\"]}},{\"path\":\"firstHall\",\"component\":\"() => import('@/views/display/role')\",\"name\":\"carousel\",\"meta\":{\"src\":\"http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/\",\"title\":\"四号大厅展示\",\"roles\":[\"admin\"]}}]},{\"path\":\"*\",\"redirect\":\"/404\",\"hidden\":true}]"
      // let accessedRoutesTemp = JSON.parse(accessedRoutesTemp1)
      // console.log('parse后的',accessedRoutesTemp)

      // let accessedRoutesTemp = [{"path":"/display","component":"Layout","redirect":"/display/page","alwaysShow":true,"name":"Permission","meta":{"title":"大屏展示","icon":"lock","roles":["admin","editor"]},"children":[{"path":"page","component":"() => import('@/views/display/role')","name":"PagePermission","meta":{"title":"一号大厅展示","src":"http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/","roles":["admin"]}},{"path":"directive1","component":"() => import('@/views/display/role')","name":"DirectivePermission1","meta":{"title":"二号大厅展示","roles":["admin"],"src":"http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/"}},{"path":"role","component":"() => import('@/views/display/role')","name":"RolePermission","meta":{"title":"三号大厅展示","src":"http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/","roles":["admin"]}},{"path":"firstHall","component":"() => import('@/views/display/role')","name":"carousel","meta":{"src":"http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/","title":"四号大厅展示","roles":["admin"]}}]},{"path":"*","redirect":"/404","hidden":true}];
      // accessedRoutes = filterRouter(accessedRoutesTemp)
      // accessedRoutes = accessedRoutes.concat(manageRoutes)
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
