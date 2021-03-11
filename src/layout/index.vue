<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-11 16:28:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  .app-wrapper
    sidebar.sidebar-container
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
  import { mapState } from 'vuex'
  import Logo from './components/Logo'

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
      ...mapState({
        sidebar: (state) => state.app.sidebar,
        device: (state) => state.app.device
        // showSettings: (state) => state.settings.showSettings
        // fixedHeader: (state) => state.settings.fixedHeader
      })
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

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
</style>
