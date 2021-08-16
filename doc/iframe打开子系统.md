<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-08-16 16:36:40
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-16 17:29:48
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
## iframe打开子系统


 主要依靠systemHost字段

```
  `${目标系统}?systemHost=${encodeURIComponent(window.location.origin)`
```

目标系统判断url里有systemHost参数 认定为iframe打开
``` js
  // /qishi-xxx/src/layout/index.vue // 判断的目录

  // 判断是否是iframe打开 
  if (isOtherSystemIframeOpen()) {
    this.iframeOpen = true  // iframe打开 不展示nav和menu
    window.addEventListener(
      'message',
      (e) => {
        if (e && e.data === 'clearSystemHost') {
          // 当监听到父级发出clearSystemHost
          清除这个sessionStorage
          this.$storage.removeSession('systemHost')
        }
      },
      false
    )
  } else if (this.$route.fullPath.indexOf('iframePage') !== -1) { // 不是iframe打开
    window.addEventListener(
      'message',
      (e) => {
        if (e && e.data === 'commitLoginOut') {
          // this.commitLoginOut()
        }
      },
      false
    )
  }
```