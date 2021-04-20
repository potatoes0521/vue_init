<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-09 15:20:26
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-09 19:54:48
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
      :src="this.$route.meta.uri"
    )
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {}
    },
    components: {},
    methods: {},
    watch: {},
    mounted() {
      console.log(`%c console.log  -------- iframe`, 'color:blue', this.$route.meta.uri)
    }
  }
</script>
<style lang="scss" scoped></style>
