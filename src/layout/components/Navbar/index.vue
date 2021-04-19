<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-10 17:59:55
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-09 19:33:44
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
  .navbar
    Logo
    //- ServiceMode
    //- Control
    //- NotificationCenter
    UserInfo
</template>

<script>
  import Logo from './components/Logo'
  import UserInfo from './components/UserInfo'
  import NotificationCenter from './components/NotificationCenter'
  import Control from './components/Control'
  import ServiceMode from './components/ServiceMode'

  export default {
    components: {
      Logo,
      UserInfo,
      NotificationCenter,
      Control,
      ServiceMode
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';

  .navbar {
    width: 100%;
    height: $navbarHeight;
    overflow: hidden;
    background: linear-gradient(100deg, $themeGreen 0%, $themeLinearBlue 100%);
    display: flex;
    justify-content: flex-end;
    min-width: 1440px;
    box-sizing: border-box;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
  }
</style>
