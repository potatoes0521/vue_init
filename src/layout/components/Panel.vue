<!--
 * @Author: liuYang
 * @description: panel
 * @Path:  引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-16 11:57:44
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
section.app-main
  .panel-wrapper
    .panel( :class="{ 'panel-padding' : !iframeOpen}" )
      transition( name='fade-transform' mode='out-in' )
        keep-alive( :include='cachedViews' )
          router-view( :key='key' )
      //- SpringScreen
</template>

<script>
  export default {
    name: 'Panel',
    props: {
      iframeOpen: {
        type: Boolean,
        required: true,
        default: false
      }
    },
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
  @import '~@/assets/css/mixin.scss';
  .app-main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    .panel-padding {
      padding: 20px;
    }

    .panel-wrapper {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .panel {
        width: 100%;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        overflow: auto;
      }

      @include scrollBar();
    }
  }
</style>
