<!--
 * @Author: liuYang
 * @Description: 单点登录说明文档
 * @Path: 引入路径
 * @Date: 2021-08-16 10:15:27
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-16 10:54:15
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
## 单点登录 CAS端

### 主要逻辑文件路径

``` /qishi-cas/src/utils/cas.js ```

### 单点登录流程

详情看 ``` /qishi-cas/src/utils/单点登录RESTful流程.vsdx ``` 

### 代码涉及文件

```
/qishi-cas/src/utils/cas.js   // cas主要逻辑处理

/qishi-cas/src/route/permission.js // 心跳处理和页面鉴权

/qishi-cas/src/view/Login // 登录页 

/qishi-cas/src/store/modules/user.js // 用户数据存储
```
### 单点登录处理逻辑依次调用顺序和相关方法

#### 进入系统 

##### 触发 /qishi-cas/src/route/permission.js

```
  1. router.beforeEach

  2. 判断to.path === '/login'  // 这里判断是防止无限进入login的问题 问题原因:进入login 判断token过期 继续进入login
      true => 跳转 login 判断是否有token  Login页面内处理登录逻辑
      false => 调用 checkHeartBeat 检测心跳

  3. checkHeartBeat 返回值 
      true => 进入路由
      false => 进入cas逻辑处理
```

##### /qishi-cas/src/utils/cas.js

```
  1. checkHeartBeat 判断是否有token
      有 => 心跳检测
      无 => 判断是否有 rmt(全称 remember me ticket 代表是否勾选记住密码)
        有 => 使用rmt登录
        无 => 展示登录界面
         
  2. 心跳检测 //  => return 是否有效 {Boolean}
      true => 判断url是否有returnUrl 
        有 通过 handleExchangeTicket 换票据
        无 登录本系统

  3. handleExchangeTicket // 用子系统信息去换取一个ticket 然后通过window.location跳转回原系统
```

##### /qishi-cas/src/store/modules/user.js

```
actions => commitLoginOut
  处理退出登录
  触发情况
    1. 退出登录
    2. 修改密码成功
    3. /qishi-cas/src/api/request.js 部分错误码情况
```

##### 相关依赖方法

```
createUniqueCode // 生成浏览器指纹
  /qishi-cas/src/utils/uniqueCode.js
  
storage // 本地存储
  /qishi-cas/src/utils/storage.js

aesDecrypt, aesEncrypt // AES加密
  /qishi-cas/src/utils/auth.js
```