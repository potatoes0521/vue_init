/*
 * @Author: liuYang
 * @description: ESlint 具体配置文件
 * @path: 引入路径
 * @Date: 2021-03-09 15:29:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-14 17:06:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
module.exports = {
  root: true,
  env: {
    // 一个环境定义了一组预定义的全局变量。    
    browser: true,
    // 会自动开启es6语法支持。    
    es6: true,
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  // 插件
  // extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint",
    // ecmaVersion: 6, // 指定ECMAScript的版本为 6
    // parser: "@typescript-eslint/parser", // 解析 ts
    sourceType: "module"
  },
  // 全局变量
  globals: {
    window: true,
    document: true,
    wx: true
  },
  // 规则
  rules: {
    // 末尾不加分号，只有在有可能语法错误时才会加分号
    semi: 0,
    // 箭头函数需要有括号 (a) => {}
    "arrow-parens": 0,
    // 不允许回调未定义的变量
    "standard/no-callback-literal": 0,
    // 关闭副作用的 new
    "no-new": "off",
    // 关闭每行最大长度小于 80
    "max-len": 0,
    // 函数括号前面不加空格
    // "space-before-function-paren": ["error", "never"],
    // 关闭要求 require() 出现在顶层模块作用域中
    "global-require": 0,
    // 禁止出现令人困惑的多行表达式    
    'no-unexpected-multiline': 2,
    // 禁止在return、throw、continue、break语句之后出现不可达代码    
    'no-unreachable': 2,
    // 禁止出现重复的case标签    
    'no-duplicate-case': 2,
    // 关闭关闭类方法中必须使用this
    "class-methods-use-this": 0,
    // 关闭禁止对原生对象或只读的全局对象进行赋值
    "no-global-assign": 2,
    // 关闭禁止对关系运算符的左操作数使用否定操作符
    "no-unsafe-negation": 1,
    // 关闭禁止使用 console
    // "no-console": 0,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 禁止使用空解构模式    
    'no-empty-pattern': 2,
    // 禁止eval()    
    'no-eval': 2,
    // 禁止使用类似eval()的方法    
    'no-implied-eval': 2,
    // 关闭禁止末尾空行
    "eol-last": 0,
    // 关闭强制在注释中 // 或 /* 使用一致的空格
    "spaced-comment": 0,
    // 关闭禁止对 function 的参数进行重新赋值
    "no-param-reassign": 0,
    // 禁止对String，Number 和 Boolean 使用new操作符    
    'no-new-wrappers': 2,
    // 强制使用一致的换行符风格 (linebreak-style)
    "linebreak-style": ["error", "unix"],
    // 要求使用 ===和 !==    
    'eqeqeq': [2, 'allow-null'],
    // 禁止使用拖尾逗号
    "comma-dangle": ["error", "never"],
    // 关闭强制使用骆驼拼写法命名约定
    "camelcase": 0,
    // 要求或禁止Yoda条件。 if("red" === color) { //字面量在前，变量在后 }    
    'yoda': [2, 'never'],
    // 禁止修改const声明的变量    
    'no-const-assign': 2,
    // 禁止出现多行空行   
    'no-multiple-empty-lines': [2, {
      // 最大连续空行数    
      max: 2
    }],
    // 禁止行尾空格  
    'no-trailing-spaces': 2,
    // 强制函数中的变量要么一起声明要么分开声明   
    'one-var': [2, {
      'initialized': 'never'
    }],
    // 要求操作符周围有空格   
    'space-infix-ops': 2,
    // 禁止不必要的布尔转换    
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号   
    // 'no-extra-parens': [2, 'functions'],
    // 禁止对function声明重新赋值   
    'no-func-assign': 2,
    // 禁止在嵌套块中出现变量声明或function声明  
    // 'no-inner-declarations': [2, 'functions'],
    // 禁止在字符串和注释之外不规则的空白  
    'no-irregular-whitespace': 2,
  }
};