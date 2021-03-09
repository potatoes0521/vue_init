/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:33:35
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 15:51:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
const path = require("path");

// 引入gzip
const CompressionWebpackPlugin = require("compression-webpack-plugin")
//匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

// const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/www/wwwroot/oss-static";

module.exports = {
  // 线上资源读取地址
  publicPath: "/xiaoshi",
  // outputDir: "",
  lintOnSave: true,
  configureWebpack: {
    // 覆盖webpack默认配置的都在这里
    resolve: {
      // 配置解析别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@view": path.resolve(__dirname, "./src/pages"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@js": path.resolve(__dirname, "./src/assets/js"),
        "@css": path.resolve(__dirname, "./src/assets/css"),
        "@img": path.resolve(__dirname, "./src/assets/images"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@router": path.resolve(__dirname, "./src/router"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@mixin": path.resolve(__dirname, "./src/mixins"),
      },
    },
  },
  // css: {
  //   // 一次配置，全局使用，这个scss 因为每个文件都要引入
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "./src/assets/hotcss/px2rem.scss";`
  //     }
  //   }
  // },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // host: "192.168.31.246",
    open: true,
    host: "localhost",
    port: 8085,
    https: false,
    hotOnly: false,
  },

  // gzip
  configureWebpack: config => {

    const plugins = []
    // start 生成 gzip 压缩文件
    plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]", //目标资源名称
        algorithm: "gzip",
        test: productionGzipExtensions, //处理所有匹配此 {RegExp} 的资源
        threshold: 10240, //只处理比这个值大的资源。按字节计算(设置10K以上进行压缩)
        minRatio: 0.8 //只有压缩率比这个值小的资源才会被处理
      })
    );

    // End 生成 gzip 压缩文件
    config.plugins = [...config.plugins, ...plugins];
  }
};
