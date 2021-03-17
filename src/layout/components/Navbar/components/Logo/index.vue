<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-10 17:59:55
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 13:55:52
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
-->
<template lang="pug">
  .logo-container
    img( v-if="logo" :src="logo" class="logo" )
</template>

<script>
  export default {
    name: 'SidebarLogo',
    data() {
      return {
        logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo-container {
    position: absolute;
    width: 34px;
    height: 20px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    left: 20px;
    top: 20px;

    .logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
  }
</style>
