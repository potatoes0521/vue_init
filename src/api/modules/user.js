/*
 * @Author: liuYang
 * @description: 用户接口
 * http://192.168.200.212:10001/doc.html#/qishi/01%E7%BB%9F%E4%B8%80%E8%AE%A4%E8%AF%81%E6%9C%8D%E5%8A%A1.07%E7%94%A8%E6%88%B7./conditionSearchUserUsingPOST
 * @Path: import {xx} from '@api/users'
 * @Date: 2021-03-11 15:59:14
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-20 13:40:51
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
import axios from '../axios'

// 接口/权限映射 -------------------------------------------------------------------
export const userPermList = {
  changePassword: '/cas/user/change-password'
}

// 暴露mixins  --------------------------------------------------------------------
export const userPermMixin = {
  computed: {}
}

// 接口  --------------------------------------------------------------------------

/**
 * 修改密码
 * @param {Object} data 参数描述
 * @return void
 */
export const changePassword = (data) => {
  return axios.post(userPermList['changePassword'], data)
}
