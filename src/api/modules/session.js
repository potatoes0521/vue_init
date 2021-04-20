/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-19 18:24:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 18:24:46
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import axios from '../axios'

// 接口/权限映射 -------------------------------------------------------------------
export const sessionPermList = {
  heartBeat: '/this/session/is-live',
  getUserPermList: '/this/session/user-perm-list',
  getUserInfo: '/this/session/user-info',
  loginOut: '/logout'
}

// 接口  --------------------------------------------------------------------------
/**
 * 根据token心跳检测token是否有效
 * @param {Object} data 请求参数
 * @return void
 */
export const heartBeat = (data) => {
  return axios.get(sessionPermList['heartBeat'], data)
}

/**
 * 获取当前用户权限
 * @return void
 */
export const getUserPermList = () => {
  return axios.get(sessionPermList['getUserPermList'])
}

/**
 * 获取当前用户信息
 * @return void
 */
export const getUserInfo = () => {
  return axios.get(sessionPermList['getUserInfo'])
}

/**
 * 退出登录
 * @return void
 */
export const loginOut = () => {
  return axios.get(sessionPermList['loginOut'])
}
