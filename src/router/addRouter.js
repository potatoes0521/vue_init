/*
 * @Author: liuYang
 * @description: 动态路由添加之前先对后端数据进行处理
 * @Path:  引入路径
 * @Date: 2021-03-09 17:33:57
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-08 10:54:12
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 *
 *
 *
 * meta中额外参数
 * title: 显示在侧边栏、 面包屑和标签栏的文字
 * path: 路由的地址
 * name: 路由的name
 *   icon: (-) 该页面在左侧菜单、 面包屑和标签导航处显示的图标， 如果是自定义图标， 需要在图标名称前加下划线 '_'
 *   hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，
 *   hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *   keepAlive: (false) true是缓存 false是不缓存
 *   buttons: 页面内哪些模块显示
 *   sort: 2, 排序
 */
/**
 * 生成路由
 * @param {Array} routerList 格式化路由
 * @returns
 */
import store from '@store'
import Layout from '@layout'
import router from './index.js'
import mockMenu from '../mock/mockMenu.json'
import { listToTree } from '@/utils/treeTool.js'
import { getThisUserMenuTree } from '@api/this'
import { PermissionRouter } from './modules/asyncRouter.js'
import { hideInMenuRouter } from './modules/hideInMenuRouter.js'

export const handleMenuData = (to, next) => {
  const env = process.env.NODE_ENV === 'development' ? true : false
  if (env) {
    const asyncData = listToTree(mockMenu)
    const asyncRouter = transformRouterData(asyncData) // 进行递归解析
    // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
    const lastAsyncRouter = [...asyncRouter, ...hideInMenuRouter]
    router.addRoutes(lastAsyncRouter) // vue-router提供的addRouter方法进行路由拼接
    // 记录路由获取状态
    store.dispatch('commitMenuList', lastAsyncRouter) // 存储到vuex
    next({
      ...to,
      replace: true
    }) // hack方法 确保addRoutes已完成
  } else {
    // 记录路由获取状态
    getThisUserMenuTree() // 获取动态路由的方法
      .then(({ menus }) => {
        console.log(`%c console.log  --------`, 'color:green', menus)
        const asyncData = listToTree(menus)
        console.log(`%c console.log  --------`, 'color:red', asyncData)
        const asyncRouter = transformRouterData(asyncData) // 进行递归解析
        // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
        const lastAsyncRouter = [...asyncRouter, ...hideInMenuRouter]
        return lastAsyncRouter
      })
      .then((asyncRouter) => {
        router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
        // 记录路由获取状态
        store.dispatch('commitMenuList', asyncRouter) // 存储到vuex
        next({
          ...to,
          replace: true
        }) // hack方法 确保addRoutes已完成
      })
      .catch((e) => {
        console.log(e)
        // removeToken();
      })
  }
}
/**
 * 转换树形结构
 * @param {Array} routerList 已经转换成树形结构的数据
 * @return void
 */
export const transformRouterData = (routerList) => {
  // 按照父id分组
  const router = []
  routerList.forEach((e) => {
    const arr = e.menuHref?.split('/') || []
    const path = '/' + (arr[arr.length - 1] || 'path' + e.menuId)

    let e_new = {
      path: path,
      name: path
    }
    if (e.children) {
      e_new = {
        ...e_new,
        ...{
          component: Layout,
          children: transformRouterData(e.children)
        }
      }
    }
    const { component, meta } = PermissionRouter.filter((item) => path.endsWith(item.path))[0] || {}
    if (e.menuHref) {
      e_new = {
        ...e_new,
        ...{ component }
      }
    }

    if (e.redirect) {
      e_new = {
        ...e_new,
        ...{
          redirect: e.redirect
        }
      }
    }
    e_new = {
      ...e_new,
      ...{
        meta: {
          title: e.menuName || '',
          icon: e.menuIcon || '',
          ...meta
        }
      }
    }

    router.push(e_new)
  })
  console.log(`%c console.log  --------`, 'color:blue', router)
  return router
}
