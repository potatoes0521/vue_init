/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:27:39
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-15 14:53:01
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import Vue from 'vue'
import Router from 'vue-router'
import { StaticRouterMap } from './modules/static'

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
export default router
