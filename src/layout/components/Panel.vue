<!--
 * @Author: liuYang
 * @Description: panel
 * @Path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 18:20:03
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
-->
<template lang="pug">
section.app-main
  .panel-wrapper
    .panel
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
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

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

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #eef4f9;
      }

      ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #eef4f9;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
