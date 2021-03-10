/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-10 09:46:46
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@router'
import store from './store'
import storage from '@utils/storage.js'
import ElementUI from 'element-ui'
import '@router/permission.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@css/reset.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$storage = storage
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
