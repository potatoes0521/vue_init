<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:16:06
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 18:18:41
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<template lang="pug">
el-breadcrumb.app-breadcrumb(separator='/')
  transition-group(name='breadcrumb')
    el-breadcrumb-item(v-for='(item, index) in levelList', :key='item.path')
      span.no-redirect(v-if='item.redirect === "noRedirect" || index == levelList.length - 1') {{ item.meta.title }}
      a(v-else, @click.prevent='handleLink(item)') {{ item.meta.title }}
</template>

<script>
  import pathToRegexp from 'path-to-regexp'

  export default {
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route(route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
          return
        }
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        // only show routes with meta.title
        let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
        const first = matched[0]

        if (!this.isDashboard(first)) {
          matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
        }

        this.levelList = matched.filter(
          (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
        )
      },
      isDashboard(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      },
      pathCompile(path) {
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
