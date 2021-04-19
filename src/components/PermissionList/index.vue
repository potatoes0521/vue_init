<!--
 * @Author: liuYang
 * @Description: 权限处理组件
      一般用在新增或者编辑从右边划出来的悬浮框
      参考蓝湖  https://lanhuapp.com/web/#/item/project/detailDetach?pid=19b1963d-52eb-4a12-bdd2-91b3bebabd2c&image_id=f517ba73-d266-4cf2-9fca-2f08ad76a4e2&project_id=19b1963d-52eb-4a12-bdd2-91b3bebabd2c&child=93b256d6-97c6-4892-aa04-572a1e38a858&fromEditor=true
 * @Path:   import PermissionList from '@components/PermissionList'
 * @Date: 2021-03-17 18:09:25
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-25 13:57:58
 * @MustParam: 必传参数
      permissionList 已有的权限列表
        *注 permissionList参数一定要有.sync修饰符
        *注 permissionList参数一定要有.sync修饰符
        *注 permissionList参数一定要有.sync修饰符

 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例

    PermissionList( :permissionList.sync="form.permissionList" )
    *注 permissionList参数一定要有.sync修饰符
    *注 permissionList参数一定要有.sync修饰符
    *注 permissionList参数一定要有.sync修饰符

-->
<template lang="pug">
  div
    template( v-if="!onlyRead" )
      .permission-components-wrapper
        .permission-item( v-for="item in permissionList" :key="item.permId" )
          span.permission-item-text {{item.permName}} {{item.permUri}}
          .permission-item-close.el-icon-close( @click="handleDeletePermission(item)" )
    template( v-else )
      .permission-wrapper
        p.permission-text( v-for="item in permissionList" :key="item.permId" ) {{item.permName}} {{item.permUri}}
</template>
<script>
  export default {
    name: 'index',
    props: {
      permissionList: {
        type: Array,
        required: true,
        default: () => []
      },
      onlyRead: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
      handleDeletePermission(item) {
        const permissionList = this.permissionList.filter((ite) => ite.permId !== item.permId)
        this.$emit('update:permissionList', permissionList)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '~@/assets/css/mixin.scss';

  .permission-components-wrapper {
    border: 1px solid #e6e6e6;
    width: 100%;
    height: 178px;
    overflow-y: auto;
    border-radius: 4px;
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-right: 0;

    .permission-item {
      background: rgba(68, 168, 255, 0.0977);
      border-radius: 2px;
      height: 21px;
      font-size: 12px;
      font-weight: 400;
      color: #666666;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 0 10px;
      margin-right: 20px;
      align-content: flex-start;
      display: inline-block;
      line-height: 21px;
      cursor: pointer;

      .permission-item-close {
        color: #34acff;
        margin-left: 13px;
        display: inline-block;
        line-height: 21px;
      }
    }
  }
  .permission-wrapper {
    background: #f5f5f5;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 165px;
    @include selfScrollBar(rgba(153, 153, 153, 0.59));
    .permission-text {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }
  }
</style>
