/*
 * @Author: liuYang
 * @Description: 不需要菜单控制但是需要登录才能进入的界面
 *    比如 详情界面
 * @Path: 引入路径
 * @Date: 2021-03-22 11:21:42
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 18:37:09
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */

// import Layout from '@layout'

export const hideInMenuRouter = [
  // {
  //   path: '/hideMenu',
  //   component: Layout,
  //   name: 'hideMenu',
  //   meta: {
  //     title: '隐藏页面',
  //     keepAlive: false,
  //     hideInMenu: true,
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: '/settingPermission',
  //       name: 'settingPermission',
  //       meta: {
  //         hideInMenu: true,
  //         icon: '',
  //         keepAlive: false,
  //         title: '分配权限'
  //       },
  //       component: () => import('@views/SettingPermission/index.vue')
  //     }
  //   ]
  // },
  // 这个一定要写在最后
  {
    path: '*',
    redirect: '/404',
    meta: {
      hideInMenu: true
    }
  }
]
