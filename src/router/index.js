import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have display requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/display',
    component: Layout,
    redirect: '/display/firstHall',
    alwaysShow: true, // will always show the root menu
    name: 'exhibition',
    meta: {
      title: '大屏展示',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'firstHall',
        component: () => import('@/views/display/display'),
        name: 'firstHall',
        meta: {
          title: '一号大厅展示',
          src: 'http://192.168.7.156:50401/analysis/dashboard/show/2ab19145517a18d28721/',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'secondHall',
        component: () => import('@/views/display/display'),
        name: 'secondHall',
        meta: {
          title: '二号大厅展示',
          src: 'http://192.168.7.219:50401/analysis/dashboard/show/05cd39547179a1a1b489/',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'thirdHall',
        component: () => import('@/views/display/display'),
        name: 'thirdHall',
        meta: {
          title: '三号大厅展示',
          src: 'http://192.168.7.219:50401/analysis/dashboard/show/09d756e23179a12580fb/',
          roles: ['admin', 'editor']
        }
      }
      , {
        path: 'fourthHall',
        component: () => import('@/views/display/display'),
        name: 'fourthHall',
        meta: {
          src: 'http://192.168.7.219:50401/analysis/dashboard/show/03590db461799c1f107b/',
          title: '四号大厅展示',
          roles: ['admin', 'editor']
        }
      },
    ]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const manageRoutes = [
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/route',
    alwaysShow: true, // will always show the root menu
    name: 'manageRoute',
    meta: {
      title: '路由管理',
      icon: 'form',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'route',
        component: () => import('@/views/manageRoute/index'),
        name: 'route',
        meta: {
          title: '路由管理',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export function filterRouter(routers) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {     // Layout组件特殊处理
        route.component = Layout
      } else {
        // route.component = eval(route.component)
        //() => import('@/views/display/role')这种格式无法当成java代码来执行
        //还有一种方法为测试,路由的componen后面直接跟组件名称，导入在文件最开始引入，然后引入一个方法
        // route.component = _import(route.component)
        // function _import (file) {
        //   return () => import('@/components/views/' + file + '.vue')
        // }
        route.component = () => import('@/views/display/display')
      }
    }
    if (route.children && route.children.length) {
      route.children = filterRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

export default router
