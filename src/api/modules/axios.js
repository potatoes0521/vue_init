/*
 * @Author: liuYang
 * @description: axios实例化并暴露方法
 * @path: 引入路径
 * @Date: 2021-03-09 15:46:32
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 15:46:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

import HttpRequest from './requestHandle.js.js'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)

export default {
  get(url, data, that) {
    return axios.request({
      url,
      data: data,
      method: 'get',
      that
    })
  },
  getJson(url, that) {
    return axios.requestJson({
      url,
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
