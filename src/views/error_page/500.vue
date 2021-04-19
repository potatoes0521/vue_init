<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:38:41
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 18:05:55
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template>
  <error-content desc="发生错误，您的请求无法完成。" :src="src" />
</template>

<script>
  import error404 from '@img/error-page/error-500.svg'
  import errorContent from './error-content.vue'
  export default {
    name: 'error_500',
    components: {
      errorContent
    },
    data() {
      return {
        src: error404
      }
    }
  }
</script>
