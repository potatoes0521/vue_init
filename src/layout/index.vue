<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-13 13:14:36
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
      sidebar.sidebar-container( :variables="variables" :menuList="menuList" :opened="isCollapse" )
      panel
</template>

<script>
  import Navbar from './components/Navbar'
  import Panel from './components/Panel'
  import Sidebar from './components/Sidebar'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapGetters } from 'vuex'
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
    mixins: [ResizeMixin],
    computed: {
      ...mapGetters(['sidebar', 'menuList']),
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixin.scss';
  @import '~@/assets/css/variables.scss';

  .app-wrapper {
    @include clearfix;

    position: relative;
    height: 100%;
    width: 100%;
  }

  .sidebar-container {
    width: $sideBarWidth;
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
