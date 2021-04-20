/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-15 13:50:21
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-16 14:02:29
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import storage from './storage'
/**
 * 判断用户是否拥有XX权限
 * @param {Array} referenceData 参考权限 || 用户拥有的权限
 * @param {String} permName 权限
 * @return {Boolean} 是否有权限
 */
export const judgeUserHasPerm = ({ referenceData, permName } = {}) => {
  if (!permName) return false
  // 这里使用缓存而不是vux是因为如果是用的vuex 会认为是在依赖data里的数据  会造成死循环
  const userHasPermList = referenceData || storage.getSession('upl') || []
  console.log(`%c console.log  -------- permName`, 'color:red', permName)
  if (!userHasPermList || !userHasPermList.length) return false
  const result = userHasPermList.includes(permName)
  console.log(`%c console.log  -------- result`, 'color:green', result)
  return result
}
