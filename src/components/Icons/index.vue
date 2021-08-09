<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-23 16:13:12
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-24 13:45:30
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
<template lang="pug">
  .icon-component-wrapper
    el-dialog(
      title="选择Icon"
      :visible.sync="dialogVisible"
      width="835px"
      destroy-on-close
      append-to-body
    )
      .dialog-main
        .dialog-list
          .dialog-list-item( v-for="item in Icons" @click="handleChoose(item)" )
            i.icon( :class="'el-icon-' + item" )
            span.icon-name {{'el-icon-' + item}}
</template>
<script>
  import Icons from '@/assets/iconfont/iconfont.json'
  export default {
    name: 'Icons',
    data() {
      this.Icons = Icons
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleChoose(item) {
        this.$emit('onChooseIcon', 'el-icon-' + item)
        this.closeDialog()
      },
      openDialog() {
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '~@/assets/css/mixin.scss';

  .dialog-main {
    height: 500px;
    overflow-y: auto;
    border: 1px solid #eaeefb;
    @include selfScrollBar(rgba(153, 153, 153, 0.59));
  }
  .dialog-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    // border: 1px solid #eaeefb;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    .dialog-list-item {
      cursor: pointer;
      width: 130px;
      height: 130px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #606266;
      .icon {
        display: block;
        font-size: 32px;
        margin-bottom: 10px;
        line-height: 1;
      }
      .icon-name {
        display: inline-block;
        padding: 0 5px;
        height: 1em;
      }
    }
  }
</style>
