<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 19:46:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
  section
    transition( name="fade-transform" mode="out-in" )
      keep-alive( :include="cachedViews" )
        router-view( :key="key" )
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    }
  }
</script>
<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
      padding-top: 84px;
    }
  }
</style>
