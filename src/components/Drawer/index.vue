<!--
 * @Author: liuYang
 * @Description: 右侧浮动面板
 * @Path:    import Drawer from '@components/Drawer'
 * @Date: 2021-03-15 17:55:17
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-14 18:57:02
 * @MustParam:  必传参数
 *  title 顶部标题
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 * @slot/props.children: 提供的插槽或render
    main插槽
      Drawer(
        :title="请传入标题"
        ref="drawer"
      )
        template( slot="main" )
          // to do
 * @Examples: 使用示例
    打开
      this.$refs.drawer.openPanel()
    关闭
      this.$refs.drawer.closePanel()
-->
<template lang="pug">
transition(name="slide-fade")
  .drawer-components-wrapper( @click.self='closePanel' v-if="isShowPanel" )
    .main-wrapper
      //- .el-icon-close.icon-wrapper( @click.stop="closePanel" )
      .title {{ title }}
      .wrapper
        slot( name='main' )
</template>
<script>
  export default {
    name: 'Drawer',
    props: {
      title: {
        type: String,
        required: true,
        default: '右侧浮动面板'
      }
    },
    data() {
      return {
        isShowPanel: false
      }
    },
    components: {},
    methods: {
      closePanel() {
        this.isShowPanel = false
      },
      openPanel() {
        this.isShowPanel = true
      }
    },
    watch: {
      isShowPanel() {
        const test =
          this.$slots &&
          this.$slots.main &&
          this.$slots.main[0] &&
          this.$slots.main[0].context &&
          this.$slots.main[0].context.$refs &&
          this.$slots.main[0].context.$refs.form &&
          this.$slots.main[0].context.$refs.form.resetFields
        if (!this.isShowPanel && test) {
          this.$slots.main[0].context.$refs.form.resetFields()
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .drawer-components-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 14;
    .main-wrapper {
      width: 678px;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 15;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;

      .icon-wrapper {
        width: 40px;
        height: 40px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #666;
        cursor: pointer;
      }

      .title {
        background: #fff;
        font-size: 18px;
        font-weight: 500;
        color: #222222;
        line-height: 25px;
        padding: 24px;
      }

      .wrapper {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        padding-top: 6px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .drawer-components-wrapper {
      display: none;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(678px);
    opacity: 0;
  }
</style>
