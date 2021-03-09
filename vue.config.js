/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-09 15:33:35
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-09 19:48:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)
// 引入zopfli比gzip压缩更好
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
// 添加打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//

// const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/www/wwwroot/oss-static";

module.exports = {
  // 线上资源读取地址
  publicPath: '/xiaoshi',
  // outputDir: "",
  lintOnSave: true,
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
    // open: true,
    host: 'localhost',
    port: 8085,
    https: false,
    hotOnly: false
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@api', resolve('src/api'))
      .set('@utils', resolve('src/utils'))
      .set('@js', resolve('src/assets/js'))
      .set('@css', resolve('src/assets/css'))
      .set('@img', resolve('src/assets/img'))
      .set('@config', resolve('src/config'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@mixins', resolve('src/mixins'))
      .set('@layout', resolve('src/layout'))
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
    config.resolve.symlinks(true)
  },
  // gzip
  configureWebpack: (config) => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback)
          },
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.99,
          test: productionGzipExtensions
        })
      )
      plugins.push(
        new BrotliPlugin({
          test: productionGzipExtensions,
          minRatio: 0.99
        })
      )
      // 打包生成打包分析
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
      // 打包图片压缩
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          }
        })
    }
    // End 生成 gzip 压缩文件
    config.plugins = [...config.plugins, ...plugins]
  }
}
