<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-11 16:21:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  el-scrollbar( wrap-class="scrollbar-wrapper" )
    el-menu(
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    )
      sidebar-item(
        v-for="route in menuList"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      )
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import variables from '@css/variables.scss'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters(['sidebar']),
      menuList() {
        return this.$store.getters.menuList
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      variables() {
        return variables
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      }
    }
  }
</script>
