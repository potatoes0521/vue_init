/*
 * @Author: liuYang
 * @Description: 单点登录鉴权
 * @Path: 引入路径
 * @Date: 2021-03-10 13:59:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-10 17:15:17
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 */
import { getQueryObject } from '.'
import Storage from '@utils/storage'
import { exchangeTicket, heartBeat } from '@/api/modules/sso'
import router from '@router/'

let firstInit = true

/**
 * 处理进入页面的token检测
 * 如果是首次初始化  那就判断是否是过来做单点登录的
 * 如果不是首次初始化每次都去检查心跳
 * @return void
 */
export async function handleCASHeartBeat() {
  if (firstInit) {
    const result = await checkQueryParams()
    firstInit = false
    if (result) {
      return checkHeartBeat()
    } else {
      router.push('/login')
    }
  } else {
    return checkHeartBeat()
  }
}

/**
 * 调用检查是否需要处理子系统过来登录
 * @return void
 */
export async function checkQueryParams() {
  // 判断是不是初次
  const queryParams = getQueryObject()
  // 没有ticket就不是别的系统过来的 return  正常的业务流转
  console.log('调用检查是否需要处理子系统过来登录')
  if (!queryParams.subHost) return Promise.resolve(true)
  console.log('子系统过来登录')
  try {
    const checkOK = await checkCookieToken()
    if (!checkOK) return Promise.resolve(false)
    handleExchangeTicket(queryParams)
  } catch (err) {
    console.log('err', err)
  }
}

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
export function checkHeartBeat(token) {
  if (!token) {
    token = Storage.getCookie('acToken')
  }
  return heartBeat({ token })
    .then((res) => {
      return Promise.resolve(res)
    })
    .catch(() => {
      // CAS Token过期 去登录
      return Promise.resolve(false)
    })
}

/**
 * 检查是否有token 有token就继续  没token就登录
 * 有token 并且没有过期  拿到新的ticket并返回原系统
 * @return void
 */
export async function checkCookieToken() {
  const assessToken = Storage.getCookie('acToken')
  if (assessToken) {
    try {
      const checkOK = await checkHeartBeat(assessToken)
      if (checkOK) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    } catch (err) {
      router.push('/login')
    }
  } else {
    router.push('/login')
  }
}

/**
 * 处理换取票据
 * @param {Object} queryParams url query里的参数
 * @return void
 */
function handleExchangeTicket(queryParams) {
  exchangeTicket({
    subsystemHost: queryParams.subHost
  }).then((res) => {
    const { ticket } = res
    window.location.href = `${queryParams.subHost}?ticket=${ticket}`
  })
}
