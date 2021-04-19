/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-13 12:01:25
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-13 13:48:15
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
export const messageContentRender = ({ icon, title = '提示', message = '' }) => {
  return `
    <div class="message-box-wrapper">
      <div class="message-title">
        <span class="${icon} message-icon-style"></span>
        <span>${title}</span>
      </div>
      <div class="message-content">
        ${message}
      </div>
    </div>
  `
}
