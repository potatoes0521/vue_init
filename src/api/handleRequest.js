/*
 * @Author: liuYang
 * @description: axios封装
 * @Path:  引入路径
 * @Date: 2021-03-09 15:54:38
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-01 17:13:42
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import axios from 'axios'
// import createSignData from "./secret.js";
import { Message } from 'element-ui'
import storage from '@/utils/storage'
import router from '@/router'

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
    if (options.url.endsWith('import')) {
      contentType = 'multipart/form-data;'
    }
    let config = {
      baseURL: this.baseUrl,
      headers: {
        'content-type': contentType,
        accessToken: storage.getCookie('acToken')
      },
      method: options.method
      // data: options.data
    }
    if (options.method === 'get') {
      config = Object.assign({}, config, {
        params: options.data
      })
    }
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
        if (!message) return Promise.reject(data)
        if (message.code === '0000' || message.bussinessDone || message.code === '4000') {
          return data.data || {}
        } else if (message.code === '9001' || message.code === '9002') {
          storage.clearAllStorage(['rmT'])
          router.push('/login')
          Message.error(message.msg || '令牌失效')
          return Promise.reject(message)
        } else {
          Message.error(message.msg || '接口错误')
          return Promise.reject(message)
        }
      },
      (error) => {
        this.destroy(url)
        if (error.response.status === 401) {
          storage.clearAllStorage(['rmT'])
          router.push('/login')
        }
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
