/*
 * @Author: liuYang
 * @description: 动态路由添加之前先对后端数据进行处理
 * @path: 引入路径
 * @Date: 2021-03-09 17:33:57
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-12 17:31:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 *
 *
 *
 *
  meta中额外参数
    *
    title: 显示在侧边栏、 面包屑和标签栏的文字 *
    path: 路由的地址 *
    name: 路由的name *
    icon: (-) 该页面在左侧菜单、 面包屑和标签导航处显示的图标， 如果是自定义图标， 需要在图标名称前加下划线 '_' *
    hideInBread: (false) 设为true后此级路由将不会出现在面包屑中， *
    hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项 *
    keepAlive: (false) true是缓存 false是不缓存 *
    buttons: 页面内哪些模块显示 *
    sort: 2, 排序 *
    loadPath: 前端访问的路径 *
 */
/**
 * 生成路由
 * @param {Array} routerList 格式化路由
 * @returns
 */
export function addRouter(routerList) {
  const router = []
  routerList.forEach((e) => {
    let e_new = {
      path: e.path,
      name: e.name
    }
    if (typeof e.loadPath === 'string') {
      e_new = Object.assign({}, e_new, {
        component: () => import(`@views/${e.loadPath}.vue`)
      })
    }
    if (e.children) {
      e_new = Object.assign({}, e_new, {
        children: addRouter(e.children)
      })
    }
    if (e.redirect) {
      e_new = Object.assign({}, e_new, {
        redirect: e.redirect
      })
    }
    if (e.icon !== '' && e.title !== '') {
      e_new = Object.assign({}, e_new, {
        meta: {
          title: e.title,
          icon: e.icon,
          hideInMenu: e.hideInMenu,
          keepAlive: e.keepAlive
        }
      })
    } else if (e.title !== '' && e.icon === '') {
      e_new = Object.assign({}, e_new, {
        meta: {
          title: e.title,
          hideInMenu: e.hideInMenu,
          keepAlive: e.keepAlive
        }
      })
    }
    router.push(e_new)
  })
  return router
}
