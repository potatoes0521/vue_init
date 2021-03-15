<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-15 11:02:48
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 17:47:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  .component-wrapper
    .control-wrapper
      .control-item( v-for="item in controlList" :key="item.id" )
        .control-item-icon.iconfont( :class="item.icon" :style="{fontSize: item.size ? item.size + 'px': ''}" )
        .control-item-text {{item.text}}
</template>
<script>
  export default {
    name: 'Control',
    data() {
      return {
        controlList: [
          {
            icon: 'iconFil3',
            text: '静音',
            id: 1,
            size: 14
          },
          {
            icon: 'iconFill4',
            text: '呼出',
            id: 2,
            size: 14
          },
          {
            icon: 'iconFill5',
            text: '呼入',
            id: 3,
            size: 14
          },
          {
            icon: 'iconFill6',
            text: '监听',
            id: 4,
            size: 13
          },
          {
            icon: 'iconservice',
            text: '打断',
            id: 5
          },
          {
            icon: 'iconFill9',
            text: '短信',
            id: 6,
            size: 13
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
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;

    .control-wrapper {
      display: flex;
      align-items: center;
      border-radius: 24px;
      background-color: rgba(243, 246, 253, 0.6);
      // filter: Alpha(opacity=50);
      opacity: 0.6;
      // height: 40px;
      padding: 7px 8px 4px;
      box-sizing: border-box;

      .control-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0 14px;
        &-icon {
          font-size: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #004785;
          margin-bottom: 2px;
        }

        &-text {
          transform: scale(0.8);
          font-size: 10px;
          line-height: 11px;
          color: #004785;
          font-weight: 400;
        }
      }
    }
  }
</style>
