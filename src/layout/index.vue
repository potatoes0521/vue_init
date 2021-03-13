<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-13 16:00:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  .app-wrapper( :class="classObj" )
    .fixed-header
      logo
      navbar
    .main-container
      sidebar.sidebar-container(
        :variables="variables"
        :menuList="menuList"
        :collapse="isCollapse"
        @emitToggleSideBar="toggleSideBar"
      )
      panel
</template>

<script>
  import Navbar from './components/Navbar'
  import Panel from './components/Panel'
  import Sidebar from './components/Sidebar'
  import { mapGetters, mapActions } from 'vuex'
  import Logo from './components/Logo'
  import variables from '@css/variables.scss'
  export default {
    name: 'Layout',
    components: {
      Panel,
      Navbar,
      Sidebar,
      Logo
    },
    computed: {
      ...mapGetters(['sidebar', 'menuList']),
      variables() {
        return variables
      },
      isCollapse() {
        return this.sidebar.collapse
      },
      classObj() {
        return {
          hideSidebar: this.sidebar.collapse
        }
      }
    },
    methods: {
      ...mapActions({
        toggleSideBar: 'toggleSideBar'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixin.scss';

  .app-wrapper {
    @include clearfix;

    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
</style>
