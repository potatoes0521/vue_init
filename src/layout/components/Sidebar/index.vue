<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-13 15:35:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
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
    el-button( @click="toggleSideBar" ) 展开 {{collapse}}
</template>

<script>
  import { mapActions } from 'vuex'
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
      ...mapActions({
        toggleSideBar: 'toggleSideBar'
      })
    }
  }
</script>
<style lang="scss"></style>
