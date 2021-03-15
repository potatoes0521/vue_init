<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-15 09:59:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 10:21:46
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  .component-wrapper
    .user-head
      img( src="https://www.imageoss.com/images/2021/03/10/64076f7a41ad3ff0046.png" )
      .inline-status.inline
    .msg-wrapper
      .nickname 汉字
      .user-number 123123
    .el-icon-arrow-down.icon

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
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin-right: 30px;
    display: flex;
    padding: 13px 0;
    align-items: center;
    color: #fff;
    cursor: pointer;

    .user-head {
      width: 30px;
      height: 30px;
      position: relative;
      img {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .inline-status {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        right: -6px;
        bottom: -3px;
      }
      .inline {
        background: linear-gradient(180deg, #42eca3 0%, #01ca75 100%);
      }
      // .out-line {
      // }
    }

    .msg-wrapper {
      margin: 0 20px;
      min-width: 50px;
      .nickname {
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
      }
      .user-number {
        line-height: 14px;
        font-size: 12px;
      }
    }

    .icon {
      width: 10px;
      font-size: 5px;
    }
  }
</style>
