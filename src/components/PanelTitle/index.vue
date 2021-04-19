<!--
 * @Author: liuYang
 * @Description: 页面标题
 * @Path:   import PanelTitle from '@components/PanelTitle'
 * @Date: 2021-03-16 10:34:21
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-26 13:50:57
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 * @slot/props.children: 提供的插槽或render
 * @Examples: 使用示例
    PanelTitle( title="子系统设置" )

-->
<template lang="pug">
  .panel-title-wrapper
    template( v-if="hasBack" )
      .el-icon-arrow-left.back-icon( @click="goBack" )
    span {{title}}
</template>
<script>
  export default {
    name: 'PanelTitle',
    props: {
      title: {
        type: String,
        required: true,
        default: '请传入标题'
      },
      hasBack: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="scss">
  .panel-title-wrapper {
    width: 100%;
    padding: 20px;
    padding-bottom: 25px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 500;
    color: #222222;
    line-height: 22px;
    display: flex;
    align-items: center;
    .back-icon {
      font-size: 15px;
      width: 20px;
      color: #666666;
      cursor: pointer;
    }
  }
</style>
