<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: import DeleteDialog from '@components/DeleteDialog'
 * @Date: 2021-03-23 19:43:03
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-10 13:27:34
 * @MustParam: 必传参数
      warningMsg 警告文字
      title 弹窗标题
 * @OptionalParam: 选传参数
      width 弹框宽度
 * @EmitFunction: 函数
      onClickDelete 当点击了确定删除
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
    html
    DeleteDialog(
      title="提示"
      ref="deleteDialog"
      width="340px"
      warningMsg="xxxxx，请谨慎操作！"
      @onClickDelete="onClickDelete"
    )
    js
    onClickDelete(当初点击的表格的数据) {
      // to do
    }
    打开
    this.$refs.deleteDialog.openDialog(rowData)
    关闭
    this.$refs.deleteDialog.closeDialog(rowData)
-->
<template lang="pug">
  .delete-dialog-component-wrapper
    el-dialog(
      :width="width"
      destroy-on-close
      :show-close="false"
      :visible.sync="dialogVisible"
    )
      span.dialog-title( slot="title" ) {{title}}
      .warning {{warningMsg}}
      .template( v-if="$slots.template" )
        slot( name="template" )
      span.dialog-footer( slot="footer")
        el-button( @click="dialogVisible=false" ) 取消
        el-button( type="danger" plain @click="handleDelete" :loading="deleteLoading" ) 确定
</template>
<script>
  export default {
    name: 'DeleteDialog',
    props: {
      warningMsg: {
        type: String,
        required: true,
        default: ''
      },
      title: {
        type: String,
        required: false,
        default: '确认删除'
      },
      width: {
        type: String,
        required: false,
        default: '360px'
      },
      deleteLoading: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        data: null
      }
    },
    methods: {
      handleDelete() {
        this.$emit('onClickDelete', this.data)
      },
      openDialog(data) {
        this.dialogVisible = true
        this.data = data
      },
      closeDialog() {
        this.dialogVisible = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .dialog-title {
    font-size: 18px;
    font-weight: 500;
    color: #020e22;
    line-height: 25px;
  }
  .warning {
    line-height: 21px;
  }
</style>
