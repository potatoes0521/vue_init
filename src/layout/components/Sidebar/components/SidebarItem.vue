<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-12 09:51:28
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
  div.menu( v-if="!item.meta.hideInMenu" )
    template( v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow" )
      AppLink( v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)" )
        el-menu-item(
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        )
          Item(
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          )
    el-submenu( v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body )
      template( slot="title" )
        Item( v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" )
      SidebarItem.nest-menu(
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      )
</template>

<script>
  import path from 'path'
  import { isExternal } from '@utils/patter'
  import Item from './Item'
  import AppLink from './Link'

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      this.onlyOneChild = null
      return {}
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter((item) => {
          if (item.hidden) {
            return false
          } else {
            this.onlyOneChild = item
            return true
          }
        })

        if (showingChildren.length === 1) {
          return true
        }

        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>
