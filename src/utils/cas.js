/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-14 16:48:02
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-17 17:03:19
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import { heartBeat, ticketLogin } from '@api/this'
import { getQueryObject } from '.'
import Storage from './storage'
import { createUniqueCode } from './uniqueCode'
/**
 * 心跳检测
 * 通常两种触发
 *  1.正常登陆C系统
 *    成功 => 继续业务
 *    失败 => 去登录
 *  2.url有ticket
 *    ticket换token
 * @param {String} token CAS的assessToken
 * @return {Boolean}
 *  心跳token有效返回  true 无效返回 false
 */
export function checkHeartBeat(token, toPath) {
  const queryParams = getQueryObject()
  if (queryParams.ticket) {
    // window.history.replaceState({}, '', document.location.origin)
    return handleTicketLogin(queryParams.ticket, toPath)
  } else {
    if (!token) {
      const cookieToken = Storage.getCookie('acToken')
      if (!cookieToken) {
        goCASSystem(toPath)
      }
      token = cookieToken
    }
    const fp = createUniqueCode()
    return heartBeat({
      accessToken: token,
      fp
    })
      .then((res) => {
        return Promise.resolve(res)
      })
      .catch(() => {
        // Token过期 去登录
        goCASSystem(toPath)
      })
  }
}

/**
 * 如果没有token / token过期  先判断ticket
 * 有ticket
 *   取token
 *   或者去CAS
 * 无ticket
 *   去CAS
 * @return void
 */
async function handleTicketLogin(ticket, toPath) {
  try {
    const { accessToken } = await ticketLogin({
      ticket,
      fp: createUniqueCode()
    })
    Storage.setCookie('acToken', accessToken)
    return Promise.resolve(true)
  } catch (e) {
    goCASSystem(toPath)
  }
}

/**
 * 去CAS请求ticket
 * @return void
 */
export async function goCASSystem(toPath = '') {
  console.log('%c [ toPath ]', 'font-size:13px; background:pink; color:#bf2c9f;', toPath)
  const host = window.location.origin
  toPath?.length > 1 &&
    toPath.indexOf('login') === -1 &&
    Storage.setSession('returnURI', toPath, false)
  window.location.href = `${process.env.VUE_APP_CAS_HOST}/login?returnUrl=${encodeURIComponent(
    host
  )}&o=1`
}

/**
 * 判断是否是其他系统打开iframe
 * @return {Boolean} 是否是其他系统打开
 */
export function isOtherSystemIframeOpen() {
  if (self.frameElement && self.frameElement.tagName === 'IFRAME') {
    console.log(
      '%c [ 是iframe打开系统 wiki ]: ',
      'color: green; background: black; font-size: 20px;'
    )
    return true
  } else if (window.frames.length !== parent.frames.length) {
    console.log(
      '%c [ 是iframe打开系统 wiki ]: ',
      'color: green; background: black; font-size: 20px;'
    )
    return true
  } else if (self !== top) {
    console.log(
      '%c [ 是iframe打开系统 wiki ]: ',
      'color: green; background: black; font-size: 20px;'
    )
    return true
  } else {
    console.log(
      '%c [ 不是iframe打开系统 wiki ]: ',
      'color: red; background: black; font-size: 20px;'
    )
    return false
  }
}
