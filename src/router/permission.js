/*
 * @Author: liuYang
 * @description: 处理递归权限路由
 * @Path:  引入路径
 * @Date: 2021-03-09 17:26:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-13 16:55:35
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import router from './index.js'
import store from '@store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { handleMenuData } from './addRouter.js'
import { checkHeartBeat, isOtherSystemIframeOpen } from '@/utils/cas.js'
import { whiteList } from './modules/static.js'

const env = process.env.NODE_ENV === 'development' ? true : false

router.beforeEach((to, from, next) => {
  if (!isOtherSystemIframeOpen()) {
    NProgress.start()
  }
  if (to.meta.title) {
    document.title = to.meta.title || '七石'
  }
  console.log('%c [ from.path ]', 'font-size:13px; background:#FF00FF; color:#FFF;', from.path)
  console.log('%c [ to.path ]', 'font-size:13px; background:#FF00FF; color:#FFF;', to.path)
  const userStore = store.state.user
  // 进页面先心跳检测
  checkHeartBeat(undefined, to.path)
    .then((tokenState) => {
      if (tokenState) {
        console.log('%c [ 登录成功 ] >', 'font-size:13px; background:#006400; color:#FFF;')
        if (to.path !== '/login') {
          if (userStore.menuList.length) {
            console.log(
              '%c [ 登录成功 => 有菜单 ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
            next()
          } else {
            console.log(
              '%c [ 登录成功 => 获取菜单 ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
            // 跳转到获取动态路由的方法
            handleMenuData(to, next)
          }
        } else {
          if (userStore.menuList.length) {
            const returnURI = Storage.getSession('returnURI', false)
            Storage.removeSession('returnURI')
            next(returnURI || userStore.defaultRouter)
          } else {
            console.log(
              '%c [ 登录成功去登录 => 无菜单 => 请求菜单 ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
            handleMenuData(to, next)
          }
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          // 免登陆白名单 直接进入
          if (env && !userStore.menuList.length && userStore.isLogin) {
            console.log(
              '%c [ 白名单 => 获取菜单 ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
            handleMenuData(to, next)
          } else {
            console.log(
              '%c [ 白名单 => next ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
            next()
          }
        } else {
          if (to.path !== '/login') {
            // 重定向到登录页面 不能这么写 因为假如之前的角色是 管理员页面 后又登陆了非管理员 重定向的页面就可能不存在,就会导致404
            // next(`/login?redirect=${to.path}`)
            console.log(
              '%c [ 未登录or已失效 => 重定向到登录页面 ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
            next('/login')
          } else {
            console.log(
              '%c [ 未登录or已失效 => next ] >',
              'font-size:13px; background:#006400; color:#FFF;'
            )
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
