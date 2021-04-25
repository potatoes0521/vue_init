/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-14 16:48:02
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-21 09:51:38
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
export async function checkHeartBeat(token) {
  const queryParams = getQueryObject()
  if (queryParams.ticket) {
    window.history.replaceState({}, '', document.location.origin)
    return handleTicketLogin(queryParams.ticket)
  } else {
    if (!token) {
      const cookieToken = Storage.getCookie('acToken')
      if (!cookieToken) {
        goCASSystem()
      }
      token = cookieToken
    }
    const fp = await createUniqueCode()
    return heartBeat({
      accessToken: token,
      fp
    })
      .then((res) => {
        return Promise.resolve(res)
      })
      .catch(() => {
        // Token过期 去登录
        goCASSystem()
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
async function handleTicketLogin(ticket) {
  try {
    const { accessToken } = await ticketLogin({
      ticket,
      fp: await createUniqueCode()
    })
    Storage.setCookie('acToken', accessToken)
    return Promise.resolve(true)
  } catch (e) {
    goCASSystem()
  }
}

/**
 * 去CAS请求ticket
 * @return void
 */
export async function goCASSystem() {
  const host = window.location.host
  window.location.href = `${process.env.VUE_APP_CAS_HOST}/login?subHost=${encodeURIComponent(
    host
  )}&o=1`
}
