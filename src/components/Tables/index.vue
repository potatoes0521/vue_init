<!--
 * @Author: liuYang
 * @Description: 表格组件
    起名为tables主要是为了区别html原生table
    目前只对当前需求封装
    如需求不满足可以联系 刘洋 扩充兼容
 * @Path:  引入路径
 * @Date: 2021-03-16 16:47:31
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-14 12:04:16
 * @MustParam: 必传参数
    tableData 表格要展示的数据
      Array
    tableColumn 要渲染的表格列数据
      Array
 * @OptionalParam: 选传参数
    参考element-ui 表格文档  https://element.eleme.cn/#/zh-CN/component/table
 * @EmitFunction: 函数
    onCurrentPageChange 当点击页码发生改变的时候
 * @Slot/Props.children: 提供的插槽或render
    actions 插槽
 * @Examples: 使用示例

      Tables(
        :tableData="tableData"
        :tableColumn="tableColumn"
        ...props
      )
-->
<template lang="pug">
  .component-wrapper
    .table-wrapper
      el-table(
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        :row-key="rowKey"
        :tree-props="treeProps"
        default-expand-all
        @selection-change="handleSelectionChange"
      )
        template( v-if="selection" )
          el-table-column(
            type="selection"
            width="55"
          )
        slot( name="frontColumn" )
        el-table-column(
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth || ''"
          :formatter="item.formatter"
        )
        slot( name="actions" )
    .page-pagination-wrapper
      el-pagination(
        hide-on-single-page
        layout="prev, pager, next"
        :total="totalNum"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="onCurrentPageChange"
      )
</template>
<script>
  export default {
    name: 'Tables',
    props: {
      tableData: {
        type: Array,
        required: true,
        default: () => []
      },
      tableColumn: {
        type: Array,
        required: true,
        default: () => []
      },
      totalNum: {
        type: Number,
        required: true,
        default: 0
      },
      currentPage: {
        type: Number,
        required: true,
        default: 1
      },
      selection: {
        type: Boolean,
        required: false,
        default: false
      },
      rowKey: {
        type: [Number, String],
        required: false,
        default: ''
      },
      treeProps: {
        type: Object,
        required: false,
        default: () => {}
      },
      pageSize: {
        type: Number,
        required: false,
        default: -1
      }
    },
    data() {
      return {}
    },
    components: {},
    methods: {
      onCurrentPageChange(params) {
        this.$emit('onCurrentPageChange', params)
      },
      handleSelectionChange(params) {
        this.$emit('onSelectionChange', params)
      }
    }
  }
</script>
<style scoped lang="scss">
  .component-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;

    .table-wrapper {
      flex: 1;
      // min-height: 600px;
    }
  }
  .page-pagination-wrapper {
    height: 77px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
