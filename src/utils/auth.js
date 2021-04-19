/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-14 16:48:02
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-12 12:19:39
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import router from '@/router'
import { heartBeat } from '@api/session'
import { getQueryObject } from '.'
import { exchangeTicket } from '@api/user'
import Storage from './storage'
import { createUniqueCode } from './uniqueCode'
/**
 * CAS心跳检测
 *  成功 => 继续业务
 *  失败 => 去登录
 * 通常两种触发
 *  1.正常登陆C系统
 *  2.url有ticket
 * @param {String} token CAS的assessToken
 * @return {Boolean}
 * 心跳token有效返回  true 无效返回 false
 */
export async function checkHeartBeat() {
  const cookieToken = Storage.getCookie('acToken')
  if (!cookieToken) {
    return Promise.resolve(false)
  }
  const queryParams = getQueryObject()
  const fp = await createUniqueCode()
  return heartBeat({
    accessToken: cookieToken,
    fp
  })
    .then(() => {
      if (!queryParams.subHost) return Promise.resolve(true)
      Storage.setSession('subHost', queryParams.subHost || '')
      handleExchangeTicket()
    })
    .catch(() => {
      Storage.setSession('subHost', queryParams.subHost)
      window.history.replaceState({}, '', document.location.origin)
      // CAS Token过期 去登录
      return Promise.resolve(false)
    })
}

/**
 * 处理换取票据
 * @param {Object} queryParams url query里的参数
 * @return void
 */
export function handleExchangeTicket(subHost) {
  subHost = subHost || Storage.getSession('subHost')
  if (!subHost) return Promise.resolve(false)
  exchangeTicket({
    subsystemHost: subHost
  })
    .then((res) => {
      const { ticket } = res
      Storage.removeSession('subHost')
      window.location.href = `http://${subHost}?ticket=${ticket}`
    })
    .catch((err) => {
      console.log('err', err)
      router.push('login')
    })
}
