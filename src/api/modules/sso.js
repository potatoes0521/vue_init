/*
 * @Author: liuYang
 * @Description: 单点登陆相关接口
 * 接口文档地址 http: //192.168.200.212:8080/doc.html#/qishi/01%E7%BB%9F%E4%B8%80%E8%AE%A4%E8%AF%81%E6%9C%8D%E5%8A%A1.09%E5%8D%95%E7%82%B9%E7%99%BB%E5%BD%95./loginUsingPOST
 * @Path: 引入路径
 * @Date: 2021-03-10 14:33:51
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-17 11:33:37
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 */

import axios from '../axios'

/**
 * 根据token心跳检测token是否有效
 * @param {Object} data 请求参数
 * @return void
 */
export const heartBeat = (data) => {
  return axios.post('', data)
}
/**
 * 根据账号密码登录
 * @param {Object} data 参数描述
 * @return void
 */
export const login = (data) => {
  return axios.post('/cas/sso/login', data)
}
/**
 * 换取登陆用的票据  主要给子系统过来的用
 * @param {Type} data 参数描述
 * @return void
 */
export const exchangeTicket = (data) => {
  return axios.post('/cas/sso/exchange-ticket', data)
}
