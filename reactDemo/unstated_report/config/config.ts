import { defineConfig } from 'umi';
import routes from './routes';

const path = require('path');

export default defineConfig({
  antd: {},
  dynamicImport: {},
  dva: {
    hmr: true,
  },
  sass: {
  },
  chainWebpack(config) {
    const oneOfsMap = config.module.rule('sass').oneOfs.values();
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/assets/css/handle.scss',
        })
        .end();
    });
  },
  routes
});