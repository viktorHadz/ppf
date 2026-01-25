import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'начало', component: HomeView },
  { path: '/gallery', name: 'Галерия', component: () => import('@/views/GalleryView.vue') },
  { path: '/portfolio', name: 'Портфолио', component: () => import('@/views/TeamView.vue') },
  { path: '/contact', name: 'Контакт', component: () => import('@/views/ContanctView.vue') },
  { path: '/ppf', name: 'Фолиране', component: () => import('@/views/PpfView.vue') },
  { path: '/detailing', name: 'Детайлинг', component: () => import('@/views/DetailingView.vue') },
  {
    path: '/insurance',
    name: 'Застраховки',
    component: () => import('@/views/InsuranceView.vue'),
  },
  {
    path: '/tinting',
    name: 'Затъмняване',
    component: () => import('@/views/DarkeningView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
