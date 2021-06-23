import { asyncRoutes, constantRoutes,filterRouter } from '@/router'
import {getRouterList} from '@/api/api'
/**
 * Use meta.role to determine if the current user has permission
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
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // getRouterList().then((res)=>{
      //   console.log(res.data)
      //   accessedRoutes = JSON.parse(res.data)
      //   console.log(accessedRoutes)
      //   commit('SET_ROUTES', accessedRoutes)
      // })
       let accessedRoutesTemp = [{"path": "/permission","component": "Layout","redirect": "/permission/page","alwaysShow": true,"name": "Permission","meta": {"title": "大屏展示","icon": "lock","roles": ["admin", "editor"]},"children": [{"path": "page","component": "() => import('@/views/permission/role')","name": "PagePermission","meta": {"title": "一号大厅展示","src": "http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/","roles": ["admin"]}},{"path": "directive","component": "() => import('@/views/permission/role')","name": "DirectivePermission","meta": {"title": "二号大厅展示","src":"http://localhost:50401/analysis/dashboard/show/05cd39547179a1a1b489"}},{"path": "role","component": "() => import('@/views/permission/role')","name": "RolePermission","meta": {"title": "三号大厅展示","src": "http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/","roles": ["admin"]}}, {"path": "firstHall","component": "() => import('@/views/permission/role')","name": "carousel","meta": {"src": "http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b","title": "四号大厅展示","roles": ["admin"]}}]},{ "path": "*", "redirect": "/404", "hidden": true }]
       // accessedRoutes = JSON.parse()
      accessedRoutes = filterRouter(accessedRoutesTemp)
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      console.log('=============================')
      console.log(accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
