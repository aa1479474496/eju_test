/*
 * 配置扩展
 */
const webpack = require("webpack");
const path = require("path");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");


module.exports = {
  lintOnSave: false,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => { }
  },

  configureWebpack: {
    //删除打包后的console文件
    optimization: {
      minimizer: []
    },

    //由于使用jquery ui 中的组件， 这里注册全局jquery对象
    resolve: {
      extensions: [".js"],
      alias: {
        jquery: "jquery/dist/jquery.min.js"
      }
    },
    plugins: [
    
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),

      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(
              __dirname,
              "./src/components/Skeleton/entry-skeleton.js"
            )
          }
        },
        // minimize: true,
        quiet: true,
        router: {
          mode: "hash",
          // mode: 'history',
          routes: [
            {
              path: "/skeleton",
              skeletonId: "skeleton-home"
            }
          ]
        }
      })
    ]
  },

  css: {
    loaderOptions: {
      sass: {
        // @import "@/assets/css/mixin.scss";
        prependData: `
          @import "@/assets/css/handle.scss";
        `
      }
    }
  },

  // build 输出 地址
  outputDir: "./dist"
};


