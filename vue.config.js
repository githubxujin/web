'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const OS = require('os')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false, // 生产环境的 source map

  chainWebpack: config => {
    // 修复HMR
    // config.resolve.symlinks(true);
    // //修复 Lazy loading routes Error
    // config.plugin('html').tap(args => {
    //     args[0].chunksSortMode = 'none';
    //     return args;
    // });
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return {
          limit: 10000
        }
      })
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
    // 压缩图片
    // config.module
    //     .rule("images")
    //     .use("image-webpack-loader")
    //     .loader("image-webpack-loader")
    //     .options({
    //         mozjpeg: {progressive: true, quality: 65},
    //         optipng: {enabled: false},
    //         pngquant: {quality: "65-90", speed: 4},
    //         gifsicle: {interlaced: false},
    //         webp: {quality: 75}
    //     });
    config.plugin('copy').tap(args => {
      args[0][0].to = 'resource'
      return args
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV == 'production') {
      // const plugins = [];
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_debugger: true,
      //         drop_console: true
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // );
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }

    // 打包分析
    // if (process.env.IS_ANALYZ) {
    //     config.plugin('webpack-report')
    //         .use(BundleAnalyzerPlugin, [{
    //             analyzerMode: 'static',
    //         }]);
    // }

    // //配置 externals
    // //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    // config.externals = {
    //     'vue': 'Vue',
    //     'element-ui': 'ELEMENT',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     'axios': 'axios'
    // }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        // 代理地址
        // target: 'http://192.168.1.120:8080', //
        target: 'http://192.168.1.152', // 需要代理的地址（online）
        changeOrigin: true, // 是否跨域
        secure: false
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // data: fs.readFileSync('src/assets/css/variables.scss', 'utf-8')
        data: '@import "@/assets/css/variables.scss";'
      }
    }
  }
}
