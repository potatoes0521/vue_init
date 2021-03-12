<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 18:47:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-12 18:00:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
-->
<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    render(h, context) {
      const { icon, title } = context.props
      const vnodes = []
      if (icon) {
        if (icon.includes('el-icon')) {
          vnodes.push(<i class={[icon, 'sub-el-icon']} />)
        } else {
          // vnodes.push(<svg-icon icon-class={icon} />)
        }
      }

      if (title) {
        vnodes.push(
          <span class="title" slot="title">
            {title}
          </span>
        )
      }
      return vnodes
    }
  }
</script>

<style scoped>
  .sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
  }
  .title {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
</style>
