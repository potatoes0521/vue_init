/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-15 19:16:44
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-01 16:51:48
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */

export const PermissionRouter = [
  {
    path: '/subsystem',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Subsystem/index.vue')
  },
  {
    path: '/pages',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Pages/index.vue')
  },
  {
    path: '/menus',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Menus/index.vue')
  },
  {
    path: '/groups',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Groups/index.vue')
  },
  {
    path: '/role',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Role/index.vue')
  },
  {
    path: '/skill',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Skill/index.vue')
  },
  {
    path: '/permission',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Permission/index.vue')
  },
  {
    path: '/personnel',
    meta: {
      keepAlive: false,
      hideInMenu: false
    },
    component: () => import('@views/Personnel/index.vue')
  }
]
