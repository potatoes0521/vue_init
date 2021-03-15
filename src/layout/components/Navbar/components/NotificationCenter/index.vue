<!--
 * @Author: liuYang
 * @description: 通知中心
 * @path: 引入路径
 * @Date: 2021-03-15 10:22:57
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 17:49:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->

<template lang="pug">
  .component-wrapper
    .line
    .notification-list
      .notification-list-item.iconfont( v-for="item in msgList" :key="item.id" :class="item.icon" )
        .have-news
</template>
<script>
  export default {
    name: 'NotificationCenter',
    data() {
      return {
        msgList: [
          {
            icon: 'iconhebingxingzhuang1',
            id: 0
          },
          {
            icon: 'iconFill11',
            id: 1
          }
        ]
      }
    },
    components: {},
    methods: {},
    watch: {},
    mounted() {}
  }
</script>
<style scoped lang="scss">
  .component-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    min-width: 185px;

    .line {
      width: 2px;
      height: 20px;
      background: #fff;
      border-radius: 2px;
      opacity: 0.5;
    }

    .notification-list {
      display: flex;
      align-items: center;

      &-item {
        width: 20px;
        height: 20px;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 28px;
        position: relative;

        .have-news {
          width: 8px;
          height: 8px;
          position: absolute;
          box-sizing: border-box;
          border: 1.5px solid #fff;
          background: #f6504d;
          top: 0px;
          right: 0px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
