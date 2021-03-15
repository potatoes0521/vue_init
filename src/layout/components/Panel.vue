<!--
 * @Author: liuYang
 * @description: panel
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 13:35:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
section.app-main
  .panel-wrapper
    .panel
      el-scrollbar( wrap-class="scrollbar-wrapper" )
        transition(name='fade-transform', mode='out-in')
          keep-alive(:include='cachedViews')
            router-view(:key='key')
</template>

<script>
  export default {
    name: 'Panel',
    computed: {
      cachedViews() {
        return 'cachedViews'
      },
      key() {
        const timer = new Date()
        return this.$route.path + timer
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';
  .hideSidebar {
    .app-main {
      padding-left: 54px !important;
    }
  }
  .app-main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: $navbarHeight;
    padding-left: $sideBarWidth;

    .panel-wrapper {
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      .panel {
        width: 100%;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        overflow: auto;
      }
    }
  }
</style>
