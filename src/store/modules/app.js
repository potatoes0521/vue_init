/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 17:25:10
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-11 18:26:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Storage from '@utils/storage.js'

export default {
  state: {
    sidebar: {
      opened: !+Storage.getCookie('sidebarStatus'),
      withoutAnimation: false
    },
    dialogConfig: {
      top: '2vh',
      showClose: true
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      if (state.sidebar.opened) {
        Storage.getCookie('sidebarStatus', 1)
      } else {
        Storage.getCookie('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Storage.getCookie('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    }
  },
  getters: {
    sidebar: (state) => state.sidebar
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  }
}
