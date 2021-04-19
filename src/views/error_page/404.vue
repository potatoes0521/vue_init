<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:38:41
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 17:46:58
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src" />
</template>

<script>
  import error404 from '@img/error-page/error-404.svg'
  import errorContent from './error-content.vue'
  export default {
    name: 'error_404',
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
