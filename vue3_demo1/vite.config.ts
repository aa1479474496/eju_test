import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
console.log('process.cwd()', process.cwd());
function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
  }
export default defineConfig({
    plugins: [vue()],
    alias: {
        '/@/': pathResolve('src') + '/',
    }
})
