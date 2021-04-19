/*
 * @Author: liuYang
 * @description: 处理递归权限路由
 * @Path:  引入路径
 * @Date: 2021-03-09 17:26:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-14 10:31:46
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
import { form } from '@/views/Pages/config/form.js'

const env = process.env.NODE_ENV === 'development' ? true : false

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title || '七石'
  }
  console.log(`%c console.log  --------`, 'color:red', 'from' + from.path, 'to' + to.path)
  const userStore = store.state.user
  // 已经登录要去login
  // 缝缝补补又三年  这里处理进入login还会检测心跳的问题
  // TODO: 这里不知道会不会影响子系统过来验证  先放个TODO 如果验证过了 记得删除
  if (to.path === '/login') {
    if (userStore.isLogin) {
      console.log(`%c console.log  --------`, 'color:blue', '已经登录')
      next(false)
    } else {
      // 如果重复跳转login 直接处理  虽然很low  但是还是要这样处理
      if (to.path === form.path) {
        console.log(`%c console.log  --------`, 'color:blue', '从登录去登录')
        next(false)
      } else {
        console.log(`%c console.log  --------`, 'color:blue', '未登录还去登录')
        next()
      }
    }
    return
  }
  // 进页面先心跳检测
  checkHeartBeat()
    .then((tokenState) => {
      if (tokenState) {
        console.log(`%c console.log  --------`, 'color:blue', '登录成功')
        if (to.path !== '/login') {
          if (userStore.menuList.length) {
            console.log(`%c console.log  --------`, 'color:blue', '有菜单')
            next()
          } else {
            console.log(`%c console.log  --------`, 'color:blue', '获取菜单')
            // 跳转到获取动态路由的方法
            handleMenuData(to, next)
          }
        } else {
          console.log(`%c console.log  --------`, 'color:blue', '去默认路由')
          next(userStore.defaultRouter)
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          // 免登陆白名单 直接进入
          if (env && !userStore.menuList.length && userStore.isLogin) {
            handleMenuData(to, next)
          } else {
            next()
          }
        } else {
          if (to.path !== '/login') {
            // 重定向到登录页面 不能这么写 因为假如之前的角色是 管理员页面 后又登陆了非管理员 重定向的页面就可能不存在,就会导致404
            // next(`/login?redirect=${to.path}`)
            next('/login')
          } else {
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
