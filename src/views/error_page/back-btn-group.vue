<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 17:38:41
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 18:06:29
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
-->
<template>
  <div>
    <el-button size="large" type="text" @click="backHome">返回首页</el-button>
    <el-button size="large" type="text" @click="backPrev"> 返回上一页({{ second }}s) </el-button>
  </div>
</template>

<script>
  import './error.scss'
  import { mapGetters } from 'vuex'

  export default {
    name: 'backBtnGroup',
    data() {
      return {
        second: 5,
        timer: null
      }
    },
    computed: {
      ...mapGetters(['defaultRouter'])
    },
    methods: {
      backHome() {
        this.$router.replace(this.defaultRouter)
      },
      backPrev() {
        this.$router.go(-1)
      }
    },
    mounted() {
      // this.timer = setInterval(() => {
      //   if (this.second === 0) this.backPrev()
      //   else this.second--
      // }, 1000)
      this.$once('hook:beforeDestroy', () => clearInterval(this.timer))
    }
  }
</script>
