<!--
 * @Author: liuYang
 * @Description: Card组件
 * @Path: import Card from '@components/Card'
 * @Date: 2021-04-20 17:07:14
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-21 18:48:07
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
      title 卡片标题
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
      template( slot="header" )
        do something
      template( slot="main" )
        do something
      template( slot="footer" )
        do somethings

 * @Examples: 使用示例

    example1
      Card
          template( slot="header" )
            do something
          template( slot="main" )
            do something
          template( slot="footer" )
            do something
    example2
      Card( title="卡片标题" )
        template( slot="main" )
          do something
-->
<template lang="pug">
  .card-component-wrapper
    slot( name="header" v-if="$slots.header || title" )
      .title {{title}}
    .main
      slot( name="main" )
    .footer( v-if="$slots.footer" )
      slot( name="footer"  )
</template>
<script>
  export default {
    name: 'Card',
    props: {
      title: {
        title: String,
        required: false,
        default: ''
      }
    }
  }
</script>
<style scoped lang="scss">
  .card-component-wrapper {
    background: #ffffff;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > .title {
      margin: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
    }

    .main {
      margin: 0 20px;
      flex: 1;
    }
    .footer {
      border-top: 1px solid rgba(204, 204, 204, 0.4);
      padding: 18px 20px;
    }
  }

  .card-component-wrapper + .card-component-wrapper {
    margin-left: 20px;
  }
</style>
