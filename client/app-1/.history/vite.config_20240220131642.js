import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 
import AutoImport from 'unplugin-auto-import/vite' // 自动引入无需每次都引入
export default defineConfig({
  plugins: [
    vue(), 
    AutoImport({
        imports: ['vue','vue-router']
    })],
  server:{
        host: '0.0.0.0',
        port: 4000,
        open: true,
        proxy: {
          [process.env.VUE_APP_BASE_API]: {
            target: process.env.VUE_APP_BASE_URL,   //接口地址
            changeOrigin: true,
            rewrite: (path) => path.replace(['^' + process.env.VUE_APP_BASE_API], '')
          },
        } 
    }
});