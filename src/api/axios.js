/*
 * @Author: liuYang
 * @description: axios实例化并暴露方法
 * @path: 引入路径
 * @Date: 2021-03-09 15:46:32
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-12 10:59:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

import HttpRequest from './handleRequest'
import config from '@/config'

const axios = new HttpRequest(config.baseUrl)

export default {
  get(url, data, that) {
    return axios.request({
      url,
      data: data,
      method: 'get',
      that
    })
  },
  post(url, data, that) {
    return axios.request({
      url,
      data: data,
      method: 'post',
      that
    })
  },
  put(url, data, that) {
    return axios.request({
      url,
      data: data,
      method: 'put',
      that
    })
  }
}
