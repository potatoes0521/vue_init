<!--
 * @Author: liuYang
 * @Description: 封装 el-switch 组件适配UI
      目前只对当前需求封装
      如需求不满足可以联系 刘洋 扩充兼容
 * @Path:   import QSSwitch from '@components/Switch'
 * @Date: 2021-03-17 10:57:08
 * @LastEditors: liuYang
 * @LastEditTime: 2021-07-01 16:53:38
 * @MustParam: 必传参数
      switchStatus switch的选中态
        Boolean 默认 true
 * @OptionalParam: 选传参数
      disabled 是否禁用
        Boolean 默认 false
      width 宽度
        Number 默认 40
      showLabelText 是否显示绑定的文字
        Boolean 默认 true
      activeText 关闭时的值
        String 默认 打开时的值
      inactive 关闭时的值
        String 默认 关闭时的值
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例

      QSSwitch(
        :switchStatus="switchStatus"
        activeText="开启"
        inactive="关闭"
        @onSwitchValueChange="onSwitchValueChange"
      )

-->
<template lang="pug">
  .switch-component-wrapper
    el-switch(
      :disabled="disabled"
      :width="width"
      :value="switchStatus"
      @change="onSwitchValueChange"
    )
    template( v-if="showLabelText" )
      span.switch-text {{switchStatus  ? activeText : inactive}}
</template>
<script>
  export default {
    name: 'QSSwitch',
    props: {
      switchStatus: {
        type: [Boolean, Number],
        required: true,
        default: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      width: {
        type: Number,
        required: false,
        default: 40
      },
      showLabelText: {
        type: Boolean,
        required: false,
        default: true
      },
      activeText: {
        type: String,
        required: false,
        default: 'switch 打开时的值'
      },
      inactive: {
        type: String,
        required: false,
        default: 'switch 关闭时的值'
      }
    },
    methods: {
      onSwitchValueChange(value) {
        this.$emit('onSwitchValueChange', value)
        this.$emit('update:switchStatus', value)
      }
    }
  }
</script>
<style scoped lang="scss">
  .switch-component-wrapper {
    display: inline-block;
    .switch-text {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      margin-left: 10px;
    }
  }
</style>
