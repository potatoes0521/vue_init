<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 14:01:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
.app-wrapper(:class='{ hideSidebar: isCollapse }')
  .fixed-header
    navbar
  .main-container
    sidebar.sidebar-container(
      :variables='variables',
      :menuList='menuList',
      :collapse='isCollapse',
      @emitToggleSideBar='toggleSideBar'
    )
    panel
</template>

<script>
  import Navbar from './components/Navbar'
  import Panel from './components/Panel'
  import Sidebar from './components/Sidebar'
  import { mapGetters, mapActions } from 'vuex'
  import variables from '@css/variables.scss'
  export default {
    name: 'Layout',
    components: {
      Panel,
      Navbar,
      Sidebar
    },
    computed: {
      ...mapGetters(['sidebar', 'menuList']),
      variables() {
        return variables
      },
      isCollapse() {
        return this.sidebar.collapse
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

    .main-container {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
    }
  }

  .fixed-header {
    position: relative;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
</style>
