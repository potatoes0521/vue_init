/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-01 17:15:15
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@router'
import store from './store'
import storage from '@utils/storage.js'
import ElementUI from 'element-ui'
import PanelTitle from '@components/PanelTitle'
import VueLazyload from 'vue-lazyload'
import '@/assets/theme/theme/index.css'
import '@router/permission.js'
import '@css/index.scss'
import '@/assets/iconfont/iconfont.css'

import { createUniqueCode } from '@utils/uniqueCode'
//全局组件引用注册
Vue.use(ElementUI)
Vue.use(VueLazyload)
Vue.component('PanelTitle', PanelTitle) // 标题;

const errorImage = require('./assets/img/icon/404.png')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImage,
  attempt: 1
})

createUniqueCode()

Vue.config.productionTip = false

// 全局公共方法引入
Vue.prototype.$storage = storage // 本地存储 Cookie SessionStorage localStorage

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
