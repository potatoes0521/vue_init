/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-14 10:10:51
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { StaticRouterMap } from './modules/static'

// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
// replace
Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}

const createRouter = () =>
  new Router({
    // base: '/qishi-cas/',
    // mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [...StaticRouterMap]
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
