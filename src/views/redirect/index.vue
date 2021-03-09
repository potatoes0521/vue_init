<!--
 * @Author: liuYang
 * @description: 重定向页面
 * @path: @views/redirect
 * @Date: 2021-03-09 16:19:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 16:20:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<script>
  export default {
    created() {
      const { params, query } = this.$route
      const { path } = params
      this.$router.replace({ path: '/' + path, query })
    },
    render: function(h) {
      return h() // avoid warning message
    }
  }
</script>
