/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Path:  引入路径
 * @Date: 2021-03-09 15:33:35
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-08 10:53:28
 * @MustParam:  必传参数
 * @OptionalParam:  选传参数
 * @EmitFunction:  函数
 */
const path = require('path')
const IS_PROD = ['production', 'prod', 'pro', 'test'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
// 添加打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // 线上资源读取地址
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // outputDir: "",
  lintOnSave: true,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // host: "192.168.31.246",
    open: true,
    port: 7001,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      //在此配置跨域
      '/api/': {
        target: 'http://192.168.200.212:7001', //后端的接口地址
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //路径重写
        }
      }
    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@api', resolve('src/api/modules'))
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
    if (IS_PROD) {
      // 打包生成打包分析
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },
  // gzip
  configureWebpack: (config) => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    // End 生成 gzip 压缩文件
    config.plugins = [...config.plugins, ...plugins]
  }
}
