/*
 * @Author: liuYang
 * @description: 用户接口
 * http://192.168.200.212:10001/doc.html#/qishi/01%E7%BB%9F%E4%B8%80%E8%AE%A4%E8%AF%81%E6%9C%8D%E5%8A%A1.07%E7%94%A8%E6%88%B7./conditionSearchUserUsingPOST
 * @Path: import {xx} from '@api/users'
 * @Date: 2021-03-11 15:59:14
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-16 15:54:58
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import axios from '../axios'
import { judgeUserHasPerm } from '@utils/permission'

// 接口/权限映射 -------------------------------------------------------------------
export const userPermList = {
  exchangeTicket: '/cas/user/exchange-ticket',
  searchUser: '/cas/user/condition-search-user',
  addUser: '/cas/user/register-user',
  editUser: '/cas/user/update-user-base-info',
  userDetail: '/cas/user/user-detail',
  changeUserStatus: '/cas/user/set-user-status',
  allotRole: '/cas/user/set-role-for-user',
  allotSkill: '/cas/user/set-skill-for-user',
  allotPermG: '/cas/user/set-permg-for-user',
  allotPerm: '/cas/user/set-perm-for-user',
  getUserSettingPerm: '/cas/user/user-setted',
  changePassword: '/cas/user/change-password'
}

// 暴露mixins  --------------------------------------------------------------------
export const userPermMixin = {
  computed: {
    mixinsShowSearchUser() {
      return judgeUserHasPerm({
        permName: userPermList['searchUser']
      })
    },
    mixinsShowAddUserBtn() {
      return judgeUserHasPerm({
        permName: userPermList['addUser']
      })
    },
    mixinsShowEditUserBtn() {
      return judgeUserHasPerm({
        permName: userPermList['editUser']
      })
    },
    mixinsShowUserDetailBtn() {
      return judgeUserHasPerm({
        permName: userPermList['userDetail']
      })
    },
    mixinsShowChangeUserStatus() {
      return judgeUserHasPerm({
        permName: userPermList['changeUserStatus']
      })
    },
    mixinsShowAllotRole() {
      return judgeUserHasPerm({
        permName: userPermList['allotRole']
      })
    },
    mixinsShowAllotSkill() {
      return judgeUserHasPerm({
        permName: userPermList['allotSkill']
      })
    },
    mixinsShowAllotPermG() {
      return judgeUserHasPerm({
        permName: userPermList['allotPermG']
      })
    },
    mixinsShowAllotPerm() {
      return judgeUserHasPerm({
        permName: userPermList['allotPerm']
      })
    },
    mixinsShowGetUserSettingPerm() {
      return judgeUserHasPerm({
        permName: userPermList['getUserSettingPerm']
      })
    }
  }
}

// 接口  --------------------------------------------------------------------------
/**
 * 换取登陆用的票据  主要给子系统过来的用
 * @param {String} data 参数描述
 * @return void
 */
export const exchangeTicket = (data) => {
  return axios.post(userPermList['exchangeTicket'], data)
}

/**
 * 搜索人员
 * @param {Object} data 参数描述
 * @return void
 */
export const searchUser = (data) => {
  return axios.post(userPermList['searchUser'], data)
}

/**
 * 注册人员
 * @param {Object} data 参数描述
 * @return void
 */
export const addUser = (data) => {
  return axios.post(userPermList['addUser'], data)
}

/**
 * 编辑人员
 * @param {Object} data 参数描述
 * @return void
 */
export const editUser = (data) => {
  return axios.post(userPermList['editUser'], data)
}

/**
 * 获取人员详情
 * @param {Object} data 参数描述
 * @return void
 */
export const userDetail = (data) => {
  return axios.post(userPermList['userDetail'], data)
}

/**
 * 获取人员详情
 * @param {Object} data 参数描述
 * @return void
 */
export const changeUserStatus = (data) => {
  return axios.post(userPermList['changeUserStatus'], data)
}

/**
 * 分配角色
 * @param {Object} data 参数描述
 * @return void
 */
export const allotRole = (data) => {
  return axios.post(userPermList['allotRole'], data)
}

/**
 * 分配技能
 * @param {Object} data 参数描述
 * @return void
 */
export const allotSkill = (data) => {
  return axios.post(userPermList['allotSkill'], data)
}

/**
 * 分配权限组
 * @param {Object} data 参数描述
 * @return void
 */
export const allotPermG = (data) => {
  return axios.post(userPermList['allotPermG'], data)
}

/**
 * 分配权限
 * @param {Object} data 参数描述
 * @return void
 */
export const allotPerm = (data) => {
  return axios.post(userPermList['allotPerm'], data)
}

/**
 * 获取用户的权限
 * @param {Object} data 参数描述
 * @return void
 */
export const getUserSettingPerm = (data) => {
  return axios.post(userPermList['getUserSettingPerm'], data)
}

/**
 * 修改密码
 * @param {Object} data 参数描述
 * @return void
 */
export const changePassword = (data) => {
  return axios.post(userPermList['changePassword'], data)
}
