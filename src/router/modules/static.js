/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-15 14:51:27
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-12 18:06:05
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */

import Layout from '@layout'
import _differenceBy from 'loadsh/differenceBy'

export const whiteList = ['/login', '/500', '/404', '/403']

export const getDefaultRouter = (RouterList) => {
  const whiteListMap = whiteList.map((item) => ({
    path: item
  }))
  const arr =
    _differenceBy([...RouterList], whiteListMap, 'path').filter(
      (item) => !item.meta.hideInMenu
    )[0] || {}
  let defaultRouter = arr.path || '/404'
  if (arr.children) {
    defaultRouter = arr.children.filter((item) => !item.meta.hideInMenu)[0].path
  }
  return defaultRouter
}

export const StaticRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hideInMenu: true
    },
    component: () => import('@views/Login/index.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@views/error_page/500.vue')
  },
  {
    path: '/404',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@views/error_page/404.vue')
  },
  {
    path: '/403',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@views/error_page/403.vue')
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'redirect',
    meta: {
      title: '重定向',
      keepAlive: false,
      icon: 'md-home',
      hideInMenu: true,
      hideInBread: true
    },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@views/redirect/index')
      }
    ]
  }
]
