<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 18:47:52
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-20 17:43:45
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template lang="pug">
.app-wrapper(:class='{ hideSidebar: isCollapse }')
  .fixed-header( v-if="!iframeOpen" )
    Navbar( :collapse='isCollapse' @onToggleSideBar='toggleSideBar' )
  .main-container( :style="mainContainerStyle" )
    Sidebar.sidebar-container(
      :variables='variables'
      :menuList='menuList'
      :collapse='isCollapse'
      v-if="!iframeOpen"
    )
    Panel( :iframeOpen='iframeOpen' )
</template>

<script>
  import Navbar from './components/Navbar'
  import Panel from './components/Panel'
  import Sidebar from './components/Sidebar'
  import { mapGetters, mapActions } from 'vuex'
  import variables from '@css/variables.scss'
  import { isOtherSystemIframeOpen } from '@utils/cas'
  import { heartBeat } from '@api/this'
  import { createUniqueCode } from '@utils/uniqueCode'

  export default {
    name: 'Layout',
    components: {
      Panel,
      Navbar,
      Sidebar
    },
    data() {
      this.timer = null
      return {
        iframeOpen: false
      }
    },
    computed: {
      ...mapGetters(['sidebar', 'menuList']),
      variables() {
        return variables
      },
      isCollapse() {
        return this.sidebar.collapse
      },
      mainContainerStyle() {
        return { height: this.iframeOpen ? '100%' : 'calc(100% - 60px)' }
      }
    },
    methods: {
      ...mapActions({
        toggleSideBar: 'toggleSideBar'
      }),
      interval(func, wait) {
        let interv = function() {
          func.call(null)
          this.timer = setTimeout(interv, wait)
        }
        this.timer = setTimeout(interv, wait)
      }
    },
    mounted() {
      if (isOtherSystemIframeOpen()) {
        this.iframeOpen = true
      }

      this.interval(() => {
        const token = this.$storage.getCookie('acToken')
        if (!token) {
          return
        }
        const fp = createUniqueCode()
        return heartBeat({
          accessToken: token,
          fp
        })
      }, 60000)
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixin.scss';
  .app-wrapper {
    @include clearfix;

    position: relative;
    height: 100%;
    width: 100%;

    .main-container {
      width: 100%;
      display: flex;
    }
  }

  .fixed-header {
    position: relative;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
</style>
