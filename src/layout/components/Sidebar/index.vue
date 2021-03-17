<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-14 16:21:27
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
-->
<template lang="pug">
  div
    .menu-title
      span.text 系统菜单
      span( @click="toggleSideBar" :class="[collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" )
    el-scrollbar( wrap-class="scrollbar-wrapper" )
      el-menu(
        :default-active="activeMenu"
        :collapse="collapse"
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
  import SidebarItem from './components/SidebarItem'

  export default {
    components: { SidebarItem },
    props: {
      collapse: {
        type: Boolean,
        required: true,
        default: true
      },
      menuList: {
        type: Array,
        required: true,
        default: () => []
      },
      variables: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    computed: {
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      }
    },
    methods: {
      toggleSideBar() {
        this.$emit('emitToggleSideBar')
      }
    }
  }
</script>
<style lang="scss">
  .menu-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: '#333333';
    box-sizing: border-box;
    padding-left: 46px;
    padding-top: 30px;
    padding-bottom: 10px;
    padding-right: 20px;
    white-space: nowrap;
  }
</style>
