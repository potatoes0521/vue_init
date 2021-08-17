<!--
 * @Author: liuYang
 * @description: 入口文件  不建议修改
 * @Path:  引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-17 17:08:09
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
  #app( :style="appMinWidth" )
    router-view
</template>
<script>
  import { isOtherSystemIframeOpen } from './utils/cas'
  export default {
    computed: {
      appMinWidth() {
        return isOtherSystemIframeOpen()
          ? {}
          : {
              minWidth: '1440px'
            }
      }
    }
  }
</script>
<style lang="scss">
  #app {
    background: #efefef;
    // min-height: 900px;
  }
</style>
