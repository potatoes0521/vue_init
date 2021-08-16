<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-09 15:20:26
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-13 17:04:53
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
<template lang="pug">
  .page-wrapper
    iframe(
      height="100%"
      id="child"
      :src="url"
    )
</template>
<script>
  export default {
    name: 'iframeComponents',
    computed: {
      url() {
        return `${this.$route.meta.uri}?systemHost=${encodeURIComponent(window.location.origin)}`
      }
    },
    beforeDestroy() {
      const childIFrame = document.getElementById('child')
      childIFrame?.contentWindow?.postMessage('clearSystemHost', '*')
    }
  }
</script>
<style lang="scss" scoped></style>
