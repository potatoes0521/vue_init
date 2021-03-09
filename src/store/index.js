/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 17:24:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import user from './modules/user.js'
import app from './modules/app.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app
  }
})
export default store
