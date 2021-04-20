/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-15 19:16:44
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-20 14:51:30
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */

export const PermissionRouter = [
  {
    path: '/home',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Home/index.vue')
  },
  {
    path: '/iframePage',
    name: 'iframePage',
    meta: {
      hideInMenu: false,
      icon: '',
      keepAlive: false,
      title: 'iframe'
    },
    component: () => import('@views/Iframe/index.vue')
  }
]
