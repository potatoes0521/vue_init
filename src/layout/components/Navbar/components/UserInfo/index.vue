<!--
 * @Author: liuYang
 * @description: 用户信息组件
 * @Path:  引入路径
 * @Date: 2021-03-15 09:59:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-20 11:52:28
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
  el-popover( trigger="click" v-model="showList" )
    template( slot="reference" )
      .component-wrapper
        .wrapper
          .user-head( v-if="userInfo && userInfo.img" )
            img(src='https://www.imageoss.com/images/2021/03/10/64076f7a41ad3ff0046.png')
            //- .inline-status.inline
          .msg-wrapper
            .nickname( v-if="userInfo && userInfo.username" ) {{userInfo.username}}
            .user-number( v-if="userInfo && userInfo.workNo" ) {{userInfo.workNo}}
          .el-icon-arrow-down.icon
    .drop-down
      .drop-down-item( @click.stop="changePassword" ) 修改密码
      .drop-down-item( @click.stop="loginOut" ) 退出登录
    ChangePassword( ref="changePassword" )
</template>
<script>
  import { loginOut } from '@api/this'
  import { mapActions, mapGetters } from 'vuex'
  import ChangePassword from './components/ChangePassword'

  export default {
    name: 'UserInfo',
    data() {
      return {
        showList: false
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    components: {
      ChangePassword
    },
    methods: {
      ...mapActions({ commitLoginOut: 'commitLoginOut' }),
      loginOut() {
        this.showList = false
        loginOut().then(() => {
          this.commitLoginOut()
        })
      },
      changePassword() {
        this.$refs.changePassword.openDialog()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin-right: 30px;
    display: flex;
    align-items: center;
    color: #fff;
    height: 100%;
    box-sizing: border-box;

    .wrapper {
      padding: 13px 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      .user-head {
        width: 30px;
        height: 30px;
        position: relative;

        img {
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .inline-status {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          position: absolute;
          right: -6px;
          bottom: -3px;
        }
        .inline {
          background: linear-gradient(180deg, #42eca3 0%, #01ca75 100%);
        }
        // .out-line {
        // }
      }

      .msg-wrapper {
        margin: 0 20px;
        min-width: 50px;
        .nickname {
          line-height: 20px;
          font-weight: 600;
          font-size: 14px;
        }
        .user-number {
          line-height: 14px;
          font-size: 12px;
        }
      }

      .icon {
        width: 10px;
        font-size: 14px;
      }
    }
  }
  .drop-down {
    width: 100%;
    .drop-down-item {
      cursor: pointer;
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      &:hover {
        background: #f5f7fa;
      }
    }
  }
</style>
