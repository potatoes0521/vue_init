/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-22 13:30:20
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-15 18:37:09
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import axios from '../axios'

export const thisPermList = {
  getThisUserMenuTree: '/this/session/user-menu-tree'
}

/**
 * 获取当前用户菜单列表
 * @return void
 */
export const getThisUserMenuTree = () => {
  return axios.get(thisPermList['getThisUserMenuTree'])
}
