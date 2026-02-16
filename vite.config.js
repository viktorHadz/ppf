import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://idogroupbg.com',

      dynamicRoutes: [
        '/portfolio',
        '/about',
        '/contact',
        '/ppf',
        '/detailing',
        '/insurance',
        '/tinting',
        '/terms',
        '/privacy',
        '/cookies',
      ],

      changefreq: {
        '*': 'monthly',
        '/': 'weekly',
        '/portfolio': 'weekly',
        '/contact': 'monthly',
        '/terms': 'yearly',
        '/privacy': 'yearly',
        '/cookies': 'yearly',
      },
      priority: {
        '*': 0.6,
        '/': 1.0,
        '/ppf': 0.9,
        '/tinting': 0.9,
        '/detailing': 0.9,
        '/portfolio': 0.8,
        '/contact': 0.7,
        '/terms': 0.2,
        '/privacy': 0.2,
        '/cookies': 0.2,
      },
    }),
  ],

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },

  server: {
    proxy: {
      '/foo': 'http://localhost:4567',
      '/api': {
        target: 'http://localhost:8788',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
