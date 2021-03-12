<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-12 14:44:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  .app-wrapper
    sidebar.sidebar-container(
      :variables="variables"
      :opened="sidebar.opened"
      :menuList="menuList"
    )
    .main-container
      .fixed-header
        logo
        navbar
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
      ...mapGetters(['sidebar', 'menuList', 'device']),
      variables() {
        return variables
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
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

  .main-container {
    min-height: 100%;
    position: relative;
    box-sizing: border-box;
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
