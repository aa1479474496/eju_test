import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },
  routes
});