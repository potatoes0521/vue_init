/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 17:25:10
 * @LastEditors: liuYang
 * @LastEditTime: 2021-05-07 11:52:39
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 */
import Storage from '@utils/storage.js'
import { StaticRouterMap, getDefaultRouter } from '@router/modules/static'
import { getUserInfo, getUserPermList } from '@api/this'
import store from '..'
import { resetRouter } from '@/router'
import storage from '@utils/storage.js'
import { goCASSystem } from '@/utils/cas'

export default {
  state: {
    userInfo: null,
    menuList: [],
    userPermList: [],
    defaultRouter: '',
    isLogin: false
  },
  mutations: {
    CHANGE_USER_INFO(state, data) {
      state.userInfo = {
        ...state.userInfo,
        ...data
      }
      state.isLogin = Boolean(data && Object.keys(data).length)
      store.dispatch('commitGetUserPermList')
    },
    LOGIN_OUT(state) {
      let data = {
        ...state
      }
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
      state = {
        ...data
      }
      state.menuList = null
      resetRouter()
      Storage.clearAllStorage(['rmT'], ['returnURI'])
      goCASSystem()
    },
    MENU_LIST(state, RouterList) {
      const defaultRouter = getDefaultRouter(RouterList)
      state.menuList = [...RouterList]
      state.defaultRouter = defaultRouter
    },
    USER_PERM_LIST(state, permList) {
      state.userPermList = permList || null
      storage.setSession('upl', permList || [])
    }
  },
  getters: {
    userInfo(state) {
      const cookieToken = Storage.getCookie('acToken')
      if (state.userInfo === null && state.menuList.length && cookieToken) {
        store.dispatch('commitChangeUserInfo')
      }
      return state.userInfo
    },
    menuList(state) {
      return state.menuList
    },
    userPermList(state) {
      if (Array.isArray(state.userPermList) && !state.userPermList.length && state.isLogin) {
        store.dispatch('commitGetUserPermList')
      }
      return state.userPermList
    },
    defaultRouter(state) {
      return state.defaultRouter
    }
  },
  actions: {
    commitChangeUserInfo({ commit }) {
      getUserInfo()
        .then((res) => {
          commit(
            'CHANGE_USER_INFO',
            res
              ? {
                  ...res
                }
              : null
          )
        })
        .catch(() => {
          commit('CHANGE_USER_INFO', null)
        })
    },
    commitLoginOut({ commit }) {
      commit('LOGIN_OUT')
    },
    commitMenuList({ commit }, routerList = []) {
      // 动态设置路由 此为设置设置途径
      commit('MENU_LIST', [...StaticRouterMap, ...routerList]) // 进行路由拼接并存储
    },
    commitGetUserPermList({ commit }) {
      getUserPermList()
        .then(({ permList }) => {
          permList = permList.length ? permList : null
          commit('USER_PERM_LIST', permList)
        })
        .catch(() => {
          commit('USER_PERM_LIST', null)
        })
    },
    commitChangeUserPermList({ commit }, data = null) {
      commit('USER_PERM_LIST', data)
    }
  }
}
