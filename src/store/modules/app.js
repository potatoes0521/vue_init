/*
 * @Author: liuYang
 * @description: 系统vuex
 * @Date: 2019-08-21 11:41:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 17:25:13
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
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
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
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}
