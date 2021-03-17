/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-16 10:41:28
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
import '@router/permission.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@css/index.scss'
import '@/assets/iconfont/iconfont.css'

//全局组件引用注册
Vue.use(ElementUI)
// Vue.component('panel-title', PanelTitle) // 标题;

Vue.config.productionTip = false

// 全局公共方法引入
Vue.prototype.$storage = storage // 本地存储 Cookie SessionStorage localStorage

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
