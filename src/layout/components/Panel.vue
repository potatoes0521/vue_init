<!--
 * @Author: liuYang
 * @description: panel
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-11 16:49:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
section.app-main
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

  .app-main {
    min-height: calc(100vh - navbarHeight);
    width: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: sideBarWidth;
  }
</style>
