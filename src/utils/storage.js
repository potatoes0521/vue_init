/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:18:28
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-21 13:38:42
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import Cookies from 'js-cookie'
import config from '@config'
import { isUndefined, isNull } from '.'
import { aesDecrypt, aesEncrypt } from './auth'
const { cookieExpires, companyName, projectName } = config
const storageName = companyName + projectName
/**
 * 判断要检测是数据是否是false
 * @param {String} value 要检测的字符串
 * @return {Boolean} true   是false
 */
const valueIsFalse = (value) => {
  return isUndefined(value) || isNull(value)
}

export default {
  /**
   * 获取一个cookie
   * @param {String} name cookie名字
   * @param {Boolean} aes 是不是要解密 如果存的时候没加密取出来是个空字符串
   * @return 获取到的cookie
   */
  getCookie(name, aes = true) {
    const data = Cookies.get(storageName + name) || false
    if (valueIsFalse(data)) {
      return false
    } else {
      try {
        return JSON.parse(aes ? aesDecrypt(data) : data)
      } catch (err) {
        return aes ? aesDecrypt(data) : data
      }
    }
  },
  /**
   * 设置一个cookie
   * @param {String} name cookie名字
   * @param {String || Object} value 值
   * @param {Number} time 存储时间
   * @param {Boolean} aes 是不是要加密
   * @return void
   */
  setCookie(name, value, time, aes = true) {
    if (valueIsFalse(value)) return
    value = JSON.stringify(value)
    aes && (value = aesEncrypt(value))
    Cookies.set(storageName + name, value, {
      expires: time || cookieExpires || 1
    })
  },
  /**
   * 设置一个sessionStorage
   * @param {String} key 名字
   * @param {Object || String} value 参数
   * @param {Boolean} aes 是不是要加密
   * @return void
   */
  setSession(key, value, aes = true) {
    if (valueIsFalse(value)) return
    value = JSON.stringify(value)
    aes && (value = aesEncrypt(value))
    window.sessionStorage.setItem(storageName + key, value)
  },
  /**
   * 读取一个sessionStorage
   * @param {String} key 名字
   * @param {Boolean} aes 是不是要解密 如果存的时候没加密取出来是个空字符串
   * @return 值
   */
  getSession(key, aes = true) {
    const data = window.sessionStorage.getItem(storageName + key) || false
    if (valueIsFalse(data)) {
      return false
    } else {
      try {
        return JSON.parse(aes ? aesDecrypt(data) : data)
      } catch (err) {
        return aes ? aesDecrypt(data) : data
      }
    }
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
   * @param {Boolean} aes 是不是要加密
   * @return void
   */
  setLocal(key, value, aes = true) {
    if (valueIsFalse(value)) return
    value = JSON.stringify(value)
    aes && (value = aesEncrypt(value))
    window.localStorage.setItem(storageName + key, value)
  },
  /**
   * 获取指定的localStorage
   * @param {String} key 名字
   * @param {Boolean} aes 是不是要解密 如果存的时候没加密取出来是个空字符串
   * @return void
   */
  getLocal(key, aes = true) {
    const data = window.localStorage.getItem(storageName + key) || false
    if (valueIsFalse(data)) {
      return false
    } else {
      try {
        return JSON.parse(aes ? aesDecrypt(data) : data)
      } catch (err) {
        return aes ? aesDecrypt(data) : data
      }
    }
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
    console.log(
      '%c [ clear all cookie ]: ',
      'color: #fff; background: #bf2c9f; font-size: 13px;',
      'clear all cookie'
    )
  }
}
