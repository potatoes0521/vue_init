<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 19:05:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
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
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@css/variables.scss'

  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters(['permission_routes', 'sidebar']),
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
    }
  }
</script>
