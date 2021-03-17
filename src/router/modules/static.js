/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-15 14:51:27
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 15:09:48
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 */

import Layout from '@layout'

export const whiteList = ['/login', '/500', '/404', '/403']

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
    path: '/home',
    name: '/home',
    redirect: '/index',
    component: Layout,
    meta: {
      hideInMenu: false,
      keepAlive: false,
      icon: 'iconshouye1',
      title: '首页'
    },
    children: [
      {
        path: '/index',
        meta: {
          title: '首页',
          keepAlive: false,
          icon: 'iconshouye1',
          hideInMenu: false
        },
        component: () => import('@views/Home/index.vue')
      }
    ]
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
