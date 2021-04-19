/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-12 17:34:49
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 17:37:25
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
const IS_PROD = ['production', 'prod', 'pro', 'test'].includes(process.env.NODE_ENV)

const plugins = [
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining'
]

if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
