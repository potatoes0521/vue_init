<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-03-09 15:29:22
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-10 12:16:18
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
-->
# qishi_wiki

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

