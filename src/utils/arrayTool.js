/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-08-05 10:15:09
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-05 12:04:12
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import { PermissionRouter } from '@router/modules/asyncRouter'
import _differenceBy from 'loadsh/differenceBy'
export const handleStorageSyncServe = (serveRouter) => {
  console.log('%c [ serveRouter ]', 'font-size:13px; background:pink; color:#bf2c9f;', serveRouter)

  // 先找出来所有的子路由
  const childrenRouter = serveRouter
    .filter((item) => item.menuHref)
    .map((item) => ({ ...item, path: item.menuHref }))
  // 找到子路由合并本地出来不同路由
  const diffRouter = _differenceBy(childrenRouter, PermissionRouter, 'path')
  const needSaveDiffRouter = _differenceBy(serveRouter, diffRouter, 'menuId')
  console.log(
    '%c [ needSaveDiffRouter ]',
    'font-size:13px; background:pink; color:#bf2c9f;',
    needSaveDiffRouter
  )
  // for循环
  return needSaveDiffRouter
}
