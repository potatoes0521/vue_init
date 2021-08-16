<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 15:29:22
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-16 13:39:55
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
-->
# qishi_xxxx

Vue+Element-ui搭建的后台项目架子

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Vue 项目目录规范

    ├── dist                        // [生成] 打包目录
    ├── src                         // [必选] 开发目录
    │    ├── views                  // [必选] 页面组件，不允许有其他类型组件混入
    │    ├── components             // [必选] 业务组件必须写在这里
    │    ├── libs                   // [可选] 公共库（一般用于对一些库的封装）
    │    ├── utils                  // [可选] 工具库（用于一些函数方法之类的库）
    │    ├── assets                 // [可选] 公共资源（被项目引用的经过webpack处理的资源）
    │       ├── css                 // [可选] css
    │       ├── js                  // [可选] js
    │       ├── img                 // [可选] 图片
    │       └── theme               // [可选] element主题色 [element主题配置](https://element.eleme.cn/#/zh-CN/theme)
    │    ├── store                  // [可选] 数据存储 vuex
    │    ├── route                  // [可选] 路由
    │    ├── style                  // [可选] 公共样式
    │    ├── App.vue                // [必选] 根组件
    │    └── main.(js|ts)           // [必选] 入口文件
    ├── public                      // [必选] 不会被webpack编译的资源
    │    ├── index.html             // [必选] 模板
    │    └── logo.png               // [可选] 项目 logo
    ├── config                      // [可选] 配置目录
    ├── mock                        // [可选] mock 数据
    ├── service/api                 // [可选] 与服务端的交互接口
    ├── test                        // [可选] 测试代码
    ├── docs                        // [可选] 文档
    │── .gitignore                  // [必选] git 忽略的文件
    │── .editorconfig               // [必选] 编译器配置
    │── .npmignore                  // [可选] 如果是 npm 包是必选
    │── jsconfig.json               // [可选] 用于 vscode 配置
    ├── README.md                   // [必选] 导读
    ├── package.json                // [必选] 大家都懂
    └── ......                      // [可选] 一些工具的配置，如果 babel.config.js 等

### components、views 具体职能划分
components 只写公共组件，页面附带组件写在 views 内

    └── src
        ├── views
        │    └── Home
        │         ├── index.vue
        |         └── components
        │           ├── Banner.vue
        │           └── Card.vue
        ├── components
        │    ├── Swiper.vue
        │    └── Button.vue
        ├── store                 // 对于较大的项目，建议按业务模块拆分管理
        │    ├── index.js
        │    ├── home.js
        │    └── mine.js
        ├── route                 // 对于较大的项目，建议按业务模块拆分管理
        │    ├── index.js
        │    ├── home.js
        │    └── mine.js
        └── assets                // 重复使用的公共资源放在顶层 assets 文件，避免重复定义
             ├── css
             ├── js
             ├── img
             └── iconfont
  
### 现有公共组件

  ##### ChoosePermissionDialog 选择权限  
  [![ChoosePermissionDialogad0588f200909b8d.md.png](https://www.imageoss.com/images/2021/08/16/ChoosePermissionDialogad0588f200909b8d.md.png)](https://www.imageoss.com/image/tuA7h) 
  ##### ChoosePerson 选择人员   
  [![ChoosePerson44e9f47dde4a499f.md.png](https://www.imageoss.com/images/2021/08/16/ChoosePerson44e9f47dde4a499f.md.png)](https://www.imageoss.com/image/tuBZb)  
  ##### DeleteDialog 删除提示框 
  [![DeleteDialoga4cd4fa6c9ba51b1.png](https://www.imageoss.com/images/2021/08/16/DeleteDialoga4cd4fa6c9ba51b1.png)](https://www.imageoss.com/image/tug4Q)  
  ##### Drawer 抽屉  
  [![Drawer2cc906bff8ecdaed.md.png](https://www.imageoss.com/images/2021/08/16/Drawer2cc906bff8ecdaed.md.png)](https://www.imageoss.com/image/tuQ6z)
  ##### Icons 选择element-ui的icon  
  [![Icons4d41939a9a5e20a0.md.png](https://www.imageoss.com/images/2021/08/16/Icons4d41939a9a5e20a0.md.png)](https://www.imageoss.com/image/tuVIO)
  ##### PanelTitle 页面内标题  
  [![PanelTitle2e4422b16633e4af.md.png](https://www.imageoss.com/images/2021/08/16/PanelTitle2e4422b16633e4af.md.png)](https://www.imageoss.com/image/tu6Vy) 
  ##### PermissionList 展示权限列表 
  [![PermissionList3bb0aff7c403ebc4.md.png](https://www.imageoss.com/images/2021/08/16/PermissionList3bb0aff7c403ebc4.md.png)](https://www.imageoss.com/image/tu1jG)
  ##### ResizePanel 左右分割拖拽面板
  [![ResizePanelf842fe3e8d41e0fd.md.png](https://www.imageoss.com/images/2021/08/16/ResizePanelf842fe3e8d41e0fd.md.png)](https://www.imageoss.com/image/t4ZZn)
  ##### Steps 计步器 
  ##### Switch 二次封装
  ##### Table 表格
  ##### Tinymce 富文本
  [![Tinymce0c478857db32f481.md.png](https://www.imageoss.com/images/2021/08/16/Tinymce0c478857db32f481.md.png)](https://www.imageoss.com/image/tunFZ)  
  ##### Tree 树形组件 可同时选中所有相同ID
  [![Treee196b707400f45ae.md.png](https://www.imageoss.com/images/2021/08/16/Treee196b707400f45ae.md.png)](https://www.imageoss.com/image/t4HG5)
  ##### Upload 上传文件
  [![Uploadfee8bbae73885da1.png](https://www.imageoss.com/images/2021/08/16/Uploadfee8bbae73885da1.png)](https://www.imageoss.com/image/tupxT)

  
### 公共方法 @utils文件
```
arrayTool // 数组方法处理
  @utils/arrayTool.js
  
auth // AES加密
  @utils/auth.js

cas // 单点登录
  @utils/cas.js

createdHtmlTemplate // 生成一个template html
  @utils/createdHtmlTemplate.js

index // 各种js常用方法 如获取url参数等
  @utils/index.js

patter // 各种js常用正则
  @utils/patter.js

permission // 项目内按钮权限控制判断
  @utils/permission.js

storage // 本地存储
  @utils/storage.js

treeTool // 树形工具处理
  @utils/treeTool.js

createUniqueCode // 生成浏览器指纹
  @utils/uniqueCode.js
  
```

### 其他项目规范 

[小石前端项目规范和插件配合](http://gitlab.beijingxiaoshi.cn/qianduan/components/cooperation)

