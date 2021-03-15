/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 15:09:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { StaticRouterMap } from './modules/static'

// const createRouter = () => {
//   new Router({
//     mode: 'history', // require service support
//     scrollBehavior: () => ({
//       y: 0
//     }),
//     routes: StaticRouterMap
//   })
// }
// const router = createRouter()

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// export default router

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
console.log('StaticRouterMap', StaticRouterMap)
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
