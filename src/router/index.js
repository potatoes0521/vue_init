/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-10 10:22:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@layout'

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
    path: '/',
    name: '/',
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

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
