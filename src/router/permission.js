/*
 * @Author: liuYang
 * @description: 处理递归权限路由
 * @path: 引入路径
 * @Date: 2021-03-09 17:26:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 14:54:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Vue from 'vue'
import router from './index.js'
import store from '@store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { addRouter } from './addRouter.js'
import { mockRouter } from './modules/mock.js'
import { checkHeartBeat } from '@utils/auth.js'
import { whiteList } from './modules/static.js'

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('to', to)
  console.log('from', from)
  // 进页面先心跳检测
  checkHeartBeat()
    .then((tokenState) => {
      if (tokenState) {
        if (to.path !== '/login') {
          if (store.state.user.menuList.length) {
            next()
          } else {
            console.log('跳转到获取动态路由的方法')
            // 跳转到获取动态路由的方法
            gotoRouter(to, next)
          }
        } else {
          next('/index')
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          // 免登陆白名单 直接进入
          console.log('免登陆白名单 直接进入')
          next()
        } else {
          console.log('2eles')
          if (to.path !== '/login') {
            // 重定向到登录页面 不能这么写 因为假如之前的角色是 管理员页面 后又登陆了非管理员 重定向的页面就可能不存在,就会导致404
            // next(`/login?redirect=${to.path}`)
            next('/login')
            console.log('重定向到登录')
          } else {
            console.log('登录')
            next()
          }
        }
      }
    })
    .catch(() => {
      next('/login')
    })
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

const env = process.env.NODE_ENV === 'development' ? true : false

function gotoRouter(to, next) {
  if (env) {
    let menus = mockRouter
    const asyncRouter = addRouter(menus) // 进行递归解析
    // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
    asyncRouter.push({
      path: '*',
      redirect: '/404',
      meta: {
        hideInMenu: true
      }
    })
    router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
    // 记录路由获取状态
    store.dispatch('commitMenuList', asyncRouter) // 存储到vuex
    next({
      ...to,
      replace: true
    }) // hack方法 确保addRoutes已完成
  } else {
    // 记录路由获取状态
    const userInfo = Vue.prototype.$storage.getCookie('admin')
    let sendData = {
      userId: userInfo.userId
    }
    Vue.prototype.$api.user
      .getUserMenus(sendData, Vue.prototype) // 获取动态路由的方法
      .then((res) => {
        console.log('res', res)
        const asyncRouter = addRouter(res.data) // 进行递归解析
        // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
        asyncRouter.push({
          path: '*',
          redirect: '/404',
          meta: {
            hideInMenu: true
          }
        })
        return asyncRouter
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
