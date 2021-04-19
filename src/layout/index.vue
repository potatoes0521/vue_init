<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-16 17:01:29
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
.app-wrapper(:class='{ hideSidebar: isCollapse }')
  .fixed-header
    Navbar
  .main-container
    Sidebar.sidebar-container(
      :variables='variables',
      :menuList='menuList',
      :collapse='isCollapse',
      @onToggleSideBar='toggleSideBar'
    )
    Panel
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
