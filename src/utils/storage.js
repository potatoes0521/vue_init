/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 17:18:28
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-10 17:19:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Cookies from 'js-cookie'
import config from '@config'
const { cookieExpires, companyName, projectName } = config
const storageName = companyName + projectName

export default {
  /**
   * 获取一个cookie
   * @param {String} name 参数描述
   * @return 获取到的cookie
   */
  getCookie(name) {
    const data = Cookies.get(name)
    if (data) return JSON.parse(data)
    else return false
  },
  /**
   * 设置一个cookie
   * @param {String} name cookie名字
   * @param {String || Object} value 值
   * @param {Number} time 存储时间
   * @return void
   */
  setCookie(name, value, time) {
    Cookies.set(name, JSON.stringify(value), {
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
    window.sessionStorage.setItem(storageName + key, encodeURIComponent(JSON.stringify(value)))
  },
  /**
   * 读取一个sessionStorage
   * @param {String} key 名字
   * @return 值
   */
  getSession(key) {
    return JSON.parse(decodeURIComponent(window.sessionStorage.getItem(storageName + key)))
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
    window.localStorage.setItem(storageName + key, encodeURIComponent(JSON.stringify(value)))
  },
  /**
   * 获取指定的localStorage
   * @param {String} key 名字
   * @param {Object || String} value 参数
   * @return void
   */
  getLocal(key) {
    return JSON.parse(decodeURIComponent(window.localStorage.getItem(storageName + key)))
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
   * @return void
   */
  clearAllStorage() {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    var keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      keys.forEach((item) => {
        Cookies.remove(item, {
          path: ''
        })
      })
    }
    sessionStorage.clear()
    localStorage.clear()
    console.log('clear all cookie')
  }
}
