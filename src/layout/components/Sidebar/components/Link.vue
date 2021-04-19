<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-12 09:51:20
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
  import { isExternal } from '@utils/patter'

  export default {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    computed: {
      isExternal() {
        return isExternal(this.to)
      },
      type() {
        if (this.isExternal) {
          return 'a'
        }
        return 'router-link'
      }
    },
    methods: {
      linkProps(to) {
        if (this.isExternal) {
          return {
            href: to,
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          to: to
        }
      }
    }
  }
</script>
