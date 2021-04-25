/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-22 13:30:20
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-20 14:14:45
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import axios from '../axios'

// 接口/权限映射 -------------------------------------------------------------------
export const thisPermList = {
  getThisUserMenuTree: '/this/session/user-menu-tree',
  heartBeat: '/this/session/is-live',
  getUserPermList: '/this/session/user-perm-list',
  getUserInfo: '/this/session/user-info',
  loginOut: '/logout',
  exchangeTicket: '/cas/session/exchange-ticket',
  ticketLogin: '/login'
}

// 接口  --------------------------------------------------------------------------
/**
 * 获取当前用户菜单列表
 * @return void
 */
export const getThisUserMenuTree = () => {
  return axios.get(thisPermList['getThisUserMenuTree'])
}

/**
 * 根据token心跳检测token是否有效
 * @param {Object} data 请求参数
 * @return void
 */
export const heartBeat = (data) => {
  return axios.get(thisPermList['heartBeat'], data)
}

/**
 * 获取当前用户权限
 * @return void
 */
export const getUserPermList = () => {
  return axios.get(thisPermList['getUserPermList'])
}

/**
 * 获取当前用户信息
 * @return void
 */
export const getUserInfo = () => {
  return axios.get(thisPermList['getUserInfo'])
}

/**
 * 退出登录
 * @return void
 */
export const loginOut = () => {
  return axios.get(thisPermList['loginOut'])
}

/**
 * 换取登陆用的票据  主要给子系统过来的用
 * @param {Object} data 参数描述
 * @return void
 */
export const exchangeTicket = (data) => {
  return axios.post(thisPermList['exchangeTicket'], data)
}

/**
 * 用ticket登录
 * @param {Object} data ticket
 *  ticket 登录票据
 *  fp   浏览器唯一标识
 * @return void
 */
export const ticketLogin = (data) => {
  return axios.post(`${thisPermList['ticketLogin']}?ticket=${data.ticket}&fp=${data.fp}`)
}
