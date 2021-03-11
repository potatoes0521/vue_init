/*
 * @Author: liuYang
 * @description: axios封装
 * @path: 引入路径
 * @Date: 2021-03-09 15:54:38
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-11 12:55:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import axios from 'axios'
// import createSignData from "./secret.js";
import store from '@store'
import { Message } from 'element-ui'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig(options) {
    for (let i in options.data) {
      if (options.data[i] === '') {
        delete options.data[i]
      }
    }
    // const { userInfo } = store.getters || {}
    let contentType = 'application/json;'
    let url = this.baseUrl
    let config = {
      baseURL: url,
      headers: {
        'content-type': contentType
      },
      method: options.method,
      data: ''
    }
    if (options.method === 'get') {
      config = Object.assign({}, config, {
        params: options.data
      })
    }
    console.log('config', config)
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        this.destroy(url)
        const { data } = res
        const { message } = data
        if (message.code === '0000' || message.bussinessDone) {
          return data.data
        } else if (message.code === '9001' || message.code === '9002') {
          store.dispatch('commitLoginOut')
          Message.error(message.msg || '接口错误')
          return Promise.reject(message)
        } else {
          Message.error(message.msg || '接口错误')
          return Promise.reject(message)
        }
      },
      (error) => {
        this.destroy(url)
        let errorInfo = error.response
        if (!errorInfo) {
          console.log(error)
          // const {
          //   request: { statusText, status },
          //   config
          // } = JSON.parse(JSON.stringify(error));
          // errorInfo = {
          //   statusText,
          //   status,
          //   request: {
          //     responseURL: config.url
          //   }
          // };
        }
        // addErrorLog(errorInfo);
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(options), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
