import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  proxy: {
    // string shorthand: /foo -> http://localhost:4567/foo
    '/foo': 'http://localhost:4567',
    // with options
    '/api': {
      target: 'http://localhost:8788',
      // changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
})
