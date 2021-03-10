<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-10 14:14:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import AppMain from './components/AppMain'
  import Sidebar from './components/Sidebar'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapState } from 'vuex'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      Sidebar
    },
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        sidebar: (state) => state.app.sidebar,
        device: (state) => state.app.device
        // showSettings: (state) => state.settings.showSettings
        // fixedHeader: (state) => state.settings.fixedHeader
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
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

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  // .fixed-header {
  //   position: fixed;
  //   top: 0;
  //   right: 0;
  //   z-index: 9;
  //   // width: calc(100% - #{$sideBarWidth});
  //   transition: width 0.28s;
  // }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
