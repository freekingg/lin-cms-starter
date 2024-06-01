import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 

export default defineConfig({
  plugins: [
    vue(), 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  server:{
        host: '0.0.0.0',
        port: 4000,
        open: true,
        proxy: {
          [process.env.VITE_APP_BASE_API]: {
            target: process.env.VUE_APP_BASE_URL,   //接口地址
            changeOrigin: true,
            rewrite: (path) => path.replace(['^' + process.env.VITE_APP_BASE_API], '')
          },
        } 
    }
});