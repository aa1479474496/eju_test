/*
 * 配置扩展
 */
const webpack = require("webpack");
const path = require("path");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

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
  transpileDependencies: [
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  ],
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
      // CKEditor needs its own plugin to be built using webpack.
      // new CKEditorWebpackPlugin({
      //   // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
      //   language: 'en'
      // }),
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

  chainWebpack: config => {
    // Vue CLI would normally use its own loader to load .svg files. The icons used by
    // CKEditor should be loaded using raw-loader instead.
    const svgRule = config.module.rule('svg');
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');
    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
          },
          minify: true
        });
      });

    // config.module
    //   .rule('cke-svg')
    //   .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
    //   .use('raw-loader')
    //   .loader('raw-loader');
    // config.module
    //   .rule('cke-css')
    //   .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
    //   .use('postcss-loader')
    //   .loader('postcss-loader')
    //   .tap(() => {
    //     return styles.getPostCssConfig({
    //       themeImporter: {
    //         themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
    //       },
    //       minify: true
    //     });
    //   });
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/mixin.scss";
        `
      },
      // postcss: styles.getPostCssConfig({
      //   themeImporter: {
      //     themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
      //   },
      //   minify: true
      // })
    }
  },

  // build 输出 地址
  outputDir: "./dist"
};


