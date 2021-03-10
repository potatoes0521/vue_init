import Storage from '@utils/storage.js'
import { StaticRouterMap } from '@/router/index.js'
// import { resetRouter } from "@/router/resetRouter";
export default {
  state: {
    userInfo: {
      token: '',
      mobile: '',
      openId: '',
      userId: '', // 常用请求全部放在请求头上
      unionId: '',
      userType: '' // 0 驿站人员  1 自主注册   2 驿站人员添加客户
    },
    menuList: []
  },
  mutations: {
    CHANGEUSERINFO(state, data = {}) {
      const newData = Object.assign({}, state.userInfo, data)
      Storage.setCookie('admin', newData)
      state.userInfo = newData
    },
    LOGINOUT(state) {
      Storage.clearAllStorage()
      let data = state
      for (let i in state) {
        if (Array.isArray(state[i])) {
          state[i] = []
        } else if (typeof state[i] === 'string') {
          state[i] = ''
        } else if (typeof state[i] === 'number') {
          state[i] = -1
        } else if (typeof state[i] === 'boolean') {
          state[i] = false
        } else {
          state[i] = {}
        }
      }
      state = data
      // resetRouter();
      location.reload() // 会造成页面刷新 白色的屏闪 体验不好
    },
    MENULIST(state, RouterList) {
      state.menuList = RouterList
    }
  },
  getters: {
    userInfo(state) {
      if (!state.userInfo.userId || !state.userInfo.token) {
        let userInfo = Storage.getCookie('admin') || {}
        if (userInfo.token && userInfo.userId) {
          let userInfo = Storage.getCookie('admin')
          state.userInfo = userInfo
        }
      }
      return state.userInfo
    },
    menuList(state) {
      return state.menuList
    }
  },
  actions: {
    commitChangeUserInfo({ commit }, data = {}) {
      commit('CHANGEUSERINFO', data)
    },
    commitLoginOut({ commit }, data = {}) {
      console.log('login out')
      commit('LOGINOUT', data)
    },
    commitMenuList({ commit }, routerList = []) {
      // 动态设置路由 此为设置设置途径
      commit('MENULIST', StaticRouterMap.concat(routerList)) // 进行路由拼接并存储
    }
  }
}
