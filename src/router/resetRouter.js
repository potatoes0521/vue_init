/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 17:27:39
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 19:21:46
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Vue from 'vue'
import Router from 'vue-router'
import { StaticRouterMap } from './index.js'

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: StaticRouterMap
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
console.log('router', router)
export default router
