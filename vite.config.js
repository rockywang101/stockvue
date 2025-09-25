import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {

  // Vite 的環境變數載入規則 跟 Node.js 原生的 process.env 有差別：
  // .env.production 的變數會被 Vite 載入到 import.meta.env，但不會自動塞進 Node.js 的 process.env。
  // 所以 process.env.VITE_BASE_PATH 預設是 空的，導致永遠走 || '/'。
  // 上面是 AI 說的，不確定真實性，但目前改成這樣是可以運作沒錯
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    base: env.VITE_BASE_PATH || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@views': path.resolve(__dirname, './src/views'),
      }
    }
  }
})