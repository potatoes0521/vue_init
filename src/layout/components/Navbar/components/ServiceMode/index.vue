<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-15 13:40:32
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 14:04:30
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
  .component-wrapper
    .service-mode-item
      .text 服务渠道
      .icon.el-icon-arrow-down
    .service-mode-item
      .text 模式
      .icon.el-icon-arrow-down
</template>
<script>
  export default {
    name: 'ServiceMode',
    methods: {},
    mounted() {}
  }
</script>
<style scoped lang="scss">
  .component-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    left: 240px;
    .service-mode-item {
      color: #fff;
      height: 30px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-right: 30px;
      .icon {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
</style>
