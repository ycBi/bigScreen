<template>
  <div :class="{'has-logo':showLogo}">
    <logo/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import {getRouterList} from '@/api/api'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data(){
    return {
      // permission_routes: []
    }
  },
  mounted() {
    console.log('sidebar=================================================')
    console.log(this.permission_routes)
    // getRouterList().then((res)=>{
    //   this.permission_routes = res.data
    // })
    // this.permission_routes = [{"path": "/display","component": "Layout","redirect": "/display/page","alwaysShow": true,"name": "Permission","meta": {"title": "大屏展示","icon": "lock","roles": ["admin", "editor"]},"children": [{"path": "page","component": "() => import('@/views/display/role')","name": "PagePermission","meta": {"title": "一号大厅展示","src": "http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/","roles": ["admin"]}},{"path": "directive","component": "() => import('@/views/display/role')","name": "DirectivePermission","meta": {"title": "二号大厅展示","src":"http://localhost:50401/analysis/dashboard/show/05cd39547179a1a1b489"}},{"path": "role","component": "() => import('@/views/display/role')","name": "RolePermission","meta": {"title": "三号大厅展示","src": "http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/","roles": ["admin"]}}, {"path": "firstHall","component": "() => import('@/views/display/role')","name": "carousel","meta": {"src": "http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b","title": "四号大厅展示","roles": ["admin"]}}]},{ "path": "*", "redirect": "/404", "hidden": true }]
  }
}
</script>
