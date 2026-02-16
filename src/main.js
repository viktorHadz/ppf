import './assets/main.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { createUnhead } from '@unhead/vue'

export const createApp = ViteSSG(App, { routes }, ({ app, router }) => {
  const head = createUnhead()
  app.use(head)
  router.options.scrollBehavior = scrollBehavior
})
