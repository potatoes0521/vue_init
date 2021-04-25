/*
 * @Author: liuYang
 * @Description: 生成一个唯一标识
 * @Path: 引入路径
 * @Date: 2021-03-26 17:41:39
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-20 19:32:24
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import storage from './storage'

export const createUniqueCode = async () => {
  const visitorIdInLocal = storage.getLocal('visitorId')
  if (visitorIdInLocal) {
    return visitorIdInLocal
  } else {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      const visitorId = result.visitorId
      storage.setLocal('visitorId', visitorId)
      return visitorId
    } catch (error) {
      console.log(
        '%c [ createUniqueCode catch ]',
        'font-size:13px; background:#F6504D; color:#fff;',
        error
      )
    }
  }
}
