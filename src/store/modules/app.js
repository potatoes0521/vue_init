/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:25:10
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 17:35:47
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import Storage from '@utils/storage.js'

export default {
  state: {
    sidebar: {
      collapse: Boolean(+Storage.getSession('sidebarStatus')),
      withoutAnimation: false
    },
    dialogConfig: {
      top: '2vh',
      showClose: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      if (state.sidebar.collapse) {
        Storage.setSession('sidebarStatus', 0)
      } else {
        Storage.setSession('sidebarStatus', 1)
      }
      state.sidebar.collapse = !state.sidebar.collapse
      state.sidebar.withoutAnimation = false
    }
  },
  getters: {
    sidebar: (state) => state.sidebar
  },
  actions: {
    toggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
