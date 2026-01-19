import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'начало', component: HomeView },
  { path: '/галерия', name: 'Галерия', component: () => import('@/views/GalleryView.vue') },
  { path: '/екип', name: 'Екипа', component: () => import('@/views/TeamView.vue') },
  { path: '/контакт', name: 'Контакт', component: () => import('@/views/ContanctView.vue') },
  { path: '/фолиране', name: 'Фолиране', component: () => import('@/views/PpfView.vue') },
  { path: '/детайлинг', name: 'Детайлинг', component: () => import('@/views/DetailingView.vue') },
  {
    path: '/застраховки',
    name: 'Застраховки',
    component: () => import('@/views/InsuranceView.vue'),
  },
  { path: '/плотери', name: 'Плотери', component: () => import('@/views/PloterView.vue') },
  {
    path: '/затъмняване',
    name: 'Затъмняване',
    component: () => import('@/views/GlassDarkeningView.vue'),
  },
]

// wrap createWebHistory so that encoded paths get decoded before matching
function createDecodedHistory(base) {
  const history = createWebHistory(base)
  const originalLocation = history.location
  Object.defineProperty(history, 'location', {
    get() {
      // decode only once
      try {
        return decodeURI(originalLocation.value || originalLocation)
      } catch {
        return originalLocation
      }
    },
  })
  return history
}

const router = createRouter({
  history: createDecodedHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
