/*
 * @Author: liuYang
 * @description: 处理递归权限路由
 * @Path:  引入路径
 * @Date: 2021-03-09 17:26:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-21 17:51:32
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import router from './index.js'
import store from '@store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { handleMenuData } from './addRouter.js'
import { checkHeartBeat } from '@utils/auth.js'
import { whiteList } from './modules/static.js'

const env = process.env.NODE_ENV === 'development' ? true : false

router.beforeEach((to, from, next) => {
  NProgress.start()
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
            handleMenuData(to, next)
          }
        } else {
          next('/subsystem')
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          // 免登陆白名单 直接进入
          console.log('免登陆白名单 直接进入')
          if (env && !store.state.user.menuList.length) {
            handleMenuData(to, next)
          } else {
            next()
          }
        } else {
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
