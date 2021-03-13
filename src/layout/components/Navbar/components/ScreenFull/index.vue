<!--
 * @Author: liuYang
 * @description: 头像旁边的放大按钮
 * @path: 引入路径
 * @Date: 2021-03-09 18:56:33
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-13 15:56:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  div 放大
</template>

<script>
  import screenfull from 'screenfull'

  export default {
    name: 'Screenfull',
    data() {
      return {
        isFullscreen: false
      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.destroy()
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen
      },
      init() {
        if (screenfull.enabled) {
          screenfull.on('change', this.change)
        }
      },
      destroy() {
        if (screenfull.enabled) {
          screenfull.off('change', this.change)
        }
      }
    }
  }
</script>

<style scoped>
  .screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
  }
</style>
