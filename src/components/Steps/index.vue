<!--
 * @Author: liuYang
 * @Description: 步骤条
 * @Path: 引入路径
 * @Date: 2021-03-18 18:09:55
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-18 18:25:48
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->

<template lang="pug">
  .steps-component-wrapper
    .steps-item
      .icon 1
      .text 基本信息
    .steps-item
      .icon 1
      .text 权限

</template>
<script>
  export default {
    name: 'Steps',
    data() {
      return {}
    },
    components: {},
    methods: {},
    watch: {},
    mounted() {}
  }
</script>
<style scoped lang="scss">
  @import '~@/assets/css/variables.scss';

  .steps-component-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .steps-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 12px;
      width: 17px;
      height: 17px;
      border: 1px solid #999999;
      border-radius: 50%;
      color: #999999;
      margin-bottom: 5px;
    }

    .text {
      line-height: 20px;
      font-weight: 500;
      font-size: 14px;
    }

    .is-active {
      color: $themeBlue;
    }
  }
</style>
