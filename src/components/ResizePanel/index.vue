<!--
 * @Author: liuYang
 * @Description: 缩放面板
 * @Path:   import ResizePanel from '@components/ResizePanel'
 * @Date: 2021-04-07 17:31:57
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-07 18:25:21
 * @MustParam: 必传参数
    leftMinWidth 左边面板最小宽度
      type Number
    rightMinWidth 右边面板最小宽度
      type Number

 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
      left-panel
        template( slot="left-panel" )
          // do
      right-panel
        template( slot="right-panel" )
          // do
 * @Examples: 使用示例

    ResizePanel( :leftMinWidth="xxx" :rightMinWidth="xxx" )
      template( slot="left-panel" )
        // do
      template( slot="right-panel" )
        // do
-->
<template lang="pug">
  .resize-panel-component-wrapper
    .left-panel( :style="{width: leftMinWidth + 'px'}" )
      slot( name='left-panel' )
    .resize( ref="resize" title="收缩侧边栏" )
    .right-panel
      slot( name='right-panel' )
</template>
<script>
  export default {
    name: 'ResizePanel',
    props: {
      leftMinWidth: {
        type: Number,
        required: true,
        default: 240
      },
      rightMinWidth: {
        type: Number,
        required: true,
        default: 400
      }
    },
    methods: {
      dragControllerDiv() {
        const that = this
        const resize = document.getElementsByClassName('resize')
        const left = document.getElementsByClassName('left-panel')
        const mid = document.getElementsByClassName('right-panel')
        const box = document.getElementsByClassName('page-wrapper')
        for (let i = 0; i < resize.length; i++) {
          // 鼠标按下事件
          resize[i].onmousedown = function(e) {
            let startX = e.clientX
            resize[i].left = resize[i].offsetLeft
            // 鼠标拖动事件
            document.onmousemove = function(e) {
              const endX = e.clientX
              // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
              let moveLen = resize[i].left + (endX - startX)
              // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
              let maxT = box[i].clientWidth - resize[i].offsetWidth

              if (moveLen < that.leftMinWidth) moveLen = that.leftMinWidth // 左边区域的最小宽度为32px
              if (moveLen > maxT - that.rightMinWidth) moveLen = maxT - that.rightMinWidth //右边区域最小宽度为150px

              resize[i].style.left = moveLen // 设置左侧区域的宽度

              for (let j = 0; j < left.length; j++) {
                left[j].style.width = moveLen + 'px'
                mid[j].style.width = box[i].clientWidth - moveLen + 10 + 'px'
              }
            }
            // 鼠标松开事件
            document.onmouseup = function() {
              //颜色恢复
              document.onmousemove = null
              document.onmouseup = null
              //当不需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
              resize[i].releaseCapture && resize[i].releaseCapture()
            }
            //该函数在属于当前线程的指定窗口里设置鼠标捕获
            resize[i].setCapture && resize[i].setCapture()
            return false
          }
        }
      }
    },
    mounted() {
      this.dragControllerDiv()
    }
  }
</script>
<style scoped lang="scss">
  .resize-panel-component-wrapper {
    display: flex;
    height: 100%;
    flex-direction: row;
    .left-panel {
      height: 100%;
    }
    .resize {
      cursor: col-resize;
      border-radius: 5px;
      width: 10px;
      height: 100;
      position: relative;
    }
    .resize::after {
      content: '';
      width: 1px;
      height: 100%;
      background-color: #e6e6e6;
      position: absolute;
      right: 0;
      margin: auto;
    }
    .right-panel {
      flex: 1;
      height: 100%;
    }
  }
</style>
