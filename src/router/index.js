/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 16:26:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '@view/Home.vue'

export const StaticRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hideInMenu: true
    },
    component: () => import('@view/login/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/',
    component: Main,
    meta: {
      hideInMenu: false,
      keepAlive: false,
      title: ''
    },
    children: [
      {
        name: '',
        path: '/',
        meta: {
          title: '车务列表',
          keepAlive: false,
          icon: '',
          hideInMenu: false
        },
        component: () => import('@view/Login/index.vue')
      }
    ]
  },
  {
    path: '/redirect',
    component: Main,
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
        component: () => import('@/pages/redirect/index')
      }
    ]
  }
]

// 不太懂
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default new Router({
  // mode: "history",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
