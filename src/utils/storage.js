/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:18:28
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-12 19:39:43
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import Cookies from 'js-cookie'
import config from '@config'
import { typeOf } from '.'
const { cookieExpires, companyName, projectName } = config
const storageName = companyName + projectName

const valueIsTrue = (value) => {
  return typeOf(value) === 'undefined' || typeOf(value) === 'null' || isNaN(value)
}

export default {
  /**
   * 获取一个cookie
   * @param {String} name 参数描述
   * @return 获取到的cookie
   */
  getCookie(name) {
    const data = Cookies.get(storageName + name) || false
    if (!data || data === 'undefined' || data === 'null') return false
    else return JSON.parse(data)
  },
  /**
   * 设置一个cookie
   * @param {String} name cookie名字
   * @param {String || Object} value 值
   * @param {Number} time 存储时间
   * @return void
   */
  setCookie(name, value, time) {
    if (!valueIsTrue(value)) return
    Cookies.set(storageName + name, JSON.stringify(value), {
      expires: time || cookieExpires || 1
    })
  },
  /**
   * 设置一个sessionStorage
   * @param {String} key 名字
   * @param {Object || String} value 参数
   * @return void
   */
  setSession(key, value) {
    if (!valueIsTrue(value)) return
    window.sessionStorage.setItem(storageName + key, encodeURIComponent(JSON.stringify(value)))
  },
  /**
   * 读取一个sessionStorage
   * @param {String} key 名字
   * @return 值
   */
  getSession(key) {
    const data = window.sessionStorage.getItem(storageName + key) || false
    if (!data || data === 'undefined' || data === 'null') return false
    return JSON.parse(decodeURIComponent(data))
  },
  /**
   * 移除指定的sessionStorage
   * @param {String} key 名字
   * @return void
   */
  removeSession(key) {
    window.sessionStorage.removeItem(storageName + key)
  },
  /**
   * 检查指定的sessionStorage
   * @param {String} key 名字
   * @return void
   */
  checkSession(key) {
    const val = window.sessionStorage.getItem(storageName + key)
    if (val && val !== JSON.stringify({})) {
      return true
    }
    return false
  },
  /**
   * 设置指定的localStorage
   * @param {String} key 名字
   * @param {Object || String} value 参数
   * @return void
   */
  setLocal(key, value) {
    if (!valueIsTrue(value)) return
    window.localStorage.setItem(storageName + key, encodeURIComponent(JSON.stringify(value)))
  },
  /**
   * 获取指定的localStorage
   * @param {String} key 名字
   * @param {Object || String} value 参数
   * @return void
   */
  getLocal(key) {
    const data = window.localStorage.getItem(storageName + key) || false
    if (!data || data === 'undefined' || data === 'null') return false
    return JSON.parse(decodeURIComponent(data))
  },
  /**
   * 移除指定的localStorage
   * @param {String} key 名字
   * @param {Object || String} value 参数
   * @return void
   */
  removeLocal(key) {
    window.localStorage.removeItem(storageName + key)
  },
  /**
   * 检查指定的localStorage
   * @param {String} key 名字
   * @return void
   */
  checkLocal(key) {
    const val = window.localStorage.getItem(storageName + key)
    if (val && val !== JSON.stringify({})) {
      return true
    }
    return false
  },
  /**
   * 清除全部cookie sessionStorage localStorage
   * @param {Array} exceptArr 除了key为XXX的全部删除
   * @return void
   */
  clearAllStorage(exceptArr = []) {
    exceptArr = exceptArr.map((item) => storageName + item)
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    var keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      keys.forEach((item) => {
        if (!exceptArr.includes(item)) {
          Cookies.remove(item, {
            path: ''
          })
        }
      })
    }
    sessionStorage.clear()
    localStorage.clear()
    console.log('clear all cookie')
  }
}
