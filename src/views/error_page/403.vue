<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 17:38:41
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 17:46:48
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
-->
<template>
  <error-content code="403" desc="Oh~~您没有浏览这个页面的权限~" :src="src" />
</template>

<script>
  import error401 from '@img/error-page/error-401.svg'
  import errorContent from './error-content.vue'
  export default {
    name: 'error_403',
    components: {
      errorContent
    },
    data() {
      return {
        src: error401
      }
    }
  }
</script>
