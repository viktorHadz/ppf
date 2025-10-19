import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'начало',
      component: HomeView,
    },

    { path: '/цени', name: 'Цени', component: () => import('@/views/PricesView.vue') },
    { path: '/галерия', name: 'Галерия', component: () => import('@/views/GalleryView.vue') },
    { path: '/екип', name: 'Екипа', component: () => import('@/views/TeamView.vue') },
    { path: '/контакт', name: 'Контакт', component: () => import('@/views/ContanctView.vue') },
    { path: '/фолиране', name: 'Фолиране', component: () => import('@/views/PpfView.vue') },
    { path: '/застраховане', name: 'Застраховане', component: () => import('@/views/InsuranceView.vue') },
    { path: '/плотери', name: 'Плотери', component: () => import('@/views/PloterView.vue') },
  ],
})

export default router
