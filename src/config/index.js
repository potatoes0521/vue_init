/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 15:58:50
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 18:14:50
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 */
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 30,
  /**
   * @description api请求基础路径
   */
  baseUrl: process.env.VUE_APP_SERVICE_HOST,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'login',
  companyName: 'xiaoshi_',
  projectName: 'qishi_wiki_'
}
